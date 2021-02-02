package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DocumentsComponentView implements Serializable {

    private Long id;
    private List<DocumentsComponentDocumentView> documents = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public List<DocumentsComponentDocumentView> getDocuments() {
        return documents;
    }

    public void setDocuments(final List<DocumentsComponentDocumentView> documents) {
        this.documents = documents;
    }
}
