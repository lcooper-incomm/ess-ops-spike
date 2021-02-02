package com.incomm.cca.service.session;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.session.ComplaintComponent;
import com.incomm.cca.service.CcaAbstractCrudService;
import org.springframework.stereotype.Service;

@Service
public class ComplaintComponentService extends CcaAbstractCrudService<ComplaintComponent, Long> {

    @Override
    protected void validateAddPermission() throws SecurityViolationException {

    }

    @Override
    protected void validateDeletePermission() throws SecurityViolationException {
        throw new UnsupportedOperationException();
    }

    @Override
    protected void validateFindPermission() throws SecurityViolationException {

    }

    @Override
    protected void validateUpdatePermission() throws SecurityViolationException {

    }

    @Override
    protected void controlledUpdateOne(final ComplaintComponent source, final ComplaintComponent target) {
        target.setAccountNumber(source.getAccountNumber());
        target.setBank(source.getBank());
        target.setCategory(source.getCategory());
        target.setCause(source.getCause());
        target.setCompensation(source.getCompensation());
        target.setComplaint(source.getComplaint());
        target.setDepartment(source.getDepartment());
        target.setDiscriminationType(source.getDiscriminationType());
        target.setEnhancementsNeeded(source.getEnhancementsNeeded());
        target.setFirstName(source.getFirstName());
        target.setIsRegulatory(source.getIsRegulatory());
        target.setIsVerbal(source.getIsVerbal());
        target.setIsWritten(source.getIsWritten());
        target.setLastName(source.getLastName());
        target.setPostalCode(source.getPostalCode());
        target.setResolution(source.getResolution());
        target.setResolutionDate(source.getResolutionDate());
        target.setSource(source.getSource());
        target.setType(source.getType());
    }

    @Override
    protected void validateUnique(final ComplaintComponent complaintComponent) throws IllegalArgumentException {

    }

    @Override
    protected String getModelName() {
        return ComplaintComponent.class.getSimpleName();
    }
}
