package com.incomm.cca.service;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.Property;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.SimplePropertyView;
import com.incomm.cca.repository.PropertyRepository;
import com.incomm.cscore.logging.CsCoreInformationLevel;
import com.incomm.cscore.logging.CsCoreLogger;
import com.incomm.cscore.logging.CsCoreLoggingLevel;
import com.incomm.cscore.logging.CsCoreMaskingLevel;
import com.incomm.cscore.logging.LoggingConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;
    @Autowired
    private SecurityService securityService;

    public Property findOneBySystemName(String propertySystemName) {
        return propertyRepository.findOneBySystemName(propertySystemName);
    }

    public List<Property> findAll() {
        try {
            return propertyRepository.findAll();
        } catch (Exception e) {
            CsCoreLogger.error("Error retrieving properties")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Property update(Long id, SimplePropertyView simplePropertyView) {
        try {
            if (!securityService.hasPermission(ManagedPermission.EDIT_APP_PROPERTIES)) {
                throw new SecurityViolationException();
            }

            Property property = propertyRepository.findById(id)
                                                  .orElse(null);
            if (property == null) {
                throw new NotFoundException();
            }

            property.setDisplayName(simplePropertyView.getDisplayName());
            property.setDescription(simplePropertyView.getDescription());
            property.setValue(simplePropertyView.getValue());

            return property;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to edit system property")
                        .keyValue("id", id)
                        .json("request", simplePropertyView)
                        .build();
            throw e;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Property not found")
                        .keyValue("id", id)
                        .json("request", simplePropertyView)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Error updating property")
                        .keyValue("id", id)
                        .json("request", simplePropertyView)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public void updateLoggingLevel(CsCoreLoggingLevel level) {
        if (!securityService.isSystemAdministrator()) {
            throw new SecurityViolationException();
        } else if (level == null) {
            throw new IllegalArgumentException("level must be provided");
        }
        LoggingConfig.loggingLevel = level;
    }

    public void updateLoggingInformationLevel(CsCoreInformationLevel level) {
        if (!securityService.isSystemAdministrator()) {
            throw new SecurityViolationException();
        } else if (level == null) {
            throw new IllegalArgumentException("level must be provided");
        }
        LoggingConfig.informationLevel = level;
    }

    public void updateLoggingMaskingLevel(CsCoreMaskingLevel level) {
        if (!securityService.isSystemAdministrator()) {
            throw new SecurityViolationException();
        } else if (level == null) {
            throw new IllegalArgumentException("level must be provided");
        }
        LoggingConfig.maskingLevel = level;
    }
}
