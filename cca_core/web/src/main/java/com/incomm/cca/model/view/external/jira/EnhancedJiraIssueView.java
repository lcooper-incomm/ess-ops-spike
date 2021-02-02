package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.session.comment.CommentView;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EnhancedJiraIssueView implements Serializable {

    private String id;
    private EnhancedJiraChangeLogWrapperView changeLog;
    private String expand;
    private EnhancedJiraFieldsView fields;
    private String key;
    private String self;
    private List<CommentView> comments = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(final String key) {
        this.key = key;
    }

    public EnhancedJiraFieldsView getFields() {
        return fields;
    }

    public void setFields(final EnhancedJiraFieldsView fields) {
        this.fields = fields;
    }

    public String getExpand() {
        return expand;
    }

    public void setExpand(final String expand) {
        this.expand = expand;
    }

    public String getSelf() {
        return self;
    }

    public void setSelf(final String self) {
        this.self = self;
    }

    public EnhancedJiraChangeLogWrapperView getChangeLog() {
        return changeLog;
    }

    public void setChangeLog(final EnhancedJiraChangeLogWrapperView changeLog) {
        this.changeLog = changeLog;
    }

    public List<CommentView> getComments() {
        return comments;
    }

    public void setComments(final List<CommentView> comments) {
        this.comments = comments;
    }
}
