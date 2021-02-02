package com.incomm.cca.model.domain;

import com.incomm.apls.model.support.IdentifierType;
import com.incomm.minion.model.scheduler.enums.TaskDetailType;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsDeactivate;

import java.util.Date;
import java.util.List;

public class MinionTaskDetailsDeactivateBuilder {

    private String identifier;
    private IdentifierType identifierType;
    private String platform;
    private String partner;
    private String activationTerminal;
    private String activationLocation;
    private String activationMerchant;
    private String activationMerchantId;
    private Boolean activationOverride;
    private List<String> dsta;
    private List<String> dstb;
    private int taskOrder;
    private Date createdDate;
    private String submitterName;

    public TaskDetailsDeactivate build() {
        TaskDetailsDeactivate taskDetailsDeactivate = new TaskDetailsDeactivate();
        taskDetailsDeactivate.setTaskType(TaskDetailType.DEACTIVATE);
        taskDetailsDeactivate.setIdentifier(this.identifier);
        taskDetailsDeactivate.setIdentifierType(this.identifierType);
        taskDetailsDeactivate.setPlatform(this.platform);
        taskDetailsDeactivate.setPartner(this.partner);
        taskDetailsDeactivate.setActivationTerminal(this.activationTerminal);
        taskDetailsDeactivate.setActivationLocation(this.activationLocation);
        taskDetailsDeactivate.setActivationMerchant(this.activationMerchant);
        taskDetailsDeactivate.setActivationMerchantId(this.activationMerchantId);
        taskDetailsDeactivate.setActivationOverride(this.activationOverride);
        taskDetailsDeactivate.setDsta(this.dsta);
        taskDetailsDeactivate.setDstb(this.dstb);
        taskDetailsDeactivate.setTaskOrder(this.taskOrder);
        taskDetailsDeactivate.setCreatedDate(this.createdDate);
        taskDetailsDeactivate.setSubmitterName(this.submitterName);
        return taskDetailsDeactivate;
    }

    public MinionTaskDetailsDeactivateBuilder setIdentifier(String identifier) {
        this.identifier = identifier;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setIdentifierType(IdentifierType identifierType) {
        this.identifierType = identifierType;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setPlatform(String platform) {
        this.platform = platform;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setPartner(String partner) {
        this.partner = partner;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setActivationTerminal(String activationTerminal) {
        this.activationTerminal = activationTerminal;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setActivationLocation(String activationLocation) {
        this.activationLocation = activationLocation;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setActivationMerchant(String activationMerchant) {
        this.activationMerchant = activationMerchant;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setActivationMerchantId(String activationMerchantId) {
        this.activationMerchantId = activationMerchantId;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setActivationOverride(Boolean activationOverride) {
        this.activationOverride = activationOverride;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setDsta(List<String> dsta) {
        this.dsta = dsta;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setDstb(List<String> dstb) {
        this.dstb = dstb;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setTaskOrder(int taskOrder) {
        this.taskOrder = taskOrder;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public MinionTaskDetailsDeactivateBuilder setSubmitterName(String submitterName) {
        this.submitterName = submitterName;
        return this;
    }

}
