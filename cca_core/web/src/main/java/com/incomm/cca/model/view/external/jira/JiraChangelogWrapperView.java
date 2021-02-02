package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraChangelogWrapperView implements Serializable {

    private Long startAt;
    private Long maxResults;
    private Long total;
    private List<JiraHistoryView> histories = new ArrayList<>();

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

    public List<JiraHistoryView> getHistories() {
        return histories;
    }

    public void setHistories(List<JiraHistoryView> histories) {
        this.histories = histories;
    }
}
