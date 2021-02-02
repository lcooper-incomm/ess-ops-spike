package com.incomm.cca.model.domain.mapping;

import com.incomm.cscore.mvcutils.model.CrudEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class ActionReasonCodeMapping implements CrudEntity<Long> {

    private Long id;
    private String code;
    private String displayValue;
    private String type;
    private String platform;
    private String platformCode;
    private Boolean isActive = false;

    @Id
    @Override
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(final String code) {
        this.code = code;
    }

    public String getDisplayValue() {
        return displayValue;
    }

    public void setDisplayValue(final String displayValue) {
        this.displayValue = displayValue;
    }

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(final String platform) {
        this.platform = platform;
    }

    public String getPlatformCode() {
        return platformCode;
    }

    public void setPlatformCode(final String platformCode) {
        this.platformCode = platformCode;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(final Boolean active) {
        isActive = active;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (StringUtils.isBlank(this.code)) {
            throw new IllegalArgumentException("ActionReasonCodeMapping code must be provided");
        } else if (StringUtils.isBlank(this.displayValue)) {
            throw new IllegalArgumentException("ActionReasonCodeMapping displayValue must be provided");
        } else if (StringUtils.isBlank(this.type)) {
            throw new IllegalArgumentException("ActionReasonCodeMapping type must be provided");
        } else if (StringUtils.isBlank(this.platform)) {
            throw new IllegalArgumentException("ActionReasonCodeMapping platform must be provided");
        } else if (StringUtils.isBlank(this.platformCode)) {
            throw new IllegalArgumentException("ActionReasonCodeMapping platformCode must be provided");
        } else if (this.isActive == null) {
            throw new IllegalArgumentException("ActionReasonCodeMapping isActive must be provided");
        }
    }
}
