package com.incomm.cca.service.mapping;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.model.constant.PropertySystemName;
import com.incomm.cca.model.domain.Property;
import com.incomm.cca.model.domain.mapping.GCRequest;
import com.incomm.cca.model.domain.mapping.GCResponse;
import com.incomm.cca.model.domain.mapping.OpCode;
import com.incomm.cca.repository.mapping.GCRequestRepository;
import com.incomm.cca.repository.mapping.GCResponseRepository;
import com.incomm.cca.repository.mapping.OpCodeRepository;
import com.incomm.cca.service.PropertyService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class DataMappingService {

    @Autowired
    private OpCodeRepository opCodeRepository;
    @Autowired
    private GCRequestRepository gcRequestRepository;
    @Autowired
    private GCResponseRepository gcResponseRepository;
    @Autowired
    private DataFilterService dataFilterService;
    @Autowired
    private PropertyService propertyService;

    public void deleteOneOpCode(Long id) {
        resetOpCodeCacheDate();
        opCodeRepository.deleteById(id);
    }

    public List<OpCode> findAllOpCodes() {
        return opCodeRepository.findAll();
    }

    public List<GCRequest> getAllGCRequests() {
        return gcRequestRepository.findAll();
    }

    public List<GCResponse> getAllGCResponses() {
        return gcResponseRepository.findAll();
    }

    @Transactional
    public OpCode createOpCode(OpCode opCode) {
        resetOpCodeCacheDate();
        return opCodeRepository.saveAndFlush(opCode);
    }

    @Transactional
    public GCRequest createGCRequest(GCRequest request) {
        resetGCMappingCacheDate();
        return gcRequestRepository.saveAndFlush(request);
    }

    @Transactional
    public GCResponse createGCResponse(GCResponse response) {
        resetGCMappingCacheDate();
        return gcResponseRepository.saveAndFlush(response);
    }

    @Transactional
    public void deleteGCRequest(Long id) {
        gcRequestRepository.deleteById(id);
        resetGCMappingCacheDate();
    }

    @Transactional
    public void deleteGCResponse(Long id) {
        gcResponseRepository.deleteById(id);
        resetGCMappingCacheDate();
    }

    @Transactional
    public OpCode updateOpCode(OpCode request) {
        OpCode opCode = opCodeRepository.findById(request.getId())
                                        .orElse(null);

        if (opCode == null) {
            throw new NotFoundException();
        }
        opCode.setCode(request.getCode());
        opCode.setRequestValue(request.getRequestValue());
        opCode.setResponseValue(request.getResponseValue());
        opCode.setTransactionType(request.getTransactionType());

        resetOpCodeCacheDate();

        return opCode;
    }

    @Transactional
    public GCRequest updateGCRequest(GCRequest request) {
        GCRequest existing = gcRequestRepository.findById(request.getId())
                                                .orElse(null);
        if (existing == null) {
            throw new NotFoundException();
        }
        existing.setX95Code(request.getX95Code());
        existing.setRequestCode(request.getRequestCode());
        existing.setRequestValue(request.getRequestValue());
        existing.setTransactionType(request.getTransactionType());

        resetGCMappingCacheDate();

        return existing;
    }

    @Transactional
    public GCResponse updateGCResponse(GCResponse request) {
        GCResponse existing = gcResponseRepository.findById(request.getId())
                                                  .orElse(null);
        if (existing == null) {
            throw new NotFoundException();
        }
        existing.setResponseCode(request.getResponseCode());
        existing.setResponseValue(request.getResponseValue());

        resetGCMappingCacheDate();

        return existing;
    }

    @Transactional
    protected void resetOpCodeCacheDate() {
        Property cacheDateProperty = propertyService.findOneBySystemName(PropertySystemName.OP_CODE_MAPPING_CACHE_DATE);
        cacheDateProperty.setValue(new SimpleDateFormat(DataFilterService.DATE_TEMPLATE).format(new Date()));

        dataFilterService.clearOpCodeCacheDate();

        CsCoreLogger.info("Op Code Cache Date reset")
                    .build();
    }

    @Transactional
    protected void resetGCMappingCacheDate() {
        Property cacheDateProperty = propertyService.findOneBySystemName(PropertySystemName.GC_REQUEST_RESPONSE_MAPPING_DATE);
        cacheDateProperty.setValue(new SimpleDateFormat(DataFilterService.DATE_TEMPLATE).format(new Date()));

        dataFilterService.clearGCMappingCacheDate();

        CsCoreLogger.info("GC Request/Response Mapping Cache Date reset")
                    .build();
    }
}
