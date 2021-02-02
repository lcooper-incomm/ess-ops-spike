package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EnhancedJiraChangeLogView implements Serializable {

    private String id;
    private JiraUserView author;
    private CsCoreTimestamp createdDate;
    private List<JiraHistoryItemView> items = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public JiraUserView getAuthor() {
        return author;
    }

    public void setAuthor(final JiraUserView author) {
        this.author = author;
    }

    public CsCoreTimestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final CsCoreTimestamp createdDate) {
        this.createdDate = createdDate;
    }

    public List<JiraHistoryItemView> getItems() {
        return items;
    }

    public void setItems(final List<JiraHistoryItemView> items) {
        this.items = items;
    }
}
