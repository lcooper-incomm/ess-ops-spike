package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.Document;
import com.incomm.cca.model.domain.session.DocumentsComponent;
import com.incomm.cca.model.view.session.DocumentsComponentDocumentView;
import com.incomm.cca.model.view.session.DocumentsComponentView;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DocumentComponentConverter {

    public DocumentsComponentView convert(DocumentsComponent request) {
        DocumentsComponentView view = null;

        if (request != null) {
            view = new DocumentsComponentView();
            view.setId(request.getId());
            view.getDocuments()
                .addAll(this.convert(request.getDocuments()));
        }

        return view;
    }

    public List<DocumentsComponentDocumentView> convert(List<Document> request) {
        List<DocumentsComponentDocumentView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(document -> views.add(this.convert(document)));
        }

        return views;
    }

    public DocumentsComponentDocumentView convert(Document request) {
        DocumentsComponentDocumentView view = null;

        if (request != null) {
            view = new DocumentsComponentDocumentView();
            view.setId(request.getId());
            view.setLink(request.getLink());
            view.setName(request.getName());
        }

        return view;
    }
}
