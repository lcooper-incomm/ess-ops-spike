package com.incomm.cca.model.domain;

import com.incomm.cscore.mvcutils.model.CrudEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class PlatformStatusValue implements CrudEntity<Long> {

    private Long id;
    private String name;
    private String platform;
    private String value;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Override
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(final String platform) {
        this.platform = platform;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(final String value) {
        this.value = value;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (StringUtils.isBlank(this.name)) {
            throw new IllegalArgumentException("PlatformStatusValue must have a name");
        } else if (StringUtils.isBlank(this.platform)) {
            throw new IllegalArgumentException("PlatformStatusValue must have a platform");
        } else if (StringUtils.isBlank(this.value)) {
            throw new IllegalArgumentException("PlatformStatusValue must have a value");
        }
    }
}
