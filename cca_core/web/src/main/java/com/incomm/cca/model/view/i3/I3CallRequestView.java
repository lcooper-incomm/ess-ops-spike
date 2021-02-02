package com.incomm.cca.model.view.i3;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.enums.I3ConnectType;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class I3CallRequestView implements Serializable {

    private Long id;
    private String agentUserId;
    private String ani;
    private String callId;
    private String callIdKey;
    private String dnis;
    private String queue;
    private String uid;
    private String connectType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAgentUserId() {
        return agentUserId;
    }

    public void setAgentUserId(String agentUserId) {
        this.agentUserId = agentUserId;
    }

    public String getAni() {
        return ani;
    }

    public void setAni(String ani) {
        this.ani = ani;
    }

    public String getCallId() {
        return callId;
    }

    public void setCallId(String callId) {
        this.callId = callId;
    }

    public String getDnis() {
        return dnis;
    }

    public void setDnis(String dnis) {
        this.dnis = dnis;
    }

    public String getQueue() {
        return queue;
    }

    public void setQueue(String queue) {
        this.queue = queue;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getCallIdKey() {
        return callIdKey;
    }

    public void setCallIdKey(String callIdKey) {
        this.callIdKey = callIdKey;
    }

    public String getConnectType() {
        return connectType;
    }

    public void setConnectType(String connectType) {
        this.connectType = connectType;
    }

    @JsonIgnore
    public I3ConnectType getConnectTypeValue() {
        if (StringUtils.isNotBlank(this.getConnectType())) {
            try {
                return I3ConnectType.valueOf(this.getConnectType()
                                                 .toUpperCase());
            } catch (IllegalArgumentException e) {
                return null;
            }
        }
        return null;
    }

    @Override
    public String toString() {
        return "I3CallRequestView{" +
                "id=" + id +
                ", agentUserId='" + agentUserId + '\'' +
                ", ani='" + ani + '\'' +
                ", callId='" + callId + '\'' +
                ", callIdKey='" + callIdKey + '\'' +
                ", dnis='" + dnis + '\'' +
                ", queue='" + queue + '\'' +
                ", uid='" + uid + '\'' +
                ", connectType='" + connectType + '\'' +
                '}';
    }
}
