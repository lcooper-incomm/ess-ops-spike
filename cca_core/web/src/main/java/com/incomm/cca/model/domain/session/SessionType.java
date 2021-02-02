package com.incomm.cca.model.domain.session;

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
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class SessionType implements CrudEntity<Long> {

    private Long id;
    private String name;
    private SessionClass sessionClass;
    private Permission permission;
    private List<SessionComponent> components = new ArrayList<>();
    private List<SessionStatus> statuses = new ArrayList<>();

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

    @ManyToOne
    @JoinColumn(name = "permission_id")
    public Permission getPermission() {
        return permission;
    }

    public void setPermission(final Permission permission) {
        this.permission = permission;
    }

    @ManyToOne
    @JoinColumn(name = "session_class_id")
    public SessionClass getSessionClass() {
        return sessionClass;
    }

    public void setSessionClass(final SessionClass sessionClass) {
        this.sessionClass = sessionClass;
    }

    @ManyToMany
    @JoinTable(name = "session_type_session_component",
            joinColumns = @JoinColumn(name = "session_type_id"),
            inverseJoinColumns = @JoinColumn(name = "session_component_id"))
    public List<SessionComponent> getComponents() {
        return components;
    }

    public void setComponents(final List<SessionComponent> components) {
        this.components = components;
    }

    @ManyToMany
    @JoinTable(name = "session_type_session_status",
            joinColumns = @JoinColumn(name = "session_type_id"),
            inverseJoinColumns = @JoinColumn(name = "session_status_id"))
    public List<SessionStatus> getStatuses() {
        return statuses;
    }

    public void setStatuses(final List<SessionStatus> statuses) {
        this.statuses = statuses;
    }

    @Override
    public void validate() throws IllegalArgumentException {

    }
}
