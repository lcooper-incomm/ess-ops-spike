package com.incomm.cca.model.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cca_property")
public class Property {

    private Long id;
    private String systemName;
    private String displayName;
    private String description;
    private String value;

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

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder("{");
        if (null != id) {
            builder.append("id=")
                   .append(id);
        }
        if (null != systemName) {
            builder.append(" systemName=")
                   .append(systemName);
        }
        if (null != displayName) {
            builder.append(" displayName=")
                   .append(displayName);
        }
        if (null != description) {
            builder.append(" description=")
                   .append(description);
        }
        if (null != value) {
            builder.append(" value=")
                   .append(value);
        }
        builder.append("}");
        return builder.toString();
    }
}
