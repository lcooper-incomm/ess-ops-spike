package com.incomm.cca.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cscore.mvcutils.model.CrudEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table
@JsonIgnoreProperties(ignoreUnknown = true)
public class Report implements CrudEntity<Long> {

    private Long id;
    private String link;
    private String name;
    private String snippet;
    private Boolean status = true;
    private Permission permission;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getSnippet() {
        return snippet;
    }

    public void setSnippet(String snippet) {
        this.snippet = snippet;
    }

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "permission_id")
    public Permission getPermission() {
        return permission;
    }

    public void setPermission(final Permission permission) {
        this.permission = permission;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (StringUtils.isBlank(name)) {
            throw new IllegalArgumentException("Report must have a name");
        } else if (permission == null) {
            throw new IllegalArgumentException("Report must have a permission");
        }
    }
}
