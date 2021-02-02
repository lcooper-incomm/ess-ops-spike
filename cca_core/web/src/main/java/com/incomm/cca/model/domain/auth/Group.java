package com.incomm.cca.model.domain.auth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.User;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cca_group")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Group extends AuditableEntity {

    private Long id;
    private String systemName;
    private String displayName;
    private String description;
    private Boolean active;
    private Boolean locked;
    private Set<User> owners = new HashSet<>();
    private Set<Role> roles = new HashSet<>();
    private Set<Permission> permissions = new HashSet<>();
    public static final String SYSTEM_ADMINISTRATION = "SYSTEM_ADMINISTRATION";

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

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    @ManyToMany(
            cascade = {CascadeType.MERGE, CascadeType.PERSIST}
    )
    @JoinTable(
            name = "cca_group_owner",
            joinColumns = @JoinColumn(name = "group_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    public Set<User> getOwners() {
        return owners;
    }

    public void setOwners(Set<User> admins) {
        this.owners = admins;
    }

    @OneToMany(mappedBy = "group", cascade = {CascadeType.ALL})
    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @ManyToMany(
            cascade = {CascadeType.MERGE, CascadeType.PERSIST}
    )
    @JoinTable(
            name = "cca_group_permission",
            joinColumns = @JoinColumn(name = "group_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id", referencedColumnName = "id")
    )
    public Set<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    @Override
    public String toString() {
        return "Group{" +
                "locked=" + locked +
                ", active=" + active +
                ", description='" + description + '\'' +
                ", displayName='" + displayName + '\'' +
                ", systemName='" + systemName + '\'' +
                ", id=" + id +
                '}';
    }
}
