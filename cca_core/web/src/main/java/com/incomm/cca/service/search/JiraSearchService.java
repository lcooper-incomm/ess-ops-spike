package com.incomm.cca.service.search;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.IdentifierType;
import com.incomm.cca.model.converter.CcaCommentConverter;
import com.incomm.cca.model.domain.Comment;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.external.jira.JiraIssueView;
import com.incomm.cca.model.view.external.jira.JiraSearchRequestView;
import com.incomm.cca.model.view.external.jira.JiraSearchResponseView;
import com.incomm.cca.service.CommentService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.util.rest.RestUtil;
import com.incomm.cscore.client.rest.service.CsCoreRestTemplateFactory;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JiraSearchService {

    @Autowired
    private CsCoreRestTemplateFactory restTemplateFactory;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private CcaCommentConverter commentConverter;
    @Autowired
    private CommentService commentService;
    @Value("${jira.host}")
    private String host;
    @Value("${jira.username}")
    private String jiraUsername;
    @Value("${jira.password}")
    private String jiraPassword;
    @Value("${jira.project.name}")
    private String projectName;
    @Value("${jira.customer-name-field-id}")
    private String customerNameFieldId;
    @Value("${jira.customer-phone-field-id}")
    private String customerPhoneFieldId;

    private String buildUrl(String relativeUrl) {
        return String.format("%s%s", host, relativeUrl);
    }

    public JiraIssueView searchByIssueId(String issueId) {
        try {
            if (!securityService.hasPermission(ManagedPermission.SEARCH_JIRA)) {
                throw new SecurityViolationException();
            }

            issueId = convertToFullIssueId(issueId);

            String url = buildUrl(String.format("/issue/%s", issueId));

            Map<String, Object> queryParams = new HashMap<>();
            queryParams.put("expand", getExpandParam());
            queryParams.put("fields", getSearchFieldsParam());
            String fullUrl = RestUtil.buildFullUrl(url, "", queryParams);

            //JIRA is not issuing the correct header to prompt RestTemplate to send the basic auth credentials, so we must do it here to avoid a 401... *grumble*
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", getAuthorizationHeader());

            HttpEntity requestEntity = RestUtil.buildEntity(null, headers);

            ResponseEntity<JiraIssueView> response = restTemplateFactory.buildWithBasicAuth(jiraUsername, jiraPassword)
                                                                        .exchange(fullUrl, HttpMethod.GET, requestEntity, JiraIssueView.class, queryParams);
            JiraIssueView result = response.getBody();

            if (result != null && result.getFields() != null && result.getFields()
                                                                      .getCommentWrapper() != null && result.getFields()
                                                                                                            .getCommentWrapper()
                                                                                                            .getComments() != null) {
                result.getFields()
                      .getCommentWrapper()
                      .getComments()
                      .addAll(commentConverter.convert(getCCANotesForIssue(issueId)));
            }

            return result;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to perform JIRA search")
                        .keyValue("issueId", issueId)
                        .build();
            throw e;
        } catch (HttpStatusCodeException e) {
            if (e.getRawStatusCode() == 404) {
                //No results
                return null;
            } else {
                CsCoreLogger.error("Failed to perform JIRA search by issueId")
                            .keyValue("issueId", issueId)
                            .keyValue("response", e.getResponseBodyAsString())
                            .build();
                throw e;
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to perform JIRA search by issueId")
                        .keyValue("issueId", issueId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private String getAuthorizationHeader() {
        String rawCredentials = String.format("%s:%s", jiraUsername, jiraPassword);
        byte[] rawBytes = rawCredentials.getBytes(StandardCharsets.UTF_8);
        String token = Base64.getEncoder()
                             .encodeToString(rawBytes);
        return String.format("Basic %s", token);
    }

    public List<Comment> getCCANotesForIssue(String issueId) {
        try {
            return commentService.findByIdentifierTypeAndIdentifier(IdentifierType.ISSUEID, issueId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve CCA notes for JIRA issue")
                        .keyValue("issueId", issueId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public JiraSearchResponseView search(Map<String, String> params) {
        try {
            if (!securityService.hasPermission(ManagedPermission.SEARCH_JIRA)) {
                throw new SecurityViolationException();
            }

            String url = buildUrl("/search");

            JiraSearchRequestView request = new JiraSearchRequestView(projectName, getSearchFields());
            for (Map.Entry<String, String> entry : params.entrySet()) {
                //Convert field names to proper search term keys
                if (entry.getKey()
                         .equals("customerName")) {
                    request.searchTerm(formatCustomFieldIdentifier(customerNameFieldId), entry.getValue());
                } else if (entry.getKey()
                                .equals("customerPhone")) {
                    request.searchTerm(formatCustomFieldIdentifier(customerPhoneFieldId), entry.getValue());
                } else {
                    request.searchTerm(entry.getKey(), entry.getValue());
                }
            }

            //JIRA is not issuing the correct header to prompt RestTemplate to send the basic auth credentials, so we must do it here to avoid a 401... *grumble*
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", getAuthorizationHeader());
            headers.set("Content-Type", "application/json");

            HttpEntity requestEntity = RestUtil.buildEntity(request, headers);

            ResponseEntity<JiraSearchResponseView> rawResponse = restTemplateFactory.buildWithBasicAuth(jiraUsername, jiraPassword)
                                                                                    .exchange(url, HttpMethod.POST, requestEntity, JiraSearchResponseView.class);
            return rawResponse.getBody();
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to perform JIRA search")
                        .json("request", params)
                        .build();
            throw e;
        } catch (HttpStatusCodeException e) {
            if (e.getRawStatusCode() == 404) {
                //No results
                return new JiraSearchResponseView();
            } else {
                CsCoreLogger.error("Failed to perform JIRA search")
                            .json("request", params)
                            .keyValue("response", e.getResponseBodyAsString())
                            .build();
                throw e;
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to perform JIRA search")
                        .json("request", params)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    /**
     * Allow searching by numeric issueId by prepending the project name portion before searching.
     */
    private String convertToFullIssueId(String issueId) {
        if (StringUtils.isNotBlank(issueId) && !issueId.startsWith(projectName) && StringUtils.isNumeric(issueId)) {
            return String.format("%s-%s", projectName, issueId);
        }
        return issueId;
    }

    private String getExpandParam() {
        return "changelog";
    }

    private String getSearchFieldsParam() {
        return StringUtils.join(getSearchFields(), ",");
    }

    private List<String> getSearchFields() {
        List<String> fields = new ArrayList<>();
        fields.addAll(Arrays.asList("summary", "status", "description", "comment", "assignee", "reporter", "created", "updated", "components"));
        fields.add(formatCustomFieldIdentifierForSearch(customerNameFieldId));
        fields.add(formatCustomFieldIdentifierForSearch(customerPhoneFieldId));

        return fields;
    }

    private String formatCustomFieldIdentifier(String fieldId) {
        return String.format("cf[%s]", fieldId);
    }

    private String formatCustomFieldIdentifierForSearch(String fieldId) {
        return String.format("customfield_%s", fieldId);
    }
}
