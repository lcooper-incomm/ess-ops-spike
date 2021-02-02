package com.incomm.cca.controller;

import com.incomm.cca.model.converter.JiraIssueConverter;
import com.incomm.cca.model.view.external.jira.JiraIssueView;
import com.incomm.cca.model.view.external.jira.JiraSearchResponseView;
import com.incomm.cca.service.search.JiraSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/rest/issue")
public class IssueController extends RestResponseHandler {

    @Autowired
    private JiraIssueConverter jiraIssueConverter;
    @Autowired
    private JiraSearchService jiraSearchService;

    @RequestMapping(method = RequestMethod.GET, value = "/{issueId}")
    public ResponseEntity searchByIssueId(@PathVariable("issueId") String issueId) {
        JiraIssueView jiraIssue = jiraSearchService.searchByIssueId(issueId);
        return ok(this.jiraIssueConverter.convert(jiraIssue));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/search")
    public ResponseEntity search(@RequestBody Map<String, String> params) {
        JiraSearchResponseView response = jiraSearchService.search(params);
        return ok(this.jiraIssueConverter.convert(response.getIssues()));
    }
}
