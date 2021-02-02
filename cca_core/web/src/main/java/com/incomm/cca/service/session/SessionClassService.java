package com.incomm.cca.service.session;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.session.SessionClass;
import com.incomm.cca.repository.session.SessionClassRepository;
import com.incomm.cca.service.CcaAbstractCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionClassService extends CcaAbstractCrudService<SessionClass, Long> {

    @Autowired
    private SessionClassRepository sessionClassRepository;

    public SessionClass findOneBySessionType(String sessionType) {
        return sessionClassRepository.findOneBySessionTypesName(sessionType);
    }

    @Override
    protected void validateAddPermission() throws SecurityViolationException {
        throw new UnsupportedOperationException();
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
        throw new UnsupportedOperationException();
    }

    @Override
    protected void controlledUpdateOne(final SessionClass source, final SessionClass target) {
        throw new UnsupportedOperationException();
    }

    @Override
    protected void validateUnique(final SessionClass sessionClass) throws IllegalArgumentException {
        throw new UnsupportedOperationException();
    }

    @Override
    protected String getModelName() {
        return SessionClass.class.getSimpleName();
    }
}
