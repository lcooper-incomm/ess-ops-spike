package com.incomm.cca.model.domain.session;

import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.domain.Partner;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "selection")
public class Selection implements Serializable {

    private Long id;
    private Date deletedDate;
    private String description;
    private String externalSessionId;
    private Partner partner;
    private String platform;
    private Session session;
    private String simplePartner;
    private String type;
    private Set<Identifier> identifiers = new HashSet<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "selection_identifier",
            joinColumns = @JoinColumn(name = "selection_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "identifier_id", referencedColumnName = "id")
    )
    public Set<Identifier> getIdentifiers() {
        return identifiers;
    }

    public void setIdentifiers(Set<Identifier> identifiers) {
        this.identifiers = identifiers;
    }

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "session_id")
    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public String getExternalSessionId() {
        return externalSessionId;
    }

    public void setExternalSessionId(String externalSessionId) {
        this.externalSessionId = externalSessionId;
    }

    @ManyToOne
    @JoinColumn(name = "partner_id")
    public Partner getPartner() {
        return partner;
    }

    public void setPartner(Partner partner) {
        this.partner = partner;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getDeletedDate() {
        return deletedDate;
    }

    public void setDeletedDate(final Date deletedDate) {
        this.deletedDate = deletedDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public String getSimplePartner() {
        return simplePartner;
    }

    public void setSimplePartner(final String simplePartner) {
        this.simplePartner = simplePartner;
    }
}
