package com.incomm.cca.model.view.session.selection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SelectionView implements Serializable {

    private Long id;
    private Object data;
    private String description;
    private String externalSessionId;
    private PartnerView partner;
    private String platform;
    private String simplePartner;
    private String type;
    private List<IdentifierView> identifiers = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public Object getData() {
        return data;
    }

    public void setData(final Object data) {
        this.data = data;
    }

    public String getExternalSessionId() {
        return externalSessionId;
    }

    public void setExternalSessionId(final String externalSessionId) {
        this.externalSessionId = externalSessionId;
    }

    public PartnerView getPartner() {
        return partner;
    }

    public void setPartner(final PartnerView partner) {
        this.partner = partner;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(final String platform) {
        this.platform = platform;
    }

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public List<IdentifierView> getIdentifiers() {
        return identifiers;
    }

    public void setIdentifiers(final List<IdentifierView> identifiers) {
        this.identifiers = identifiers;
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
