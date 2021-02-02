package com.incomm.cca.model.domain.mapping;

import org.apache.commons.lang3.StringUtils;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "gc_response")
public class GCResponse {

    private Long id;
    private String responseCode;
    private String responseValue;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(String responseCode) {
        this.responseCode = responseCode;
    }

    public String getResponseValue() {
        return responseValue;
    }

    public void setResponseValue(String responseValue) {
        this.responseValue = responseValue;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder("{");
        if (null != id) {
            builder.append("id=")
                   .append(id);
        }
        if (StringUtils.isNotBlank(responseCode)) {
            builder.append(" responseCode=")
                   .append(responseCode);
        }
        if (StringUtils.isNotBlank(responseValue)) {
            builder.append(" responseValue=")
                   .append(responseValue);
        }
        builder.append("}");
        return builder.toString();
    }
}
