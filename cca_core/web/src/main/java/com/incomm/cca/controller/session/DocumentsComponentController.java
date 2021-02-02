package com.incomm.cca.controller.session;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.DocumentComponentConverter;
import com.incomm.cca.model.domain.session.Document;
import com.incomm.cca.model.domain.session.DocumentsComponent;
import com.incomm.cca.service.session.DocumentService;
import com.incomm.cca.service.session.DocumentsComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/documents-component")
public class DocumentsComponentController extends RestResponseHandler {

    @Autowired
    private DocumentService documentService;
    @Autowired
    private DocumentComponentConverter documentComponentConverter;
    @Autowired
    private DocumentsComponentService documentsComponentService;

    @RequestMapping(value = "/{id}/document", method = RequestMethod.POST)
    public ResponseEntity addOneDocument(@PathVariable("id") Long id, @RequestBody Document request) {
        Document domainModel = documentsComponentService.addOneDocument(id, request);
        return ok(documentComponentConverter.convert(domainModel));
    }

    @RequestMapping(value = "/document/{documentId}", method = RequestMethod.DELETE)
    public ResponseEntity deleteOneDocument(@PathVariable("documentId") Long documentId) {
        documentService.deleteOne(documentId);
        return noContent();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody DocumentsComponent request) {
        DocumentsComponent domainModel = documentsComponentService.updateOne(request);
        return ok(documentComponentConverter.convert(domainModel));
    }

    @RequestMapping(value = "/document/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOneDocument(@PathVariable("id") Long id, @RequestBody Document request) {
        Document domainModel = documentService.updateOne(request);
        return ok(documentComponentConverter.convert(domainModel));
    }
}
