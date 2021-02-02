package com.incomm.cca.model.domain;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class VmsProductCode {

    private Long id;
    private Partner partner;
    private String vmsId;
    private String name;
    private String code;
    private List<VmsProductType> types = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "partner_id")
    public Partner getPartner() {
        return partner;
    }

    public void setPartner(Partner partner) {
        this.partner = partner;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @OneToMany(mappedBy = "code", cascade = {CascadeType.ALL})
    public List<VmsProductType> getTypes() {
        return types;
    }

    public void setTypes(List<VmsProductType> types) {
        this.types = types;
    }
}
