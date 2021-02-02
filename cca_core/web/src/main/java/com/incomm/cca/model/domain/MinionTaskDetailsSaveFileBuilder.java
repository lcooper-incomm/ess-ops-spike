package com.incomm.cca.model.domain;

import com.incomm.minion.model.scheduler.enums.TaskDetailType;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsSaveFile;

import java.util.Date;

public class MinionTaskDetailsSaveFileBuilder {

    private String fileName;
    private int taskOrder;
    private Date createdDate;
    private String submitterName;
    private String platform;

    public TaskDetailsSaveFile build() {
        TaskDetailsSaveFile taskDetailsSaveFile = new TaskDetailsSaveFile();
        taskDetailsSaveFile.setTaskType(TaskDetailType.SAVE_FILE);
        taskDetailsSaveFile.setFileName(this.fileName);
        taskDetailsSaveFile.setTaskOrder(this.taskOrder);
        taskDetailsSaveFile.setCreatedDate(this.createdDate);
        taskDetailsSaveFile.setSubmitterName(this.submitterName);
        taskDetailsSaveFile.setPlatform(this.platform);
        return taskDetailsSaveFile;
    }

    public MinionTaskDetailsSaveFileBuilder setFileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public MinionTaskDetailsSaveFileBuilder setTaskOrder(int taskOrder) {
        this.taskOrder = taskOrder;
        return this;
    }

    public MinionTaskDetailsSaveFileBuilder setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public MinionTaskDetailsSaveFileBuilder setPlatform(String platform) {
        this.platform = platform;
        return this;
    }

    public MinionTaskDetailsSaveFileBuilder setSubmitterName(String submitterName) {
        this.submitterName = submitterName;
        return this;
    }
}
