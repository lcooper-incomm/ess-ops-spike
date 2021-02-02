package com.incomm.cca.model.view.external.vms;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VmsProductCodesSyncResults implements Serializable {

    private List<VmsProductTypeSummaryView> createdProductTypes = new ArrayList<>();
    private List<VmsProductTypeSummaryView> deletedProductTypes = new ArrayList<>();

    public List<VmsProductTypeSummaryView> getCreatedProductTypes() {
        return createdProductTypes;
    }

    public void setCreatedProductTypes(List<VmsProductTypeSummaryView> createdProductTypes) {
        this.createdProductTypes = createdProductTypes;
    }

    public List<VmsProductTypeSummaryView> getDeletedProductTypes() {
        return deletedProductTypes;
    }

    public void setDeletedProductTypes(List<VmsProductTypeSummaryView> deletedProductTypes) {
        this.deletedProductTypes = deletedProductTypes;
    }
}
