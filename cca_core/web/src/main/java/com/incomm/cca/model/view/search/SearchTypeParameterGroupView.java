package com.incomm.cca.model.view.search;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SearchTypeParameterGroupView implements Serializable {

    private Long id;
    private String name;
    private Integer priority;
    private List<SearchTypeParameterGroupParameterView> parameters = new ArrayList<>();

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

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(final Integer priority) {
        this.priority = priority;
    }

    public List<SearchTypeParameterGroupParameterView> getParameters() {
        return parameters;
    }

    public void setParameters(final List<SearchTypeParameterGroupParameterView> parameters) {
        this.parameters = parameters;
    }
}
