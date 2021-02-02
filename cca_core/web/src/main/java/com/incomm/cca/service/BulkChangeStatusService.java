package com.incomm.cca.service;

import com.incomm.cca.model.domain.PlatformStatusValue;
import com.incomm.cca.model.domain.order.OrderRelatedJob;
import com.incomm.cca.service.order.OrderRelatedJobService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.job.model.response.job.JobResponse;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.minion.model.scheduler.Job;
import com.incomm.minion.model.scheduler.Task;
import com.incomm.minion.model.scheduler.enums.TaskDetailType;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsChangeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class BulkChangeStatusService {

	@Autowired
	private MinionService minionService;
	@Autowired
	private PlatformStatusValueService platformStatusValueService;
	@Autowired
	private RequestService requestService;
	@Autowired
	private OrderRelatedJobService relatedJobService;
	@Autowired
	private UserService userService;

	public JobResponse scheduleOne(Job request, Long orderId) {
		String targetStatus = this.getTargetStatus(request);

		this.mapStatusValues(request);

		Response<JobResponse> response = minionService.scheduleBulkChangeCardStatusJob(request, orderId);

		if (response.getIsSuccess()) {
			this.createTaskRecord(targetStatus, orderId, response.getBody()
																 .getJobId());
		}

		return response.getBody();
	}

	private void mapStatusValues(Job request) {
		List<PlatformStatusValue> platformStatusValues = this.platformStatusValueService.findAllByPlatform(AplsPlatform.VMS.toString());
		if (request != null && request.getTasks() != null) {
			request.getTasks()
				   .forEach(task -> {
					   if (task.getTaskType() == TaskDetailType.CHANGE_STATUS) {
						   PlatformStatusValue platformStatusValue = platformStatusValues.stream()
																						 .filter(mapping -> mapping.getName()
																												   .equalsIgnoreCase(((TaskDetailsChangeStatus) task).getTargetStatus()))
																						 .findFirst()
																						 .orElse(null);
						   if (platformStatusValue != null) {
							   ((TaskDetailsChangeStatus) task).setTargetStatus(platformStatusValue.getValue());
						   }
					   }
				   });
		}
	}

	@Transactional
	protected void createTaskRecord(String targetStatus, Long orderId, Long jobId) {
		OrderRelatedJob task = new OrderRelatedJob();
		task.setOrderId(orderId);
		task.setJobId(jobId);
		task.setPartner(this.requestService.getPartner());
		task.setPlatform(this.requestService.getPlatform() != null ? this.requestService.getPlatform()
																						.toString() : AplsPlatform.VMS.toString());
		task.setTargetStatus(targetStatus);
		task.setCreatedBy(userService.currentPersistentUser());

		this.relatedJobService.addOne(task);
	}

	private String getTargetStatus(com.incomm.minion.model.scheduler.Job request) {
		String status = null;

		if (!request.getTasks()
					.isEmpty()) {
			Task task = new ArrayList<>(request.getTasks()).get(0);
			status = ((TaskDetailsChangeStatus) task).getTargetStatus();
		}

		return status;
	}
}
