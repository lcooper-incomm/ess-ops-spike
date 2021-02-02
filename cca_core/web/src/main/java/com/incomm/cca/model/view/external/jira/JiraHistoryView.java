package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraHistoryView implements Serializable {

    private String id;
    private JiraUserView author;
    private Date created;
    private List<JiraHistoryItemView> items = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public JiraUserView getAuthor() {
        return author;
    }

    public void setAuthor(JiraUserView author) {
        this.author = author;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public List<JiraHistoryItemView> getItems() {
        return items;
    }

    public void setItems(List<JiraHistoryItemView> items) {
        this.items = items;
    }
}
