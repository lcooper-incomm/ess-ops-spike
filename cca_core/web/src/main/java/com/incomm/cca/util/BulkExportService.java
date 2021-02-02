package com.incomm.cca.util;

import com.incomm.cca.model.domain.BulkExportRequest;
import com.incomm.cca.model.domain.MinionJobBuilder;
import com.incomm.cca.model.domain.MinionTaskDetailsEmailBuilder;
import com.incomm.cca.model.domain.MinionTaskDetailsProductBuilder;
import com.incomm.cca.model.domain.MinionTaskDetailsSaveFileBuilder;
import com.incomm.minion.model.scheduler.Job;
import com.incomm.minion.model.scheduler.Task;
import com.incomm.minion.model.scheduler.enums.EmailTemplate;
import com.incomm.minion.model.scheduler.enums.Platform;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsEmail;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsProduct;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsSaveFile;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class BulkExportService {

    public static final String JOB_TYPE_BULK_EXPORT = "Bulk Product Export";
    public static final String TASK_PRODUCT_EXPORT_FILENAME = "product-export-filename";

    public Job convertToJob(BulkExportRequest request) {
        MinionJobBuilder minionJobBuilder = new MinionJobBuilder();

        Set<Task> tasks = generateSingleDetailsTasks(request);
        tasks.add(generateSaveFileTask(request));

        return minionJobBuilder.setName(JOB_TYPE_BULK_EXPORT)
                               .setTasks(tasks)
                               .build();
    }

    public Set<Task> generateSingleDetailsTasks(BulkExportRequest request) {
        Set<Task> tasks = new HashSet<>();
        MinionTaskDetailsProductBuilder taskDetailsProductBuilder;
        TaskDetailsProduct task;

        if (!request.getIdentifiers()
                    .isEmpty()) {
            for (String id : request.getIdentifiers()) {
                taskDetailsProductBuilder = new MinionTaskDetailsProductBuilder();
                task = taskDetailsProductBuilder
                        .setIdentifier(id)
                        .setPlatform(Platform.getPlatform(request.getPlatform()))
                        .setPartner(request.getPartner())
                        .setTaskOrder(1)
                        .setCreatedDate(new Date())
                        .setSubmitterName(request.getOwner()
                                                 .getUsername())
                        .build();
                tasks.add(task);
            }
        }

        return tasks;
    }

    public TaskDetailsSaveFile generateSaveFileTask(BulkExportRequest request) {
        MinionTaskDetailsSaveFileBuilder taskDetailsSaveFileBuilder = new MinionTaskDetailsSaveFileBuilder();
        return taskDetailsSaveFileBuilder.setFileName(TASK_PRODUCT_EXPORT_FILENAME)
                                         .setTaskOrder(2)
                                         .setPlatform(request.getPlatform())
                                         .build();
    }

    public TaskDetailsEmail generateEmailTask(BulkExportRequest request, int taskOrder) {
        MinionTaskDetailsEmailBuilder taskDetailsEmailBuilder = new MinionTaskDetailsEmailBuilder();
        return taskDetailsEmailBuilder.setRecipient(request.getOwner()
                                                           .getUsername())
                                      .setSender("noreply@incomm.com")
                                      .setSubject("Product Detail Export")
                                      .setCreatedDate(new Date())
                                      .setEmailTemplate(EmailTemplate.PRODUCT_DETAILS_EXPORT)
                                      .setTaskOrder(taskOrder)
                                      .build();
    }
}
