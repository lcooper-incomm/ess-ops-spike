package com.incomm.cca.service.codex;

import com.incomm.cca.model.domain.PlatformStatusValue;
import com.incomm.cca.model.view.codex.CcaBalanceAdjustmentLimitsSeed;
import com.incomm.cca.model.view.codex.CcaCardSeed;
import com.incomm.cca.service.PlatformStatusValueService;
import com.incomm.cca.service.UserService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CodexSeedService {

    @Autowired
    private PlatformStatusValueService platformStatusValueService;
    @Autowired
    private UserService userService;

    public CcaBalanceAdjustmentLimitsSeed createBalanceAdjustmentLimitsSeed() {
        CcaBalanceAdjustmentLimitsSeed seed = new CcaBalanceAdjustmentLimitsSeed();
        seed.getPermissions()
            .addAll(this.getUserPermissions());
        return seed;
    }

    public CcaCardSeed createChangeStatusSeed(AplsPlatform platform, String currentStatus) {
        PlatformStatusValue platformStatusValue = platformStatusValueService.findOneByNameAndPlatform(currentStatus, platform.toString());
        return this.createChangeStatusSeed(platform, platformStatusValue);
    }

    public CcaCardSeed createChangeStatusSeed(AplsPlatform platform, PlatformStatusValue currentStatus) {
        CcaCardSeed seed = new CcaCardSeed();
        seed.setPlatform(platform);
        seed.setPlatformStatus(currentStatus.getName());
        seed.getPermissions()
            .addAll(this.getUserPermissions());
        return seed;
    }

    private List<String> getUserPermissions() {
        return userService.currentUser()
                          .getSimpleAuthorities()
                          .stream()
                          .map(authority -> authority.getAuthority())
                          .collect(Collectors.toList());
    }
}
