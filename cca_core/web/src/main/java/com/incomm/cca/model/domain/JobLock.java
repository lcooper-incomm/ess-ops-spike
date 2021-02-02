package com.incomm.cca.model.domain;

import java.io.Serializable;
import java.util.Date;

public class JobLock implements Serializable {

    private String name;
    private String host;
    private Date startDate;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    @Override
    public String toString() {
        return "JobLock{" +
                "name=" + name +
                ", host='" + host + '\'' +
                ", startDate=" + startDate +
                '}';
    }
}
