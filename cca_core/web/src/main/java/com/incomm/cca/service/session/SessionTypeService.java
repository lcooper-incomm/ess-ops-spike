package com.incomm.cca.service.session;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.SessionClassType;
import com.incomm.cca.model.domain.session.SessionType;
import com.incomm.cca.repository.session.SessionTypeRepository;
import com.incomm.cca.service.CcaAbstractCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionTypeService extends CcaAbstractCrudService<SessionType, Long> {

    @Autowired
    private SessionTypeRepository sessionTypeRepository;

    public List<SessionType> findAllCaseTypes() {
        return this.sessionTypeRepository.findAllBySessionClassName(SessionClassType.CASE);
    }

    public SessionType findOneByName(String name) {
        return sessionTypeRepository.findOneByNameIgnoreCase(name);
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
    protected void controlledUpdateOne(final SessionType source, final SessionType target) {
        throw new UnsupportedOperationException();
    }

    @Override
    protected void validateUnique(final SessionType sessionType) throws IllegalArgumentException {
        throw new UnsupportedOperationException();
    }

    @Override
    protected String getModelName() {
        return SessionType.class.getSimpleName();
    }
}
