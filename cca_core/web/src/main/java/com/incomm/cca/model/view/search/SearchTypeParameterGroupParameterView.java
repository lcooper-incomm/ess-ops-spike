package com.incomm.cca.model.view.search;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SearchTypeParameterGroupParameterView implements Serializable {

    private Long id;
    private SearchParameterView parameter;
    private Integer priority;
    private Boolean isAdvanced = false;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public SearchParameterView getParameter() {
        return parameter;
    }

    public void setParameter(final SearchParameterView parameter) {
        this.parameter = parameter;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(final Integer priority) {
        this.priority = priority;
    }

    public Boolean getIsAdvanced() {
        return isAdvanced;
    }

    public void setIsAdvanced(final Boolean advanced) {
        isAdvanced = advanced;
    }
}
