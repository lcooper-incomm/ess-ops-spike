package com.incomm.cca.model.view.external.vms;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.session.selection.PartnerView;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VmsProductCodeView implements Serializable {

    private Long id;
    private String code;
    private String name;
    private PartnerView partner;
    private String vmsId;
    private List<VmsProductTypeView> types = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(final String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public PartnerView getPartner() {
        return partner;
    }

    public void setPartner(final PartnerView partner) {
        this.partner = partner;
    }

    public String getVmsId() {
        return vmsId;
    }

    public void setVmsId(final String vmsId) {
        this.vmsId = vmsId;
    }

    public List<VmsProductTypeView> getTypes() {
        return types;
    }

    public void setTypes(final List<VmsProductTypeView> types) {
        this.types = types;
    }
}
