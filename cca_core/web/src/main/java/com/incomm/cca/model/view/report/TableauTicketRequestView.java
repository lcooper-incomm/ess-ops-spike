package com.incomm.cca.model.view.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TableauTicketRequestView implements Serializable {

    private String username;
    private String url;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "TableauTicketRequestView{" +
                "username='" + username + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
