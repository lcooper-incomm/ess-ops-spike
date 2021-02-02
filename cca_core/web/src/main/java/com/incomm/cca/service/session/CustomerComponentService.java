package com.incomm.cca.service.session;

import com.incomm.cca.model.domain.session.CustomerComponent;
import com.incomm.cca.model.view.session.CustomerComponentView;
import com.incomm.cca.repository.session.CustomerComponentRepository;
import com.incomm.cca.service.encryption.EncryptionService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerComponentService {

    @Autowired
    private CustomerComponentRepository customerComponentRepository;
    @Autowired
    private EncryptionService encryptionService;

    @Transactional
    public CustomerComponent updateOne(Long id, CustomerComponentView request) {
        try {
            this.encryptionService.openSymmetricKey();
            CustomerComponent existing = customerComponentRepository.findById(id)
                                                              .orElse(null);
            if (existing == null) {
                throw new IllegalArgumentException("Customer Detail not found");
            }

            existing.setFirstName(request.getFirstName());
            existing.setLastName(request.getLastName());
            existing.setDateOfBirth(request.getDateOfBirth());
            existing.setPhoneNumber(request.getPhoneNumber());
            existing.setAni(request.getAni());
            existing.setLine1(request.getAddress()
                                     .getLine1());
            existing.setLine2(request.getAddress()
                                     .getLine2());
            existing.setCity(request.getAddress()
                                    .getCity());
            existing.setState(request.getAddress()
                                     .getState());
            existing.setPostalCode(request.getAddress()
                                          .getPostalCode());
            existing.setCallbackTime(request.getCallbackTime());
            existing.setLanguage(request.getLanguage());
            existing.setContactMethod(request.getContactMethod());
            existing.setEmailAddress(request.getEmailAddress());

            return existing;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to update customer detail")
                        .keyValue("cause", e.getMessage())
                        .keyValue("id", id)
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update customer detail")
                        .keyValue("id", request.getId())
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
