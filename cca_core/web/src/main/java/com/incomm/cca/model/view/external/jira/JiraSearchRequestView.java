package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraSearchRequestView implements Serializable {

    private String jql;
    private Long startAt = 0L;
    private Long maxResults = 1000L;
    private List<String> fields = new ArrayList<>();

    public JiraSearchRequestView() {
    }

    public JiraSearchRequestView(String projectName, List<String> fields) {
        this.jql = String.format("project = %s", projectName);
        this.fields = fields;
    }

    public JiraSearchRequestView searchTerm(String fieldName, String value) {
        this.jql = String.format("%s AND %s ~ '%s'", this.jql, fieldName, value);
        return this;
    }

    public JiraSearchRequestView equalsSearchTerm(String fieldName, String value) {
        if (value.contains("\"")) {
            value = value.replaceAll("\"", "");
        }
        this.jql = String.format("%s AND %s = '%s'", this.jql, fieldName, value);
        return this;
    }

    public Long getStartAt() {
        return startAt;
    }

    public void setStartAt(Long startAt) {
        this.startAt = startAt;
    }

    public Long getMaxResults() {
        return maxResults;
    }

    public void setMaxResults(Long maxResults) {
        this.maxResults = maxResults;
    }

    public List<String> getFields() {
        return fields;
    }

    public void setFields(List<String> fields) {
        this.fields = fields;
    }

    public String getJql() {
        return jql;
    }

    public void setJql(String jql) {
        this.jql = jql;
    }
}
