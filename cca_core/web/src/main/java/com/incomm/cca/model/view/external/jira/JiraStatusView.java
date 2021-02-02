package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraStatusView implements Serializable {

    private String id;
    private String self;
    private String description;
    private String iconUrl;
    private String name;
    private JiraStatusCategoryView statusCategory;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSelf() {
        return self;
    }

    public void setSelf(String self) {
        this.self = self;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public JiraStatusCategoryView getStatusCategory() {
        return statusCategory;
    }

    public void setStatusCategory(JiraStatusCategoryView statusCategory) {
        this.statusCategory = statusCategory;
    }
}
