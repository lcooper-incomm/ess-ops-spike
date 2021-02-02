package com.incomm.cca.service;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.ActivatingMerchant;
import com.incomm.cca.repository.action.ActivatingMerchantRepository;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ActivatingMerchantService {

    @Autowired
    private ActivatingMerchantRepository repository;
    @Autowired
    private SecurityService securityService;

    public List<ActivatingMerchant> findAll() {
        try {
            return repository.findAll();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all activating merchants")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Map<AplsPlatform, List<String>> findAllAsMap() {
        try {
            List<ActivatingMerchant> merchants = findAll();

            List<String> dstaIds = new ArrayList<>();
            List<String> dstbIds = new ArrayList<>();

            for (ActivatingMerchant merchant : merchants) {
                if (merchant.getAplsPlatform() == AplsPlatform.DSTA) {
                    dstaIds.add(merchant.getMerchantId());
                } else if (merchant.getAplsPlatform() == AplsPlatform.DSTB) {
                    dstbIds.add(merchant.getMerchantId());
                }
            }

            Map<AplsPlatform, List<String>> map = new HashMap<>();
            map.put(AplsPlatform.DSTA, dstaIds);
            map.put(AplsPlatform.DSTB, dstbIds);

            return map;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all activating merchants as map")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public ActivatingMerchant findOne(Long id) {
        try {
            return repository.findById(id)
                             .orElse(null);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve activating merchant")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public ActivatingMerchant findOneByMerchantId(String merchantId) {
        try {
            return repository.findOneByMerchantId(merchantId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve activating merchant")
                        .keyValue("merchantId", merchantId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public ActivatingMerchant create(ActivatingMerchant request) {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            validateRequest(request);
            request.setId(null);

            ActivatingMerchant existing = repository.findOneByMerchantId(request.getMerchantId());
            if (existing != null) {
                throw new IllegalArgumentException("Record already exists with this merchantId");
            }

            repository.saveAndFlush(request);

            return request;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to create activating merchant")
                        .json("request", request)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to create activating merchant")
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create activating merchant")
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public ActivatingMerchant update(ActivatingMerchant request) {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            validateRequest(request);

            ActivatingMerchant existingMerchantId = repository.findOneByMerchantId(request.getMerchantId());
            ActivatingMerchant existing = this.findOne(request.getId());
            if (!existing.getId()
                         .equals(existingMerchantId.getId())) {
                throw new IllegalArgumentException("Record already exists with this merchantId");
            }

            existing.setMerchantId(request.getMerchantId());
            existing.setMerchantName(request.getMerchantName());
            existing.setPlatform(request.getPlatform());

            return existing;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to update activating merchant")
                        .json("request", request)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to update activating merchant")
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update activating merchant")
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to delete activating merchant")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private void validateRequest(ActivatingMerchant request) {
        if (request.getId() == null) {
            throw new IllegalArgumentException("'id' is required");
        }

        if (StringUtils.isBlank(request.getMerchantId())) {
            throw new IllegalArgumentException("'merchantId' is required");
        }

        if (StringUtils.isBlank(request.getMerchantName())) {
            throw new IllegalArgumentException("'merchantName' is required");
        }

        if (request.getAplsPlatform() != AplsPlatform.DSTA && request.getAplsPlatform() != AplsPlatform.DSTB) {
            throw new IllegalArgumentException("'platform' must be one of DSTA, DSTB");
        }
    }
}
