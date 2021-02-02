package com.incomm.cca.service.session;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.session.Document;
import com.incomm.cca.service.CcaAbstractCrudService;
import com.incomm.cca.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocumentService extends CcaAbstractCrudService<Document, Long> {

    @Autowired
    private UserService userService;

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
    protected void controlledUpdateOne(final Document source, final Document target) {
        target.setLink(source.getLink());
        target.setName(source.getName());

        target.setModifiedBy(userService.currentPersistentUser());
    }

    @Override
    protected void validateUnique(final Document document) throws IllegalArgumentException {

    }

    @Override
    protected String getModelName() {
        return Document.class.getSimpleName();
    }
}
