package com.incomm.cca.model.dictionary;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.incomm.cca.model.domain.AuditableEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "encor_types")
public class EncorTypes extends AuditableEntity implements DictionaryEntity, Serializable {

    private Long id;
    private String primaryType;
    private String type;
    private String subtype;
    Boolean isActive;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonGetter("value")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonGetter("type")
    public String getPrimaryType() {
        return primaryType;
    }

    public void setPrimaryType(String primaryType) {
        this.primaryType = primaryType;
    }

    @JsonGetter("group")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @JsonGetter("displayValue")
    public String getSubtype() {
        return subtype;
    }

    public void setSubtype(String subtype) {
        this.subtype = subtype;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (StringUtils.isBlank(primaryType)) {
            throw new IllegalArgumentException("primaryType must be provided");
        } else if (StringUtils.isBlank(type)) {
            throw new IllegalArgumentException("type must be provided");
        } else if (StringUtils.isBlank(subtype)) {
            throw new IllegalArgumentException("subtype must be provided");
        }
    }
}
