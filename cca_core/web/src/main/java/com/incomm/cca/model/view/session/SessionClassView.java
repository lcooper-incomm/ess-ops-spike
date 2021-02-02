package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties
public class SessionClassView implements Serializable {

    private String name;
    private List<SessionTypeView> sessionTypes = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public List<SessionTypeView> getSessionTypes() {
        return sessionTypes;
    }

    public void setSessionTypes(final List<SessionTypeView> sessionTypes) {
        this.sessionTypes = sessionTypes;
    }
}
