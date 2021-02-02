package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraFieldsView implements Serializable {

    private String summary;
    private String description;
    private Date created;
    private Date updated;
    private JiraUserView reporter;
    private JiraUserView assignee;
    private JiraStatusView status;
    @JsonProperty("comment")
    private JiraCommentWrapperView commentWrapper;
    @JsonProperty("customfield_10011")
    private String customFieldCustomerName;
    @JsonProperty("customfield_10012")
    private String customFieldCustomerPhone;
    private List<JiraComponentView> components = new ArrayList<>();

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public JiraUserView getReporter() {
        return reporter;
    }

    public void setReporter(JiraUserView reporter) {
        this.reporter = reporter;
    }

    public JiraUserView getAssignee() {
        return assignee;
    }

    public void setAssignee(JiraUserView assignee) {
        this.assignee = assignee;
    }

    public JiraStatusView getStatus() {
        return status;
    }

    public void setStatus(JiraStatusView status) {
        this.status = status;
    }

    public JiraCommentWrapperView getCommentWrapper() {
        return commentWrapper;
    }

    public void setCommentWrapper(JiraCommentWrapperView commentWrapper) {
        this.commentWrapper = commentWrapper;
    }

    public String getCustomerName() {
        return customFieldCustomerName;
    }

    public void setCustomerName(String customerName) {
        this.customFieldCustomerName = customerName;
    }

    public String getCustomerPhone() {
        return customFieldCustomerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customFieldCustomerPhone = customerPhone;
    }

    public List<JiraComponentView> getComponents() {
        return components;
    }

    public void setComponents(List<JiraComponentView> components) {
        this.components = components;
    }
}
