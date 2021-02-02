package com.incomm.cca.service;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.ShortPay;
import com.incomm.cca.repository.ShortPayRepository;
import com.incomm.cscore.logging.CsCoreLogger;
import com.microsoft.sqlserver.jdbc.SQLServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ConstraintViolationException;
import java.util.List;

@Service
public class ShortPayService {

    @Autowired
    private ShortPayRepository shortPayRepository;
    @Autowired
    private SecurityService securityService;

    public List<ShortPay> findAll() {
        try {
            return shortPayRepository.findAll();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve short pay list")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public ShortPay findOne(Long id) {
        return shortPayRepository.findById(id)
                                 .orElse(null);
    }

    @Transactional
    public ShortPay addOne(ShortPay shortPay, boolean override) throws RuntimeException {
        try {
            return shortPayRepository.saveAndFlush(shortPay);
        } catch (ConstraintViolationException e) {
            if (override) {
                ShortPay existingShortPay = shortPayRepository.findOneByMerchantId(shortPay.getMerchantId());
                if (existingShortPay != null) {
                    existingShortPay.setMerchantId(shortPay.getMerchantId());
                    existingShortPay.setMerchantName(shortPay.getMerchantName());
                    existingShortPay.setLocationId(shortPay.getLocationId());
                    existingShortPay.setLocationName(shortPay.getLocationName());
                    existingShortPay.setTerminalId(shortPay.getTerminalId());
                    existingShortPay.setTerminalNumber(shortPay.getTerminalNumber());

                    return existingShortPay;
                } else {
                    CsCoreLogger.error("Failed to create new short pay")
                                .json("request", shortPay)
                                .exception(e)
                                .build();
                    throw new RuntimeException("Failed to create new short pay.");
                }
            } else {
                CsCoreLogger.error("Failed to create new short pay")
                            .json("request", shortPay)
                            .exception(e)
                            .build();
                throw new RuntimeException("Failed to create new short pay.");
            }
        } catch (Exception e) {
            CsCoreLogger.error("A Short Pay with Merchant, Location or Terminal already exists.")
                        .exception(e)
                        .build();
            throw new RuntimeException("A Short Pay with Merchant, Location or Terminal already exists.");
        }
    }

    @Transactional
    public void deleteOne(Long shortPayId) {
        try {
            shortPayRepository.deleteById(shortPayId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to delete short pay")
                        .keyValue("id", shortPayId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public ShortPay updateOne(Long id, ShortPay request) {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            if (id == null || !id.equals(request.getId())) {
                throw new IllegalArgumentException("Short Pay not found");
            }

            ShortPay existing = findOne(id);
            if (existing == null) {
                throw new IllegalArgumentException("Short Pay not found");
            }

            existing.setMerchantId(request.getMerchantId());
            existing.setMerchantName(request.getMerchantName());
            existing.setLocationId(request.getLocationId());
            existing.setLocationName(request.getLocationName());
            existing.setTerminalId(request.getTerminalId());
            existing.setTerminalNumber(request.getTerminalNumber());

            return existing;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to update Short Pay")
                        .keyValue("id", id)
                        .json("request", request)
                        .build();
            throw e;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to update Short Pay")
                        .keyValue("id", id)
                        .keyValue("cause", e.getMessage())
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update Short Pay")
                        .keyValue("id", id)
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
