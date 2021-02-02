package com.incomm.cca.model.domain.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.AuditableEntity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.PreRemove;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "permission")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Permission extends AuditableEntity {

    private Long id;
    private String systemName;
    private String displayName;
    private String description;
    private PermissionCategory category;
    private Boolean active;
    private Set<Group> groups = new HashSet<>();
    private Set<Role> roles = new HashSet<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSystemName() {
        return systemName;
    }

    public void setSystemName(String systemName) {
        this.systemName = systemName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToOne
    @JoinColumn(name = "permission_category_id")
    public PermissionCategory getCategory() {
        return category;
    }

    public void setCategory(PermissionCategory category) {
        this.category = category;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @JsonIgnore
    @ManyToMany(mappedBy = "permissions")
    public Set<Group> getGroups() {
        return groups;
    }

    @PreRemove
    private void removeForeignKeyRelations() {
        Set<Group> groups = getGroups();

        for (Group g : groups) {
            g.getPermissions()
             .remove(this);
        }

        Set<Role> roles = getRoles();

        for (Role r : roles) {
            r.getPermissions()
             .remove(this);
        }
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }

    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, mappedBy = "permissions")
    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "Permission{" +
                "id=" + id +
                ", systemName=" + systemName +
                ", displayName='" + displayName + '\'' +
                ", description='" + description + '\'' +
                ", category=" + category +
                ", active=" + active +
                '}';
    }
}
