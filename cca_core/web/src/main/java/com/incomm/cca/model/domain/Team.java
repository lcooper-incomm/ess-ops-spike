package com.incomm.cca.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.util.CaseFormatUtil;
import com.incomm.cscore.mvcutils.model.CrudEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
@JsonIgnoreProperties(ignoreUnknown = true)
public class Team extends AuditableEntity implements CrudEntity<Long> {

    private Long id;
    private String systemName;
    private String displayName;
    private String description;
    private Permission casePermission;
    private Set<User> members = new HashSet<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getSystemName() {
        return systemName;
    }

    public void setSystemName(final String systemName) {
        this.systemName = systemName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(final String displayName) {
        this.displayName = displayName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    @ManyToOne
    @JoinColumn(name = "case_permission_id")
    public Permission getCasePermission() {
        return casePermission;
    }

    public void setCasePermission(Permission permission) {
        this.casePermission = permission;
    }

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "team_member",
            joinColumns = @JoinColumn(name = "team_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    public Set<User> getMembers() {
        return members;
    }

    public void setMembers(final Set<User> members) {
        this.members = members;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (StringUtils.isBlank(this.displayName)) {
            throw new IllegalArgumentException("Team display name must be provided");
        } else {
            this.systemName = CaseFormatUtil.upperUnderscore(this.displayName);
        }
    }

    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", systemName='" + systemName + '\'' +
                ", displayName='" + displayName + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
