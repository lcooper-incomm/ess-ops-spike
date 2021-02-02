package com.incomm.cca.service.maples;

import com.incomm.apls.model.support.Partners;
import com.incomm.cca.model.constant.PropertySystemName;
import com.incomm.cca.model.domain.Property;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.order.OrderRelatedJob;
import com.incomm.cca.model.view.order.ChangeCardStatusRequest;
import com.incomm.cca.service.PropertyService;
import com.incomm.cca.service.RequestAwareService;
import com.incomm.cca.service.RequestService;
import com.incomm.cca.service.UserService;
import com.incomm.cca.service.order.OrderRelatedJobService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.customer.FsapiRequestSupport;
import com.incomm.cscore.client.job.CsCoreJobClient;
import com.incomm.cscore.client.job.model.response.job.JobResponse;
import com.incomm.cscore.client.maples.model.response.order.item.OrderItemCard;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.minion.model.scheduler.Job;
import com.incomm.minion.model.scheduler.Owner;
import com.incomm.minion.model.scheduler.Task;
import com.incomm.minion.model.scheduler.enums.TaskDetailType;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsChangeStatus;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsCloseVmsCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class MaplesOrderCancellationSupportService extends RequestAwareService {

    @Autowired
    private CsCoreJobClient jobClient;
    @Autowired
	private OrderRelatedJobService relatedJobService;
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private RequestService requestService;
    @Autowired
    private UserService userService;

	public OrderRelatedJob submitCancellationPreparationJobForOrder(ChangeCardStatusRequest request) {
        Job job = buildJob(request);

        FsapiRequestSupport support = new FsapiRequestSupport();
        support.setPartner("INCOMM");
        support.setPlatform(AplsPlatform.VMS);
        support.setUsername(userService.currentUser()
                                       .getUsername());

        Response<JobResponse> response = jobClient.scheduleOne(job, support);

		OrderRelatedJob task = buildOrderRelatedJobRecord(
                request.getOrderId(),
                response.getBody()
                        .getJobId(),
                request.getTargetStatus(),
                request.getPartner(),
                request.getPlatform()
        );

		return relatedJobService.addOne(task);
    }

    private Job buildJob(ChangeCardStatusRequest request) {
        User user = userService.currentPersistentUser();
        Owner owner = user.toMinionOwner();

        Set<Task> tasks = new HashSet<>();

        if (request.getTargetStatus()
                   .equals("CLOSED")) {
            request.getCards()
                   .forEach(card -> tasks.add(buildCloseVmsCardTask(card, request)));
        } else if (request.getTargetStatus()
                          .equals("FRAUD_HOLD")) {
            request.getCards()
                   .forEach(card -> tasks.add(buildChangeStatusTaskForCard(card, request.getTargetStatus())));
        }

        Property jobNameProperty = propertyService.findOneBySystemName(PropertySystemName.ECOMM_CANCEL_ORDER_JOB_NAME);

        Job job = new Job();
        job.setIpAddress(requestService.getIpAddress());
        job.setOwner(owner);
        job.setName(String.format(jobNameProperty.getValue(), request.getOrderNumber()));
        job.setTasks(tasks);

        return job;
    }

	private OrderRelatedJob buildOrderRelatedJobRecord(Long orderId, Long jobId, String targetStatus, String partner, String platform) {
		OrderRelatedJob task = new OrderRelatedJob();
        task.setOrderId(orderId);
        task.setJobId(jobId);
        task.setPartner(partner);
        task.setPlatform(platform);
        task.setTargetStatus(targetStatus);
        task.setCreatedBy(userService.currentPersistentUser());

        return task;
    }

    private TaskDetailsChangeStatus buildChangeStatusTaskForCard(OrderItemCard card, String targetStatus) {
        TaskDetailsChangeStatus task = new TaskDetailsChangeStatus();
        task.setTaskType(TaskDetailType.CHANGE_STATUS);
        task.setSubmitterName(userService.currentUser()
                                         .getUsername());
		task.setComment("Status changed in bulk by CCA user request");
        task.setSerialNumber(card.getSerialNumber());
        task.setTargetStatus(targetStatus);
        task.setPlatform(AplsPlatform.VMS.toString());
        task.setPartner(Partners.INCOMM.toString());
        task.setTaskOrder(2);

        return task;
    }

    private TaskDetailsCloseVmsCard buildCloseVmsCardTask(OrderItemCard card, ChangeCardStatusRequest request) {
        TaskDetailsCloseVmsCard task = new TaskDetailsCloseVmsCard();
        task.setSubmitterName(userService.currentUser()
                                         .getUsername());
		task.setComment("Card closed in bulk by CCA user request");
        task.setSerialNumber(card.getSerialNumber());
        task.setPartner(Partners.INCOMM.toString());
        task.setReason(request.getReason());

        return task;
    }
}
