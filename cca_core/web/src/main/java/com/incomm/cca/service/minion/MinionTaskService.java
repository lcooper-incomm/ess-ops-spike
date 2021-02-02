package com.incomm.cca.service.minion;

import com.incomm.cca.model.constant.AuditActivityType;
import com.incomm.cca.model.constant.PropertySystemName;
import com.incomm.cca.model.domain.Property;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.service.AuditService;
import com.incomm.cca.service.PropertyService;
import com.incomm.cca.service.apls.AplsRequestSupportService;
import com.incomm.cscore.client.job.CsCoreTaskClient;
import com.incomm.cscore.client.job.model.response.task.TaskResponse;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsSendAccountStatement;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsSendDirectDepositForm;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsSendDisputeDocument;
import com.incomm.minion.model.scheduler.tasks.TaskSendableForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MinionTaskService {

    @Autowired
    private AuditService auditService;
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private AplsRequestSupportService supportService;
    @Autowired
    private CsCoreTaskClient taskClient;

    public Response<TaskResponse> sendForm(TaskSendableForm request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_SEND_FORM);

        try {
            String method = (request).getDeliveryMethod()
                                     .name();

            //Set distribution email if necessary
            Property distributionProperty = null;
            if (method.equalsIgnoreCase("mail")) {
                distributionProperty = propertyService.findOneBySystemName(PropertySystemName.DEFAULT_SEND_FORM_MAIL_DISTRIBUTION);
            } else if (method.equalsIgnoreCase("fax")) {
                distributionProperty = propertyService.findOneBySystemName(PropertySystemName.DEFAULT_SEND_FORM_FAX_DISTRIBUTION);
            }

            if (distributionProperty != null) {
                (request).setEmail(distributionProperty.getValue());
            }

            Response<TaskResponse> response = null;
            switch ((request).getFormType()) {
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
                case GPR_CANADA_CARD_DISPUTE_EN:
                case GPR_CARD_DISPUTE:
                case GREENCARD_DISPUTE_ES_CO:
                    response = taskClient.sendDisputeFormsForVmsGiftCard((TaskDetailsSendDisputeDocument) request, supportService.defaultSupport());
                    break;

                default:
                    break;
            }

            auditService.saveRecordAsSuccess(auditActivity);

            return response;
        } catch (Exception e) {
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

}
