package com.incomm.cca.model.view.external.jira;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.User;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraUserView implements Serializable {

    private String name;
    private String key;
    private String displayName;
    private String emailAddress;
    private Boolean active;
    private String timeZone;
    private JiraAvatarUrlsView avatarUrls;
    private String self;

    public JiraUserView() {
    }

    public JiraUserView(User user) {
        this.name = user.getUsername();
        this.emailAddress = user.getEmail();
        this.active = user.getActive();

        if (StringUtils.isNotBlank(user.getFirstName()) && StringUtils.isNotBlank(user.getLastName())) {
            this.displayName = String.format("%s %s", user.getFirstName(), user.getLastName());
        } else {
            this.displayName = user.getUsername();
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getTimeZone() {
        return timeZone;
    }

    public void setTimeZone(String timeZone) {
        this.timeZone = timeZone;
    }

    public JiraAvatarUrlsView getAvatarUrls() {
        return avatarUrls;
    }

    public void setAvatarUrls(JiraAvatarUrlsView avatarUrls) {
        this.avatarUrls = avatarUrls;
    }

    public String getSelf() {
        return self;
    }

    public void setSelf(String self) {
        this.self = self;
    }
}
