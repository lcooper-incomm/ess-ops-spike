package com.incomm.cca.model.domain.search;

import com.incomm.cscore.mvcutils.model.CrudEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table
public class SearchTypeParameterGroupParameter implements CrudEntity<Long> {

    private Long id;
    private SearchTypeParameterGroup group;
    private SearchParameter parameter;
    private Integer priority;
    private Boolean isAdvanced = false;

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
    @JoinColumn(name = "group_id")
    public SearchTypeParameterGroup getGroup() {
        return group;
    }

    public void setGroup(final SearchTypeParameterGroup group) {
        this.group = group;
    }

    @ManyToOne
    @JoinColumn(name = "search_parameter_id")
    public SearchParameter getParameter() {
        return parameter;
    }

    public void setParameter(final SearchParameter parameter) {
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

    @Override
    public void validate() throws IllegalArgumentException {

    }
}
