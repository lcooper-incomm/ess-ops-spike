package com.incomm.cca.service.mapping;

import com.incomm.cca.model.constant.PropertySystemName;
import com.incomm.cca.model.domain.Property;
import com.incomm.cca.model.domain.mapping.GCRequest;
import com.incomm.cca.model.domain.mapping.GCResponse;
import com.incomm.cca.model.domain.mapping.OpCode;
import com.incomm.cca.repository.mapping.GCRequestRepository;
import com.incomm.cca.repository.mapping.GCResponseRepository;
import com.incomm.cca.repository.mapping.OpCodeRepository;
import com.incomm.cca.service.PropertyService;
import com.incomm.cca.util.MaskingUtil;
import com.incomm.cscore.client.apls.model.transaction.CustomOpCodeDescriptor;
import com.incomm.cscore.client.apls.model.transaction.CustomRequestDescriptor;
import com.incomm.cscore.client.apls.model.transaction.CustomResponseDescriptor;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransactions;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.AbstractMap;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Handles global customization and filtering of data, where security is NOT a factor.
 */
@Service
public class DataFilterService {

    public static final String DATE_TEMPLATE = "yyyy-MM-dd HH:mm:ss.SSS";
    @Autowired
    private OpCodeRepository opCodeRepository;
    @Autowired
    private GCRequestRepository gcRequestRepository;
    @Autowired
    private GCResponseRepository gcResponseRepository;
    @Autowired
    private PropertyService propertyService;
    private Date opCodeCacheDate;
    private Date gcMappingCacheDate;
    private Map<String, OpCode> opCodeCache;
    private Map<Map.Entry<String, String>, GCRequest> gcRequestCache;
    private Map<String, GCResponse> gcResponseCache;

    public void clearOpCodeCacheDate() {
        opCodeCacheDate = null;
    }

    public void clearGCMappingCacheDate() {
        gcMappingCacheDate = null;
    }

    /**
     * Appends the mapped op code values to every transaction.
     */
    public void filterOpCodes(EnhancedTransactions transactions) {
        checkOpCodeCache();

        if (transactions != null && transactions.getTransactions() != null) {
            for (EnhancedTransaction transaction : transactions.getTransactions()) {
                if (transaction != null
                        && transaction.getOpCode() != null
                        && StringUtils.isNotBlank(transaction.getOpCode()
                                                             .getCode())) {
                    OpCode opCode = opCodeCache.get(transaction.getOpCode()
                                                               .getCode());
                    if (opCode != null) {
                        CustomOpCodeDescriptor descriptor = new CustomOpCodeDescriptor();
                        descriptor.setId(opCode.getId());
                        descriptor.setCode(opCode.getCode());
                        descriptor.setRequestValue(opCode.getRequestValue());
                        descriptor.setResponseValue(opCode.getResponseValue());
                        descriptor.setTransactionType(opCode.getTransactionType());
                        transaction.getOpCode()
                                   .setDescriptor(descriptor);
                    }
                }
            }
        }
    }

    /**
     * Appends the mapped GreenCard request and response values for every transaction.
     */
    public void filterGCRequestAndResponse(EnhancedTransactions transactions) {
        checkGCRequestAndResponseMappingCache();

        if (transactions != null && transactions.getTransactions() != null) {
            for (EnhancedTransaction transaction : transactions.getTransactions()) {
                if (transaction != null
                        && transaction.getRequest() != null
                        && transaction.getSettlement() != null
                        && transaction.getSettlement()
                                      .getX95() != null
                        && StringUtils.isNotBlank(transaction.getRequest()
                                                             .getCode())
                        && StringUtils.isNotBlank(transaction.getSettlement()
                                                             .getX95()
                                                             .getCode())) {
                    //It appears that some x95Codes have leading zeros...
                    String x95Code = transaction.getSettlement()
                                                .getX95()
                                                .getCode()
                                                .trim();
                    if (x95Code.startsWith("0")) {
                        x95Code = x95Code.replaceFirst("0", "");
                    }
                    Map.Entry<String, String> entry = new AbstractMap.SimpleImmutableEntry<>(x95Code, transaction.getRequest()
                                                                                                                 .getCode()
                                                                                                                 .trim());

                    GCRequest gcRequest = gcRequestCache.get(entry);
                    if (gcRequest != null) {
                        CustomRequestDescriptor descriptor = new CustomRequestDescriptor();
                        descriptor.setId(gcRequest.getId());
                        descriptor.setX95Code(gcRequest.getX95Code());
                        descriptor.setRequestCode(gcRequest.getRequestCode());
                        descriptor.setRequestValue(gcRequest.getRequestValue());
                        descriptor.setTransactionType(gcRequest.getTransactionType());
                        transaction.getRequest()
                                   .setDescriptor(descriptor);
                    }
                }
                if (transaction != null
                        && transaction.getResponse() != null
                        && StringUtils.isNotBlank(transaction.getResponse()
                                                             .getCode())) {
                    GCResponse gcResponse = gcResponseCache.get(transaction.getResponse()
                                                                           .getCode()
                                                                           .trim());
                    if (gcResponse != null) {
                        CustomResponseDescriptor descriptor = new CustomResponseDescriptor();
                        descriptor.setId(gcResponse.getId());
                        descriptor.setResponseCode(gcResponse.getResponseCode());
                        descriptor.setResponseValue(gcResponse.getResponseValue());
                        transaction.getResponse()
                                   .setDescriptor(descriptor);
                    }
                }
                if (transaction != null && transaction.getIdentifiers() != null) {
                    String encryptedPan = transaction.getIdentifiers()
                                                     .getPan();
                    String maskedPan = MaskingUtil.decryptAndMaskPAN(encryptedPan);
                    transaction.getIdentifiers()
                               .setPan(maskedPan);
                }
            }
        }
    }

    /**
     * Make sure the cache is still valid, and if not, update it before continuing on with the data filtering.
     */
    private void checkOpCodeCache() {
        Property opCodeCacheDateProperty = propertyService.findOneBySystemName(PropertySystemName.OP_CODE_MAPPING_CACHE_DATE);

        Date opCodeDatabaseCacheDate = null;
        if (StringUtils.isNotBlank(opCodeCacheDateProperty.getValue())) {
            try {
                opCodeDatabaseCacheDate = new SimpleDateFormat(DATE_TEMPLATE).parse(opCodeCacheDateProperty.getValue());
            } catch (ParseException e) {
                CsCoreLogger.warn("Unable to parse OP_CODE_MAPPING_CACHE_DATE")
                            .keyValue("value", opCodeCacheDateProperty.getValue())
                            .exception(e)
                            .build();
            }
        }

        //If we haven't cached yet, or our cache is older than the database's cache date, refresh the cache
        if (opCodeCacheDate == null || opCodeDatabaseCacheDate == null || opCodeCacheDate.getTime() < opCodeDatabaseCacheDate.getTime()) {
            CsCoreLogger.info("OpCode Mapping cache out of date, refreshing cache...")
                        .build();

            List<OpCode> opCodes = opCodeRepository.findAll();

            opCodeCache = new HashMap<>();
            for (OpCode opCode : opCodes) {
                opCodeCache.put(opCode.getCode(), opCode);
            }

            opCodeCacheDate = new Date();
        } else {
            CsCoreLogger.info("OpCode Mapping cache up to date.")
                        .build();
        }
    }

    /**
     * Make sure the cache is still valid, and if not, update it before continuing on with the data filtering.
     */
    private void checkGCRequestAndResponseMappingCache() {
        Property mappingCacheDateProperty = propertyService.findOneBySystemName(PropertySystemName.GC_REQUEST_RESPONSE_MAPPING_DATE);

        Date mappingDatabaseCacheDate = null;
        if (StringUtils.isNotBlank(mappingCacheDateProperty.getValue())) {
            try {
                mappingDatabaseCacheDate = new SimpleDateFormat(DATE_TEMPLATE).parse(mappingCacheDateProperty.getValue());
            } catch (ParseException e) {
                CsCoreLogger.warn("Unable to parse GC_REQUEST_RESPONSE_MAPPING_DATE")
                            .keyValue("value", mappingCacheDateProperty.getValue())
                            .exception(e)
                            .build();
            }
        }

        //If we haven't cached yet, or our cache is older than the database's cache date, refresh the cache
        if (gcMappingCacheDate == null || mappingDatabaseCacheDate == null || gcMappingCacheDate.getTime() < mappingDatabaseCacheDate.getTime()) {
            CsCoreLogger.info("GC Request/Response Mapping cache out of date, refreshing cache...")
                        .build();

            List<GCRequest> requests = gcRequestRepository.findAll();
            List<GCResponse> responses = gcResponseRepository.findAll();

            gcRequestCache = new HashMap<>();
            for (GCRequest request : requests) {
                Map.Entry<String, String> entry = new AbstractMap.SimpleImmutableEntry<>(request.getX95Code(), request.getRequestCode());
                gcRequestCache.put(entry, request);
            }

            gcResponseCache = new HashMap<>();
            for (GCResponse response : responses) {
                gcResponseCache.put(response.getResponseCode(), response);
            }

            gcMappingCacheDate = new Date();
        } else {
            CsCoreLogger.info("GC Request/Response Mapping cache up to date.")
                        .build();
        }
    }
}
