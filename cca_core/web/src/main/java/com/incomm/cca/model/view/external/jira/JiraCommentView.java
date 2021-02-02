package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.Comment;

import java.io.Serializable;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraCommentView implements Serializable {

    private String id;
    private String self;
    private JiraUserView author;
    private String body;
    private JiraUserView updateAuthor;
    private Date created;
    private Date updated;

    public JiraCommentView() {
    }

    public JiraCommentView(Comment comment) {
        this.id = String.format("CCA-%s", comment.getId());
		this.body = comment.getContent();
        this.created = comment.getCreatedDate();
        this.updated = comment.getCreatedDate();

        if (comment.getCreatedBy() != null) {
            JiraUserView jiraUser = new JiraUserView(comment.getCreatedBy());
            this.author = jiraUser;
            this.updateAuthor = jiraUser;
        }
    }

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

    public JiraUserView getAuthor() {
        return author;
    }

    public void setAuthor(JiraUserView author) {
        this.author = author;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public JiraUserView getUpdateAuthor() {
        return updateAuthor;
    }

    public void setUpdateAuthor(JiraUserView updateAuthor) {
        this.updateAuthor = updateAuthor;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }
}
