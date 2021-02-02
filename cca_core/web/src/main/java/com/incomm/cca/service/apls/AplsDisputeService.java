package com.incomm.cca.service.apls;

import com.incomm.apls.model.response.ProductActionReasonCodes;
import com.incomm.apls.model.support.ProductActionReasonCode;
import com.incomm.apls.model.support.ProductReason;
import com.incomm.cca.exception.MinionResponseException;
import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.model.constant.AuditActivityType;
import com.incomm.cca.model.constant.PropertySystemName;
import com.incomm.cca.model.domain.Property;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.domain.session.dispute.DisputeComponent;
import com.incomm.cca.model.domain.session.dispute.DisputedTransaction;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.service.AuditService;
import com.incomm.cca.service.DisputeService;
import com.incomm.cca.service.MinionService;
import com.incomm.cca.service.PropertyService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cscore.client.apls.CsCoreAplsCustomerClient;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.customer.EnhancedCustomer;
import com.incomm.cscore.client.apls.model.customer.FsapiRequestSupport;
import com.incomm.cscore.client.job.model.response.task.TaskResponse;
import com.incomm.cscore.client.model.CsCoreAddress;
import com.incomm.cscore.client.model.CsCorePhoneNumber;
import com.incomm.cscore.client.model.constant.CsCorePhoneNumberType;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.logging.CsCoreLogger;
import com.incomm.minion.model.scheduler.enums.DeliveryMethod;
import com.incomm.minion.model.scheduler.enums.FormType;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsSendDisputeDocument;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AplsDisputeService {

    @Autowired
    private AplsCustomerService aplsCustomerService;
    @Autowired
    private DisputeService disputeService;
    @Autowired
    private MinionService minionService;
    @Autowired
    private AuditService auditService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private CsCoreAplsCustomerClient customerClient;
    @Autowired
    private AplsRequestSupportService supportService;

    /**
     * Returns the detail_dispute record id created after successfully raising the dispute through APLS
     */
    public void raiseDispute(String customerId, DisputeComponent request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_RAISE_DISPUTE);

        try {
            securityService.validateHasPermission(ManagedPermission.VMS_RAISE_DISPUTE);
            customerClient.disputeTransactions(customerId, request.toAplsRequest(), supportService.defaultSupport());
			auditService.saveRecordAsSuccess(auditActivity);
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public Response<TaskResponse> resendDisputeDocuments(DisputedTransaction request, String deliveryMethod, String deliveryValue) {
        securityService.validateHasPermission(ManagedPermission.RESEND_DISPUTE_DOCUMENTS);
        if (deliveryMethod.equalsIgnoreCase("fax") && StringUtils.isBlank(deliveryValue)) {
            throw new IllegalArgumentException("Fax number must be provided");
        }

        DisputeComponent disputeComponent = disputeService.findOne(request);
        if (disputeComponent == null) {
            throw new NotFoundException("Dispute Details not found");
		} else if (disputeComponent.getIdentifier() == null) {
            throw new IllegalStateException("No identifier found for Dispute Details");
        }

        EnhancedCustomer customer = aplsCustomerService.findOne(disputeComponent.getIdentifier()
                                                                             .getValue());
        if (customer == null) {
            throw new IllegalArgumentException("Expected single customer result");
        }

        TaskDetailsSendDisputeDocument sendDisputeDocumentsRequest = createSendDisputeDocumentsRequest(customer, disputeComponent, deliveryMethod, deliveryValue);
        return sendDisputeDocuments(sendDisputeDocumentsRequest);
    }

    private TaskDetailsSendDisputeDocument createSendDisputeDocumentsRequest(EnhancedCustomer customer, DisputeComponent disputeComponent, String deliveryMethod, String deliveryValue) {
        try {
            CsCorePhoneNumber homePhone = customer.findHomePhone();
            CsCorePhoneNumber mobilePhone = customer.findPhoneNumberOfType(CsCorePhoneNumberType.MOBILE);

            CsCoreAddress mailingAddress = customer.findMailingAddress();

            DisputedTransaction firstTransaction = disputeComponent.getTransactions()
                                                                     .get(0);

            TaskDetailsSendDisputeDocument request = new TaskDetailsSendDisputeDocument();
            request.setDeliveryMethod(DeliveryMethod.valueOf(deliveryMethod));
            request.setReason(disputeComponent.getReasonCode() != null ? disputeComponent.getReasonCode()
                                                                                   .getDisplayValue() : "Disputed Transaction");
            request.setAccountNumber(customer.getAccounts()
                                             .getSpending()
                                             .getAccountNumber());
            request.setCustomerName(String.format("%s %s", customer.getFirstName(), customer.getLastName()));
            request.setEmail(customer.getEmailAddress());
            request.setMaskedPan(firstTransaction.getCardNumber());
            request.setSessionId(disputeComponent.getSession()
                                              .getId()
                                              .toString());

            FsapiRequestSupport support = supportService.defaultSupport();
            request.setPartner(support.getPartner());
            request.setPlatform(support.getPlatform()
                                       .name());

            if (mailingAddress != null) {
                request.setAddressLine1(mailingAddress.getLine1());
                request.setAddressLine2(mailingAddress.getLine2());
                request.setAddressCity(mailingAddress.getCity());
                request.setAddressState(mailingAddress.getState());
                request.setAddressPostalCode(mailingAddress.getPostalCode());
            }

            if (homePhone != null) {
                request.setLandLinePhoneNumber(homePhone.getNumber());
            }
            if (mobilePhone != null) {
                request.setMobilePhoneNumber(mobilePhone.getNumber());
            }

            if (deliveryMethod.equalsIgnoreCase("fax")) {
                request.setFax(deliveryValue);
            }

            for (DisputedTransaction transaction : disputeComponent.getTransactions()) {
                request.getDisputedTransactions()
                       .add(transaction.toMinionTransaction());
            }

            boolean isVmsGiftCard = customer.getCards()
                                            .stream()
                                            .anyMatch(card -> StringUtils.isNotBlank(card.getProductCategory()) && StringUtils.containsIgnoreCase(card.getProductCategory(), "amex"));
            FormType formType = isVmsGiftCard ? FormType.GIFT_CARD_DISPUTE : FormType.GPR_CARD_DISPUTE;
            request.setFormType(formType);

            return request;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to convert to send dispute documents request")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Response<TaskResponse> sendDisputeDocuments(TaskDetailsSendDisputeDocument request) {
        if (request.getDeliveryMethod() != null) {
            String propertyName = null;
            switch (request.getDeliveryMethod()) {
                case MAIL: {
                    propertyName = PropertySystemName.DEFAULT_SEND_FORM_MAIL_DISTRIBUTION_DISPUTES;
                    if (request.getFormType() == FormType.GIFT_CARD_DISPUTE) {
                        propertyName = PropertySystemName.DEFAULT_SEND_FORM_MAIL_DISTRIBUTION_DISPUTES_GIFT_CARD;
                    }
                    break;
                }
                case FAX:
                    propertyName = PropertySystemName.DEFAULT_SEND_FORM_FAX_DISTRIBUTION_DISPUTES;
                    if (request.getFormType() == FormType.GIFT_CARD_DISPUTE) {
                        propertyName = PropertySystemName.DEFAULT_SEND_FORM_FAX_DISTRIBUTION_DISPUTES_GIFT_CARD;
                    }
                    break;
            }

            if (StringUtils.isNotBlank(propertyName)) {
                Property distributionProperty = propertyService.findOneBySystemName(propertyName);
                if (distributionProperty != null) {
                    request.setEmail(distributionProperty.getValue());
                }
            }
        }

        String bccPropertyName = PropertySystemName.DEFAULT_SEND_DISPUTE_FORM_BCC_DISTRIBUTION;
        if (request.getFormType() == FormType.GIFT_CARD_DISPUTE || request.getFormType() == FormType.GREENCARD_DISPUTE_ES_CO) {
            bccPropertyName = PropertySystemName.DEFAULT_SEND_DISPUTE_FORM_BCC_DISTRIBUTION_GIFT_CARD;
        }

        Property bccProperty = propertyService.findOneBySystemName(bccPropertyName);
        if (bccProperty != null && StringUtils.isNotBlank(bccProperty.getValue())) {
            request.setBcc(bccProperty.getValue());
        }

        Response<TaskResponse> result = minionService.sendForm(request);
        if (!result.getErrors()
                   .isEmpty()) {
            throw new MinionResponseException("Failed to send dispute documents");
        }
        return result;
    }
}
