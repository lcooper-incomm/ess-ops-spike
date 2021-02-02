package com.incomm.cca.util;

import com.incomm.apls.model.support.IdentifierType;
import com.incomm.cca.model.domain.BulkDeactivateRequest;
import com.incomm.cca.model.domain.MinionJobBuilder;
import com.incomm.cca.model.domain.MinionTaskDetailsDeactivateBuilder;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.minion.model.scheduler.Job;
import com.incomm.minion.model.scheduler.Task;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsDeactivate;
import org.apache.commons.lang3.BooleanUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public final class BulkDeactivateUtil {

    public static final String JOB_TYPE_BULK_DEACTIVATE = "Bulk Deactivate Product";

    private BulkDeactivateUtil() {
    }

    public static Job convertToJob(BulkDeactivateRequest request, IdentifierType identifierType) {
        MinionJobBuilder minionJobBuilder = new MinionJobBuilder();
        Set<Task> tasks = new HashSet<>();
        MinionTaskDetailsDeactivateBuilder taskDetailsDeactivateBuilder;
        TaskDetailsDeactivate task;

        if (!request.getIdentifiers()
                    .isEmpty()) {
            for (String id : request.getIdentifiers()) {
                taskDetailsDeactivateBuilder = new MinionTaskDetailsDeactivateBuilder();
                task = taskDetailsDeactivateBuilder
                        .setIdentifier(id)
                        .setIdentifierType(identifierType)
                        .setPlatform(request.getPlatform()
                                            .toString())
                        .setPartner(request.getPartner())
                        .setActivationTerminal(request.getTerminal())
                        .setActivationLocation(request.getLocation())
                        .setActivationMerchant(request.getMerchant())
                        .setActivationOverride(BooleanUtils.toBoolean(request.getOverride()))
                        .build();
                tasks.add(task);
            }
        }

        return minionJobBuilder
                .setName(JOB_TYPE_BULK_DEACTIVATE)
                .setComment("comment for bulk deactivation request...")
                .setTasks(tasks)
                .build();
    }

    public static void setPlatformMembers(Job job, Map<AplsPlatform, List<String>> map) {
        for (Task task : job.getTasks()
                            .stream()
                            .filter(task -> task instanceof TaskDetailsDeactivate)
                            .collect(Collectors.toList())) {
            ((TaskDetailsDeactivate) task).setDsta(map.get(AplsPlatform.DSTA));
            ((TaskDetailsDeactivate) task).setDstb(map.get(AplsPlatform.DSTB));
        }
    }
}
