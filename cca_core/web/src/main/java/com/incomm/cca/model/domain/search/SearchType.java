package com.incomm.cca.model.domain.search;

import com.incomm.cca.model.domain.Partner;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cscore.mvcutils.model.CrudEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class SearchType implements CrudEntity<Long> {

    private Long id;
    private SearchTypeCategory category;
    private String name;
    private String platform;
    private String selectionType;
    private String type;
    private Long defaultQuickSearchParameterId;
    private List<SearchTypeParameterGroup> parameterGroups = new ArrayList<>();
    private List<Partner> partners = new ArrayList<>();
    private List<Permission> permissions = new ArrayList<>();
    private List<SearchParameter> quickSearchParameters = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Override
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "category_id")
    public SearchTypeCategory getCategory() {
        return category;
    }

    public void setCategory(final SearchTypeCategory category) {
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

    @OneToMany(mappedBy = "searchType")
    public List<SearchTypeParameterGroup> getParameterGroups() {
        return parameterGroups;
    }

    public void setParameterGroups(final List<SearchTypeParameterGroup> parameterGroups) {
        this.parameterGroups = parameterGroups;
    }

    @ManyToMany
    @JoinTable(name = "search_type_partner",
            joinColumns = @JoinColumn(name = "search_type_id"),
            inverseJoinColumns = @JoinColumn(name = "partner_id"))
    public List<Partner> getPartners() {
        return partners;
    }

    public void setPartners(final List<Partner> partners) {
        this.partners = partners;
    }

    @ManyToMany
    @JoinTable(name = "search_type_permission",
            joinColumns = @JoinColumn(name = "search_type_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id"))
    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(final List<Permission> permissions) {
        this.permissions = permissions;
    }

    @ManyToMany
    @JoinTable(name = "search_type_quick_search_parameter",
            joinColumns = @JoinColumn(name = "search_type_id"),
            inverseJoinColumns = @JoinColumn(name = "search_parameter_id"))
    public List<SearchParameter> getQuickSearchParameters() {
        return quickSearchParameters;
    }

    public void setQuickSearchParameters(final List<SearchParameter> quickSearchParameters) {
        this.quickSearchParameters = quickSearchParameters;
    }

    @Override
    public void validate() throws IllegalArgumentException {

    }
}
