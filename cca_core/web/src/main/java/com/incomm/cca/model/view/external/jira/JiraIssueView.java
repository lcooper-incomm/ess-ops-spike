package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraIssueView implements Serializable {

    private String id;
    private String key;
    private JiraFieldsView fields;
    private String expand;
    private String self;
    @JsonProperty("changelog")
    private JiraChangelogWrapperView changelogWrapper;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public JiraFieldsView getFields() {
        return fields;
    }

    public void setFields(JiraFieldsView fields) {
        this.fields = fields;
    }

    public JiraChangelogWrapperView getChangelogWrapper() {
        return changelogWrapper;
    }

    public void setChangelogWrapper(JiraChangelogWrapperView changelogWrapper) {
        this.changelogWrapper = changelogWrapper;
    }

    public String getExpand() {
        return expand;
    }

    public void setExpand(String expand) {
        this.expand = expand;
    }

    public String getSelf() {
        return self;
    }

    public void setSelf(String self) {
        this.self = self;
    }
}
