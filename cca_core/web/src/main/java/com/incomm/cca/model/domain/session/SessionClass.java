package com.incomm.cca.model.domain.session;

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
public class SessionClass implements CrudEntity<Long> {

    private Long id;
    private String name;
    private List<SessionType> sessionTypes = new ArrayList<>();

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

    @OneToMany(mappedBy = "sessionClass")
    public List<SessionType> getSessionTypes() {
        return sessionTypes;
    }

    public void setSessionTypes(final List<SessionType> sessionTypes) {
        this.sessionTypes = sessionTypes;
    }

    @Override
    public void validate() throws IllegalArgumentException {

    }
}
