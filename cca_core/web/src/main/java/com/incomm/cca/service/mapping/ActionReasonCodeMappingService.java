package com.incomm.cca.service.mapping;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.mapping.ActionReasonCodeMapping;
import com.incomm.cca.repository.mapping.ActionReasonCodeMappingRepository;
import com.incomm.cca.service.CcaAbstractCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActionReasonCodeMappingService extends CcaAbstractCrudService<ActionReasonCodeMapping, Long> {

    @Autowired
    private ActionReasonCodeMappingRepository mappingRepository;

    public List<ActionReasonCodeMapping> findAllByTypeAndPlatform(String type, String platform) {
        return this.mappingRepository.findAllByTypeAndPlatformIgnoreCase(type, platform);
    }

    public ActionReasonCodeMapping findOneByTypeAndPlatformAndCode(String type, String platform, String code) {
        return this.mappingRepository.findOneByTypeAndPlatformAndCodeIgnoreCase(type, platform, code);
    }

    @Override
    protected void validateAddPermission() throws SecurityViolationException {
        this.securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void validateDeletePermission() throws SecurityViolationException {
        this.securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void validateFindPermission() throws SecurityViolationException {
        //No permission to enforce
    }

    @Override
    protected void validateUpdatePermission() throws SecurityViolationException {
        this.securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void controlledUpdateOne(final ActionReasonCodeMapping source, final ActionReasonCodeMapping target) {
        target.setDisplayValue(source.getDisplayValue());
        target.setIsActive(source.getIsActive());
        target.setPlatform(source.getPlatform());
        target.setPlatformCode(source.getPlatformCode());
        target.setType(source.getType());
    }

    @Override
    protected void validateUnique(final ActionReasonCodeMapping mapping) throws IllegalArgumentException {
        ActionReasonCodeMapping existing = this.findOneByTypeAndPlatformAndCode(mapping.getType(), mapping.getPlatform(), mapping.getCode());
        if (existing != null && !existing.getId()
                                         .equals(mapping.getId())) {
            throw new IllegalArgumentException("Mapping already exists for this Type, Platform, and Code combination");
        }
    }

    @Override
    protected String getModelName() {
        return ActionReasonCodeMapping.class.getSimpleName();
    }
}
