package com.incomm.cca.service.session;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.session.AuditCardWorkflowActivity;
import com.incomm.cca.service.CcaAbstractCrudService;
import org.springframework.stereotype.Service;

@Service
public class AuditCardWorkflowActivityService extends CcaAbstractCrudService<AuditCardWorkflowActivity, Long> {

    @Override
    public void deleteOne(final Long id) {
        throw new UnsupportedOperationException();
    }

    @Override
    public AuditCardWorkflowActivity updateOne(final AuditCardWorkflowActivity request) {
        throw new UnsupportedOperationException();
    }

    @Override
    protected String getModelName() {
        return AuditCardWorkflowActivity.class.getSimpleName();
    }

    @Override
    protected void validateAddPermission() throws SecurityViolationException {

    }

    @Override
    protected void validateDeletePermission() throws SecurityViolationException {

    }

    @Override
    protected void validateFindPermission() throws SecurityViolationException {

    }

    @Override
    protected void validateUpdatePermission() throws SecurityViolationException {

    }

    @Override
    protected void controlledUpdateOne(final AuditCardWorkflowActivity source, final AuditCardWorkflowActivity target) {

    }

    @Override
    protected void validateUnique(final AuditCardWorkflowActivity history) throws IllegalArgumentException {

    }
}
