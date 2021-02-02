package com.incomm.cca.model.domain.session;

import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cscore.mvcutils.model.CrudEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table
public class Document extends AuditableEntity implements CrudEntity<Long> {

    private Long id;
    private DocumentsComponent documentsComponent;
    private String name;
    private String link;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "documents_component_id")
    public DocumentsComponent getDocumentsComponent() {
        return documentsComponent;
    }

    public void setDocumentsComponent(final DocumentsComponent documentsComponent) {
        this.documentsComponent = documentsComponent;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(final String link) {
        this.link = link;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (StringUtils.isBlank(this.name)) {
            throw new IllegalArgumentException("Document name must be provided");
        } else if (StringUtils.isBlank(this.link)) {
            throw new IllegalArgumentException("Document link must be provided");
        }
    }
}
