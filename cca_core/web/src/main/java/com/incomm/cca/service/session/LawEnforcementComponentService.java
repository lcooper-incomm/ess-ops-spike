package com.incomm.cca.service.session;

import com.incomm.cca.model.domain.session.LawEnforcementComponent;
import com.incomm.cca.repository.session.LawEnforcementComponentRepository;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LawEnforcementComponentService {

    @Autowired
    private LawEnforcementComponentRepository lawEnforcementComponentRepository;

    @Transactional
    public void deleteOne(Long id) {
        lawEnforcementComponentRepository.deleteById(id);
    }

    @Transactional
    public LawEnforcementComponent updateOne(Long id, LawEnforcementComponent request) {
        try {
            LawEnforcementComponent existing = lawEnforcementComponentRepository.findById(id)
                                                                                .orElse(null);
            if (existing == null) {
                throw new IllegalArgumentException("Law Enforcement Component not found");
            }

            existing.setAgency(request.getAgency());
            existing.setBadgeNumber(request.getBadgeNumber());
            existing.setCaseNumber(request.getCaseNumber());

            return existing;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to update law enforcement component")
                        .keyValue("cause", e.getMessage())
                        .keyValue("id", id)
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update law enforcement component")
                        .keyValue("id", request.getId())
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
