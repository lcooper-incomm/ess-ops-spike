package com.incomm.cca.service.codex;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incomm.cca.hazelcast.HazelcastManager;
import com.incomm.cca.hazelcast.event.RefreshCodexEvent;
import com.incomm.cca.model.constant.JobType;
import com.incomm.cca.model.converter.BalanceAdjustmentLimitsSeedConverter;
import com.incomm.cca.model.view.codex.CcaBalanceAdjustmentLimitsSeed;
import com.incomm.cca.model.view.codex.CcaCardSeed;
import com.incomm.cca.model.view.codex.EnhancedCcaBalanceAdjustmentLimitsSeed;
import com.incomm.cca.service.cache.CodexCache;
import com.incomm.cca.service.cache.support.CodexCacheItem;
import com.incomm.cca.service.scheduledtask.ClusterAwareJobManager;
import com.incomm.cca.togglz.TogglzFeature;
import com.incomm.cscore.client.codex.CsCoreCodexCodexClient;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.codex.model.codex.CodexDetailView;
import com.incomm.cscore.codex.model.codex.CodexView;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.concurrent.ExecutorService;

@Service
public class CodexService extends ClusterAwareJobManager {

    @Value("${codex.balance-adjustment-limits}")
    private String balanceAdjustmentLimits;
    @Value("${codex.ccl-gift-change-status}")
    private String cclGiftChangeStatusCodexName;
    @Value("${codex.greencard-change-status}")
    private String greencardChangeStatusCodexName;
    @Value("${codex.vms-gift-change-status}")
    private String vmsGiftChangeStatusCodexName;
    @Value("${codex.vms-gpr-change-status}")
    private String vmsGprChangeStatusCodexName;
    @Autowired
    private BalanceAdjustmentLimitsSeedConverter balanceAdjustmentLimitsSeedConverter;
    @Autowired
    private CodexCache codexCache;
    @Autowired
    private CsCoreCodexCodexClient codexClient;
    @Autowired
    private ExecutorService executorService;
    @Autowired
    private HazelcastManager hazelcastManager;
    @Autowired
    private ObjectMapper objectMapper;

    public CodexDetailView findOne(String name) {
        CodexDetailView codex = null;

        CodexCacheItem result = this.codexCache.get(name);

        if (result != null) {
            codex = result.getCodex();
        } else {
            codex = this.codexClient.findOne(name)
                                    .getBody();
            if (codex != null) {
                this.cacheCodexIfNewOrChanged(codex, null);
            }
        }

        return codex;
    }

    private List<CodexView> findAll() {
        return codexClient.findAll()
                          .getBody();
    }

    private CodexDetailView findOne(Long id) {
        return codexClient.findOne(id)
                          .getBody();
    }

    @Override
    @Scheduled(cron = "0 0 * * * ?") //Every hour on the hour
    public void checkJobLockStatus() {
        waitExtraTimeIfNecessary();
        if (TogglzFeature.ARIIA_MIGRATION_JOB.isActive() && jobLockManager.isJobLockedByHost(JobType.CODEX_CACHE_REFRESH)) {
            this.refreshCache();
        }
    }

    @PostConstruct
    protected void init() {
        this.executorService.submit(() -> {
            try {
                Thread.sleep(15000);
            } catch (InterruptedException e) {
                //Fail silently
            }
            this.refreshCache();
        });
    }

    private void cacheCodexIfNewOrChanged(CodexDetailView codex, CodexCacheItem cachedCodex) {
        try {
            String serializedCodex = objectMapper.writeValueAsString(codex);
            String hash = DigestUtils.sha1Hex(serializedCodex.getBytes(StandardCharsets.UTF_8));

            this.cacheCodex(codex, hash);

            if (cachedCodex != null && !cachedCodex.getHash()
                                                   .equals(hash)) {
                this.broadcastUpdatedCodex(serializedCodex);
            }
        } catch (IOException e) {
            CsCoreLogger.error("Codex Cache - Failed to hash Codex for storage in cache")
                        .json("codex", codex)
                        .exception(e)
                        .build();
        }
    }

    public void refreshCache() {
        try {
            if (TogglzFeature.CODEX_CACHE_REFRESH.isActive()) {
                CsCoreLogger.info("Codex Cache Refresh - Begin")
                            .build();

                List<CodexView> codexSummaries = this.findAll();

                CsCoreLogger.info(String.format("Codex Cache Refresh - Found %d Codices, fetching details...", codexSummaries.size()))
                            .build();

                for (CodexView codexSummary : codexSummaries) {
                    CodexDetailView codex = this.findOne(codexSummary.getId());
                    try {
                        CodexCacheItem cachedCodex = this.codexCache.get(codex.getName());
                        this.cacheCodexIfNewOrChanged(codex, cachedCodex);
                    } catch (Exception e) {
                        CsCoreLogger.error("Codex Cache Refresh - Failed to retrieve Codex details")
                                    .json("codex", codex)
                                    .exception(e)
                                    .build();
                    }
                }

                CsCoreLogger.info("Codex Cache Refresh - End")
                            .build();
            }
        } catch (Exception e) {
            CsCoreLogger.error("Codex Cache Refresh - Unexpected Failure")
                        .exception(e)
                        .build();
        }
    }

    private void cacheCodex(CodexDetailView codex, String hash) {
        CodexCacheItem cacheItem = new CodexCacheItem();
        cacheItem.setCodex(codex);
        cacheItem.setHash(hash);
        this.codexCache.put(codex.getName(), cacheItem);
    }

    private void broadcastUpdatedCodex(String codex) {
        try {
            hazelcastManager.broadcast(new RefreshCodexEvent("codex", codex));
        } catch (Exception e) {
            CsCoreLogger.error("Failed to notify client of refreshed Codex")
                        .keyValue("codex", codex)
                        .exception(e)
                        .build();
        }
    }

    public EnhancedCcaBalanceAdjustmentLimitsSeed runBalanceAdjustmentLimitsCodex(CcaBalanceAdjustmentLimitsSeed request) {
        Response<CcaBalanceAdjustmentLimitsSeed> response = codexClient.runOne(balanceAdjustmentLimits, request, CcaBalanceAdjustmentLimitsSeed.class);
        CcaBalanceAdjustmentLimitsSeed seed = response.getBody();
        return balanceAdjustmentLimitsSeedConverter.convert(seed);
    }

    public CcaCardSeed runGreencardChangeStatusCodex(CcaCardSeed request) {
        Response<CcaCardSeed> response = codexClient.runOne(greencardChangeStatusCodexName, request, CcaCardSeed.class);
        return response.getBody();
    }

    public CcaCardSeed runVmsGiftChangeStatusCodex(CcaCardSeed request) {
        Response<CcaCardSeed> response = codexClient.runOne(vmsGiftChangeStatusCodexName, request, CcaCardSeed.class);
        return response.getBody();
    }

    public CcaCardSeed runVmsGprChangeStatusCodex(CcaCardSeed request) {
        Response<CcaCardSeed> response = codexClient.runOne(vmsGprChangeStatusCodexName, request, CcaCardSeed.class);
        return response.getBody();
    }

    public CcaCardSeed runCclGiftChangeStatusCodex(CcaCardSeed request) {
        Response<CcaCardSeed> response = codexClient.runOne(cclGiftChangeStatusCodexName, request, CcaCardSeed.class);
        return response.getBody();
    }

}
