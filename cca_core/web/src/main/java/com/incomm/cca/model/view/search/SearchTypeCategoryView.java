package com.incomm.cca.model.view.search;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SearchTypeCategoryView implements Serializable {

    private Long id;
    private String name;
    private List<SearchTypeView> searchTypes = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public List<SearchTypeView> getSearchTypes() {
        return searchTypes;
    }

    public void setSearchTypes(final List<SearchTypeView> searchTypes) {
        this.searchTypes = searchTypes;
    }
}
