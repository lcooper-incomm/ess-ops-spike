package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraSearchResponseView implements Serializable {

    private String expand;
    private Long startAt = 0L;
    private Long maxResults = 0L;
    private Long total = 0L;
    private List<JiraIssueView> issues = new ArrayList<>();

    public String getExpand() {
        return expand;
    }

    public void setExpand(String expand) {
        this.expand = expand;
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

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public List<JiraIssueView> getIssues() {
        return issues;
    }

    public void setIssues(List<JiraIssueView> issues) {
        this.issues = issues;
    }
}
