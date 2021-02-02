package com.incomm.cca.service.session;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.session.Document;
import com.incomm.cca.model.domain.session.DocumentsComponent;
import com.incomm.cca.service.CcaAbstractCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocumentsComponentService extends CcaAbstractCrudService<DocumentsComponent, Long> {

    @Autowired
    private DocumentService documentService;

    public Document addOneDocument(Long id, Document request) {
        DocumentsComponent documentsComponent = findOne(id);
        if (documentsComponent == null) {
            throw new IllegalArgumentException("No Documents Component found with this ID");
        }

        request.setDocumentsComponent(documentsComponent);
        return documentService.addOne(request);
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
    protected void controlledUpdateOne(final DocumentsComponent source, final DocumentsComponent target) {

    }

    @Override
    protected void validateUnique(final DocumentsComponent component) throws IllegalArgumentException {

    }

    @Override
    protected String getModelName() {
        return DocumentsComponent.class.getSimpleName();
    }
}
