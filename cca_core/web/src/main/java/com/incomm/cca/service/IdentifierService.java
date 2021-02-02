package com.incomm.cca.service;

import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.repository.IdentifierRepository;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class IdentifierService {

    @Autowired
    private IdentifierRepository identifierRepository;

    public Identifier findOne(Long id) {
        try {
            return identifierRepository.findById(id)
                                       .orElse(null);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve identifier")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Identifier findOneByIdentifierTypeAndValueAndPlatform(String identifierType, String identifier, String platform) {
        return this.identifierRepository.findOneByIdentifierTypeAndValueAndPlatform(identifierType, identifier, platform);
    }

    public Identifier findOneByIdentifierTypeAndValueAndPlatformAndPartner(String identifierType, String identifier, String platform, String partner) {
        return this.identifierRepository.findOneByIdentifierTypeAndValueAndPlatformAndPartner(identifierType, identifier, platform, partner);
    }

    @Transactional
    public Identifier findOrCreateByIdentifierTypeIdentifierAndPlatform(String identifierType, String identifierValue, String platform) {
        try {
            Identifier identifier = identifierRepository.findOneByIdentifierTypeAndValueAndPlatform(identifierType, identifierValue, platform);
            if (identifier == null) {
                identifier = new Identifier();
                identifier.setIdentifierType(identifierType);
                identifier.setValue(identifierValue);
                identifier.setPlatform(platform);

                identifierRepository.save(identifier);
            }
            return identifier;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to find or create identifier")
                        .keyValue("identifierType", identifierType)
                        .keyValue("identifier", identifierValue)
                        .keyValue("platform", platform)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Identifier updateOne(Long id, Identifier request) {
        try {
            Identifier existing = identifierRepository.findById(id)
                                                      .orElse(null);
            if (existing == null) {
                throw new IllegalArgumentException("No identifier found with this id");
            }

            existing.setIdentifierType(request.getIdentifierType());
            existing.setValue(request.getValue());
            existing.setPlatform(request.getPlatform());

            return existing;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update identifier")
                        .keyValue("identifierId", id)
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
