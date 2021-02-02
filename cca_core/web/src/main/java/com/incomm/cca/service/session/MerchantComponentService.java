package com.incomm.cca.service.session;

import com.incomm.cca.model.domain.session.MerchantComponent;
import com.incomm.cca.model.view.session.MerchantComponentRequestView;
import com.incomm.cca.repository.session.MerchantComponentRepository;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MerchantComponentService {

    @Autowired
    private MerchantComponentRepository merchantComponentRepository;

    @Transactional
    public void deleteOne(Long id) {
        merchantComponentRepository.deleteById(id);
    }

    @Transactional
    public MerchantComponent updateOne(Long id, MerchantComponentRequestView request) {
        try {
            MerchantComponent existing = merchantComponentRepository.findById(id)
                                                                    .orElse(null);
            if (existing == null) {
                throw new IllegalArgumentException("Merchant Component not found");
            }

            existing.setMerchantName(request.getMerchantName());
            existing.setMerchantLegacyId(request.getMerchantLegacyId());
            existing.setLocationName(request.getLocationName());
            existing.setContactName(request.getContactName());
            existing.setContactTitle(request.getContactTitle());
            existing.setContactPhone(request.getContactPhone());
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
            existing.setPurchasedDate(request.getPurchasedDate());
            existing.setFirstRedemptionAttemptedDate(request.getFirstRedemptionAttemptedDate());
            existing.setDeactivatedDate(request.getDeactivatedDate());
            existing.setLastReloadedDate(request.getLastReloadedDate());

            return existing;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to update merchant component")
                        .keyValue("cause", e.getMessage())
                        .keyValue("id", id)
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update merchant component")
                        .keyValue("id", request.getId())
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
