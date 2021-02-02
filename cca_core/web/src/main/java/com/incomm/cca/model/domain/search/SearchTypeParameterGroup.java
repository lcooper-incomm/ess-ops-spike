package com.incomm.cca.model.domain.search;

import com.incomm.cscore.mvcutils.model.CrudEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class SearchTypeParameterGroup implements CrudEntity<Long> {

    private Long id;
    private String name;
    private Integer priority;
    private SearchType searchType;
    private List<SearchTypeParameterGroupParameter> parameters = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Override
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

    @OneToMany(mappedBy = "group")
    public List<SearchTypeParameterGroupParameter> getParameters() {
        return parameters;
    }

    public void setParameters(final List<SearchTypeParameterGroupParameter> parameters) {
        this.parameters = parameters;
    }

    @ManyToOne
    @JoinColumn(name = "search_type_id")
    public SearchType getSearchType() {
        return searchType;
    }

    public void setSearchType(final SearchType searchType) {
        this.searchType = searchType;
    }

    @Override
    public void validate() throws IllegalArgumentException {

    }
}
