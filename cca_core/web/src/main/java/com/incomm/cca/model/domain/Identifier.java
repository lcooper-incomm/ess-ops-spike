package com.incomm.cca.model.domain;

import com.incomm.cca.model.domain.session.Selection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Identifier implements Serializable {

    private Long id;
    private String identifierType;
    private String value;
    private String partner;
    private String platform;
    private List<Comment> comments = new ArrayList<>();
    private List<Selection> selections = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentifierType() {
        return identifierType;
    }

    public void setIdentifierType(String identifierType) {
        this.identifierType = identifierType;
    }

    @Column(name = "identifier")
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getPartner() {
        return partner;
    }

    public void setPartner(final String partner) {
        this.partner = partner;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    @ManyToMany
    @JoinTable(
            name = "identifier_comment",
            joinColumns = @JoinColumn(name = "identifier_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "comment_id", referencedColumnName = "id")
    )
    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    @ManyToMany(mappedBy = "identifiers")
    public List<Selection> getSelections() {
        return selections;
    }

    public void setSelections(final List<Selection> selections) {
        this.selections = selections;
    }
}
