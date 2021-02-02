package com.incomm.cca.model.view.session.selection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class IdentifierView implements Serializable {

    protected Long id;
    protected String partner;
    protected String platform;
    protected String type;
    protected String value;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(final String value) {
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

    public void setPlatform(final String platform) {
        this.platform = platform;
    }
}
