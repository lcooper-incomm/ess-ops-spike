package com.incomm.cca.model.view;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.Property;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SimplePropertyView implements Serializable {

    private Long id;
    private String systemName;
    private String displayName;
    private String description;
    private String value;

    public SimplePropertyView() {
    }

    public SimplePropertyView(Property property) {
        this.id = property.getId();
        this.systemName = property.getSystemName();
        this.displayName = property.getDisplayName();
        this.description = property.getDescription();
        this.value = property.getValue();
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

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "SimplePropertyView{" +
                "id=" + id +
                ", systemName=" + systemName +
                ", displayName='" + displayName + '\'' +
                ", description='" + description + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}
