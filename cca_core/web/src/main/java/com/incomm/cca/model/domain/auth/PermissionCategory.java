package com.incomm.cca.model.domain.auth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.AuditableEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "permission_category")
@JsonIgnoreProperties(ignoreUnknown = true)
public class PermissionCategory extends AuditableEntity {

    private Long id;
    private String systemName;
    private String displayName;
    private String description;
    private Boolean locked;
    private Set<Permission> permissions = new HashSet<>();

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

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    @OneToMany(mappedBy = "category")
    public Set<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    @Override
    public String toString() {
        return "PermissionCategory{" +
                "locked=" + locked +
                ", description='" + description + '\'' +
                ", displayName='" + displayName + '\'' +
                ", systemName=" + systemName +
                ", id=" + id +
                '}';
    }
}
