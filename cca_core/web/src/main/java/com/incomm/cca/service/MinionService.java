package com.incomm.cca.service;

import com.incomm.apls.model.support.Partners;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.service.apls.AplsRequestSupportService;
import com.incomm.cscore.client.apls.model.customer.FsapiRequestSupport;
import com.incomm.cscore.client.job.CsCoreJobClient;
import com.incomm.cscore.client.job.CsCoreTaskClient;
import com.incomm.cscore.client.job.model.request.JobSearchRequest;
import com.incomm.cscore.client.job.model.response.PageResponse;
import com.incomm.cscore.client.job.model.response.job.Job;
import com.incomm.cscore.client.job.model.response.job.JobFilePasswordResponse;
import com.incomm.cscore.client.job.model.response.job.JobResponse;
import com.incomm.cscore.client.job.model.response.task.TaskResponse;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.logging.CsCoreLogger;
import com.incomm.minion.model.scheduler.enums.JobStatusType;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsEmail;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsSendAccountStatement;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsSendDirectDepositForm;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsSendDisputeDocument;
import com.incomm.minion.model.scheduler.tasks.TaskSendableForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MinionService {

    @Autowired
    private CsCoreJobClient jobClient;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private AplsRequestSupportService supportService;
    @Autowired
    private UserService userService;
    @Autowired
    private CsCoreTaskClient taskClient;

    public PageResponse<com.incomm.cscore.client.job.model.response.job.Job> findAllJobs(JobSearchRequest request, int page, int pageSize) {
        securityService.validateHasPermission(ManagedPermission.VIEW_ALL_JOBS);

        return this.jobClient.findAll(request, page, pageSize)
                             .getBody();
    }

    public JobStatusType findCurrentJobStatusByJobId(Long id) {
        try {
            Job job = jobClient.findOne(id)
                               .getBody();
            return (job != null && job.getStatus() != null) ? JobStatusType.valueOf(job.getStatus()
                                                                                       .getType()
                                                                                       .toUpperCase()) : null;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to look up a job")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Job findOneJob(Long id) {
        Job job = jobClient.findOne(id)
                           .getBody();

        //If this isn't your job (no way to know until we query it), you'd better have permission to see it!
        if (!job.getOwner()
                .getUsername()
                .equalsIgnoreCase(userService.currentUser()
                                             .getUsername()) && !securityService.hasPermission(ManagedPermission.VIEW_ALL_JOBS)) {
            throw new SecurityViolationException();
        }

        return job;
    }

    public Response<JobResponse> scheduleJob(com.incomm.minion.model.scheduler.Job request) {
        return jobClient.scheduleOne(request);
    }

    public Response<JobResponse> scheduleBulkChangeCardStatusJob(com.incomm.minion.model.scheduler.Job request, Long orderId) {
        FsapiRequestSupport support = new FsapiRequestSupport();
        support.setPartner(Partners.INCOMM.toString());
        support.setSessionId("999999");

        Response<JobResponse> response = this.jobClient.scheduleOne(request, support);
        return response;
    }

    public byte[] export(Long id) {
        return jobClient.findOneJobExportFileByJobId(id)
                        .getBody();
    }

    public byte[] downloadFile(String uuid) {
        return jobClient.findOneJobFile(uuid)
                        .getBody();
    }

    public String getExportDisposition(Long id) {
        String filename = String.format("cca_job_%s.xlsx", id);
        return String.format("attachment; filename=%s", filename);
    }

    public JobFilePasswordResponse getFilePassword(String uuid) {
        return jobClient.findOneJobFilePassword(uuid)
                        .getBody();
    }

    public void sendEmail(TaskDetailsEmail request) {
        taskClient.sendEmail(request);
    }

    public Response<TaskResponse> sendForm(TaskSendableForm request) {
        Response<TaskResponse> response = null;

        switch (request.getFormType()) {
            case ACCOUNT_STATEMENT:
                response = taskClient.sendAccountStatement((TaskDetailsSendAccountStatement) request, supportService.defaultSupport());
                break;
            case DIRECT_DEPOSIT_GPR:
            case DIRECT_DEPOSIT_MOMENTUM_MC:
            case DIRECT_DEPOSIT_MOMENTUM_VISA:
            case DIRECT_DEPOSIT_TITANIUM_MC:
                response = taskClient.sendDirectDepositForms((TaskDetailsSendDirectDepositForm) request, supportService.defaultSupport());
                break;
            case GIFT_CARD_DISPUTE:
                response = taskClient.sendDisputeFormsForVmsGiftCard((TaskDetailsSendDisputeDocument) request, supportService.defaultSupport());
                break;
            case GPR_CARD_DISPUTE:
                response = taskClient.sendDisputeFormsForVmsGprCard((TaskDetailsSendDisputeDocument) request, supportService.defaultSupport());
                break;
            case GREENCARD_DISPUTE:
            case GREENCARD_DISPUTE_ES_CO:
                //TODO This entire method *could* probably be replaced with this one client method without breaking anything...
                response = taskClient.sendForms(request, supportService.defaultSupport());
                break;
            default:
                break;
        }

        return response;
    }

}
