package com.incomm.cca.model.domain.search;

import com.incomm.cscore.mvcutils.model.CrudEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class SearchTypeCategory implements CrudEntity<Long> {

    private Long id;
    private String name;
    private List<SearchType> searchTypes = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @OneToMany(mappedBy = "category")
    public List<SearchType> getSearchTypes() {
        return searchTypes;
    }

    public void setSearchTypes(final List<SearchType> searchTypes) {
        this.searchTypes = searchTypes;
    }

    @Override
    public void validate() throws IllegalArgumentException {

    }
}
