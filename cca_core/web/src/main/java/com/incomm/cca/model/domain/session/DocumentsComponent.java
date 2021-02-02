package com.incomm.cca.model.domain.session;

import com.incomm.cscore.mvcutils.model.CrudEntity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class DocumentsComponent implements Serializable, CrudEntity<Long> {

    private Long id;
    private Session session;
    private List<Document> documents = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "session_id")
    public Session getSession() {
        return session;
    }

    public void setSession(final Session session) {
        this.session = session;
    }

    @OneToMany(mappedBy = "documentsComponent", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(final List<Document> documents) {
        this.documents = documents;
    }

    @Override
    public void validate() {
        if (this.session == null) {
            throw new IllegalArgumentException("DocumentsComponent must be associated to a Session");
        }
    }
}
