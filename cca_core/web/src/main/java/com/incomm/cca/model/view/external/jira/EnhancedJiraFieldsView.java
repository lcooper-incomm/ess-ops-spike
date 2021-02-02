package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EnhancedJiraFieldsView implements Serializable {

    private JiraUserView assignee;
    private CsCoreTimestamp createdDate;
    private String customerName;
    private String customerPhone;
    private String description;
    private JiraUserView reporter;
    private JiraStatusView status;
    private String summary;
    private CsCoreTimestamp updatedDate;
    private List<JiraComponentView> components = new ArrayList<>();

    public JiraUserView getAssignee() {
        return assignee;
    }

    public void setAssignee(final JiraUserView assignee) {
        this.assignee = assignee;
    }

    public CsCoreTimestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final CsCoreTimestamp createdDate) {
        this.createdDate = createdDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(final String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(final String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public JiraUserView getReporter() {
        return reporter;
    }

    public void setReporter(final JiraUserView reporter) {
        this.reporter = reporter;
    }

    public JiraStatusView getStatus() {
        return status;
    }

    public void setStatus(final JiraStatusView status) {
        this.status = status;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(final String summary) {
        this.summary = summary;
    }

    public CsCoreTimestamp getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(final CsCoreTimestamp updatedDate) {
        this.updatedDate = updatedDate;
    }

    public List<JiraComponentView> getComponents() {
        return components;
    }

    public void setComponents(final List<JiraComponentView> components) {
        this.components = components;
    }
}
