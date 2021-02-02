package com.incomm.cca.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class VmsProductType {

    private Long id;
    private VmsProductCode code;
    private String vmsId;
    private String name;
    private Boolean enabled;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "vms_product_code_id")
    public VmsProductCode getCode() {
        return code;
    }

    public void setCode(VmsProductCode code) {
        this.code = code;
    }

    public String getVmsId() {
        return vmsId;
    }

    public void setVmsId(String vmsId) {
        this.vmsId = vmsId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}
