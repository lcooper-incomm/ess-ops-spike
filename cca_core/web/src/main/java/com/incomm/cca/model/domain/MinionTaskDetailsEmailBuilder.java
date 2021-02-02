package com.incomm.cca.model.domain;

import com.incomm.minion.model.scheduler.enums.EmailTemplate;
import com.incomm.minion.model.scheduler.enums.TaskDetailType;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsEmail;
import org.apache.commons.lang3.StringUtils;

import java.util.Date;

public class MinionTaskDetailsEmailBuilder {

    private String recipient;
    private String sender;
    private String cc;
    private String bcc;
    private String subject;
    private String body;
    private boolean attachFile;
    private EmailTemplate emailTemplate;
    private int taskOrder;
    private Date createdDate;
    private String submitterName;

    public TaskDetailsEmail build() {
        TaskDetailsEmail taskDetailsEmail = new TaskDetailsEmail();
        taskDetailsEmail.setTaskType(TaskDetailType.SEND_EMAIL);
        taskDetailsEmail.setRecipient(this.recipient);
        taskDetailsEmail.setSender(StringUtils.defaultString(this.sender, "noreply@incomm.com"));
        taskDetailsEmail.setCc(this.cc);
        taskDetailsEmail.setBcc(this.bcc);
        taskDetailsEmail.setSubject(this.subject);
        taskDetailsEmail.setBody(this.body);
        taskDetailsEmail.setAttachFile(this.attachFile);
        taskDetailsEmail.setEmailTemplate(this.emailTemplate);
        taskDetailsEmail.setTaskOrder(this.taskOrder);
        taskDetailsEmail.setCreatedDate(this.createdDate);
        taskDetailsEmail.setSubmitterName(this.submitterName);
        return taskDetailsEmail;
    }

    public MinionTaskDetailsEmailBuilder setRecipient(String recipient) {
        this.recipient = recipient;
        return this;
    }

    public MinionTaskDetailsEmailBuilder setSender(String sender) {
        this.sender = sender;
        return this;
    }

    public MinionTaskDetailsEmailBuilder setCc(String cc) {
        this.cc = cc;
        return this;
    }

    public MinionTaskDetailsEmailBuilder setBcc(String bcc) {
        this.bcc = bcc;
        return this;
    }

    public MinionTaskDetailsEmailBuilder setSubject(String subject) {
        this.subject = subject;
        return this;
    }

    public MinionTaskDetailsEmailBuilder setBody(String body) {
        this.body = body;
        return this;
    }

    public MinionTaskDetailsEmailBuilder setAttachFile(boolean attachFile) {
        this.attachFile = attachFile;
        return this;
    }

    public MinionTaskDetailsEmailBuilder setEmailTemplate(EmailTemplate emailTemplate) {
        this.emailTemplate = emailTemplate;
        return this;
    }

    public MinionTaskDetailsEmailBuilder setTaskOrder(int taskOrder) {
        this.taskOrder = taskOrder;
        return this;
    }

    public MinionTaskDetailsEmailBuilder setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public MinionTaskDetailsEmailBuilder setSubmitterName(String submitterName) {
        this.submitterName = submitterName;
        return this;
    }
}
