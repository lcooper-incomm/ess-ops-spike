package com.incomm.cca.model.view.search;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.PermissionView;
import com.incomm.cca.model.view.session.selection.PartnerView;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SearchTypeView implements Serializable {

    private Long id;
    private SearchTypeCategoryView category;
    private String name;
    private String platform;
    private String selectionType;
    private String type;
    private Long defaultQuickSearchParameterId;
    private List<SearchTypeParameterGroupView> parameterGroups = new ArrayList<>();
    private List<PartnerView> partners = new ArrayList<>();
    private List<PermissionView> permissions = new ArrayList<>();
    private List<SearchParameterView> quickSearchParameters = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public SearchTypeCategoryView getCategory() {
        return category;
    }

    public void setCategory(final SearchTypeCategoryView category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(final String platform) {
        this.platform = platform;
    }

    public String getSelectionType() {
        return selectionType;
    }

    public void setSelectionType(final String selectionType) {
        this.selectionType = selectionType;
    }

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public Long getDefaultQuickSearchParameterId() {
        return defaultQuickSearchParameterId;
    }

    public void setDefaultQuickSearchParameterId(final Long defaultQuickSearchParameterId) {
        this.defaultQuickSearchParameterId = defaultQuickSearchParameterId;
    }

    public List<SearchTypeParameterGroupView> getParameterGroups() {
        return parameterGroups;
    }

    public void setParameterGroups(final List<SearchTypeParameterGroupView> parameterGroups) {
        this.parameterGroups = parameterGroups;
    }

    public List<PartnerView> getPartners() {
        return partners;
    }

    public void setPartners(final List<PartnerView> partners) {
        this.partners = partners;
    }

    public List<PermissionView> getPermissions() {
        return permissions;
    }

    public void setPermissions(final List<PermissionView> permissions) {
        this.permissions = permissions;
    }

    public List<SearchParameterView> getQuickSearchParameters() {
        return quickSearchParameters;
    }

    public void setQuickSearchParameters(final List<SearchParameterView> quickSearchParameters) {
        this.quickSearchParameters = quickSearchParameters;
    }
}
