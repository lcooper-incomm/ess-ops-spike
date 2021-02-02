package com.incomm.cca.model.converter;

import com.incomm.cca.model.view.external.jira.EnhancedJiraChangeLogView;
import com.incomm.cca.model.view.external.jira.EnhancedJiraChangeLogWrapperView;
import com.incomm.cca.model.view.external.jira.EnhancedJiraFieldsView;
import com.incomm.cca.model.view.external.jira.EnhancedJiraIssueView;
import com.incomm.cca.model.view.external.jira.JiraChangelogWrapperView;
import com.incomm.cca.model.view.external.jira.JiraFieldsView;
import com.incomm.cca.model.view.external.jira.JiraHistoryView;
import com.incomm.cca.model.view.external.jira.JiraIssueView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class JiraIssueConverter {

    @Autowired
    private TimestampConverter timestampConverter;

    public List<EnhancedJiraIssueView> convert(Collection<JiraIssueView> request) {
        List<EnhancedJiraIssueView> items = new ArrayList<>();

        if (request != null) {
            request.forEach(issue -> items.add(this.convert(issue)));
        }

        return items;
    }

    public EnhancedJiraIssueView convert(JiraIssueView request) {
        EnhancedJiraIssueView view = null;

        if (request != null) {
            view = new EnhancedJiraIssueView();
            view.setId(request.getId());
            view.setKey(request.getKey());
            view.setFields(this.convert(request.getFields()));
            view.setExpand(request.getExpand());
            view.setSelf(request.getSelf());
            view.setChangeLog(this.convert(request.getChangelogWrapper()));

            if (request.getFields() != null
                    && request.getFields()
                              .getCommentWrapper() != null
                    && request.getFields()
                              .getCommentWrapper()
                              .getComments() != null) {
                view.getComments()
                    .addAll(request.getFields()
                                   .getCommentWrapper()
                                   .getComments());
            }
        }

        return view;
    }

    private EnhancedJiraFieldsView convert(JiraFieldsView request) {
        EnhancedJiraFieldsView view = null;

        if (request != null) {
            view = new EnhancedJiraFieldsView();
            view.setAssignee(request.getAssignee());
            view.setCreatedDate(this.timestampConverter.convert(request.getCreated()));
            view.setCustomerName(request.getCustomerName());
            view.setCustomerPhone(request.getCustomerPhone());
            view.setDescription(request.getDescription());
            view.setReporter(request.getReporter());
            view.setStatus(request.getStatus());
            view.setSummary(request.getSummary());
            view.setUpdatedDate(this.timestampConverter.convert(request.getUpdated()));

            if (request.getComponents() != null) {
                view.getComponents()
                    .addAll(request.getComponents());
            }
        }

        return view;
    }

    private EnhancedJiraChangeLogWrapperView convert(JiraChangelogWrapperView request) {
        EnhancedJiraChangeLogWrapperView view = null;

        if (request != null) {
            view = new EnhancedJiraChangeLogWrapperView();
            view.setStartAt(request.getStartAt());
            view.setMaxResults(request.getMaxResults());
            view.setTotal(request.getTotal());

            if (request.getHistories() != null) {
                request.getHistories()
                       .forEach(history -> this.convertChangeLogItem(history));
            }
        }

        return view;
    }

    private EnhancedJiraChangeLogView convertChangeLogItem(JiraHistoryView request) {
        EnhancedJiraChangeLogView view = null;

        if (request != null) {
            view = new EnhancedJiraChangeLogView();
            view.setId(request.getId());
            view.setAuthor(request.getAuthor());
            view.setCreatedDate(this.timestampConverter.convert(request.getCreated()));

            if (request.getItems() != null) {
                view.getItems()
                    .addAll(request.getItems());
            }
        }

        return view;
    }
}
