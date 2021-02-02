package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EnhancedJiraChangeLogWrapperView implements Serializable {

    private Long startAt;
    private Long maxResults;
    private Long total;
    private List<EnhancedJiraChangeLogView> histories = new ArrayList<>();

    public Long getStartAt() {
        return startAt;
    }

    public void setStartAt(final Long startAt) {
        this.startAt = startAt;
    }

    public Long getMaxResults() {
        return maxResults;
    }

    public void setMaxResults(final Long maxResults) {
        this.maxResults = maxResults;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(final Long total) {
        this.total = total;
    }

    public List<EnhancedJiraChangeLogView> getHistories() {
        return histories;
    }

    public void setHistories(final List<EnhancedJiraChangeLogView> histories) {
        this.histories = histories;
    }
}
