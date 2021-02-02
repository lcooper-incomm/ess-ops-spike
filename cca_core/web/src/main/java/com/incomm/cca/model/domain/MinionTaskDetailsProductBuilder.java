package com.incomm.cca.model.domain;

import com.incomm.minion.model.scheduler.enums.Platform;
import com.incomm.minion.model.scheduler.enums.TaskDetailType;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsProduct;

import java.util.Date;

public class MinionTaskDetailsProductBuilder {

    private String identifier;
    private Platform platform;
    private String partner;
    private int taskOrder;
    private Date createdDate;
    private String submitterName;

    public TaskDetailsProduct build() {
        TaskDetailsProduct taskDetailsProduct = new TaskDetailsProduct();
        taskDetailsProduct.setTaskType(TaskDetailType.PRODUCT_DETAILS);
        taskDetailsProduct.setIdentifier(this.identifier);
        taskDetailsProduct.setPlatform(this.platform);
        taskDetailsProduct.setPartner(this.partner);
        taskDetailsProduct.setTaskOrder(this.taskOrder);
        taskDetailsProduct.setCreatedDate(this.createdDate);
        taskDetailsProduct.setSubmitterName(this.submitterName);
        return taskDetailsProduct;
    }

    public MinionTaskDetailsProductBuilder setIdentifier(String identifier) {
        this.identifier = identifier;
        return this;
    }

    public MinionTaskDetailsProductBuilder setPlatform(Platform platform) {
        this.platform = platform;
        return this;
    }

    public MinionTaskDetailsProductBuilder setPartner(String partner) {
        this.partner = partner;
        return this;
    }

    public MinionTaskDetailsProductBuilder setTaskOrder(int taskOrder) {
        this.taskOrder = taskOrder;
        return this;
    }

    public MinionTaskDetailsProductBuilder setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public MinionTaskDetailsProductBuilder setSubmitterName(String submitterName) {
        this.submitterName = submitterName;
        return this;
    }
}
