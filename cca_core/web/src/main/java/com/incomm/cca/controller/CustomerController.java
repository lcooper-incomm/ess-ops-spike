package com.incomm.cca.controller;

import com.incomm.apls.model.requests.AdjustBalanceRequest;
import com.incomm.apls.model.requests.PreauthReleaseRequest;
import com.incomm.apls.model.requests.ProductRegistrationRequest;
import com.incomm.apls.model.requests.ReplaceCardRequest;
import com.incomm.apls.model.requests.UpdateAccountRequest;
import com.incomm.apls.model.requests.UpdateAlertsRequest;
import com.incomm.apls.model.requests.UpdateTransactionStatusRequest;
import com.incomm.apls.model.response.ProductRegistrationResponse;
import com.incomm.apls.model.response.UnmaskedPan;
import com.incomm.apls.model.support.ProductDescription;
import com.incomm.apls.model.support.ProductDescriptionType;
import com.incomm.apls.model.support.TokenStatus;
import com.incomm.apls.utils.AplsStrings;
import com.incomm.cca.model.constant.AuditActivityType;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.domain.session.dispute.DisputeComponent;
import com.incomm.cca.model.domain.session.dispute.DisputedTransaction;
import com.incomm.cca.model.view.external.apls.customer.ModifiedUpdateCardStatusRequest;
import com.incomm.cca.model.view.external.apls.product.EnhancedAdjustBalanceRequest;
import com.incomm.cca.model.view.session.comment.CustomerCommentsView;
import com.incomm.cca.service.AuditService;
import com.incomm.cca.service.ProductDescriptionService;
import com.incomm.cca.service.SessionService;
import com.incomm.cca.service.apls.AplsCardService;
import com.incomm.cca.service.apls.AplsCustomerService;
import com.incomm.cca.service.apls.AplsDisputeService;
import com.incomm.cca.service.apls.AplsTransactionService;
import com.incomm.cscore.client.apls.model.action.vms.EnhancedAdjustBalanceResponse;
import com.incomm.cscore.client.apls.model.action.vms.EnhancedGenericResponse;
import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import com.incomm.cscore.client.apls.model.customer.CustomerSearchRequest;
import com.incomm.cscore.client.apls.model.customer.EnhancedAccountLimits;
import com.incomm.cscore.client.apls.model.customer.EnhancedAlertsInfo;
import com.incomm.cscore.client.apls.model.customer.EnhancedCustomer;
import com.incomm.cscore.client.apls.model.customer.EnhancedCustomers;
import com.incomm.cscore.client.apls.model.customer.EnhancedDocument;
import com.incomm.cscore.client.apls.model.customer.EnhancedFeePlans;
import com.incomm.cscore.client.job.model.response.task.TaskResponse;
import com.incomm.cscore.client.rest.CsCoreResponseException;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsSendDisputeDocument;
import org.apache.commons.codec.binary.Base64InputStream;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/rest/customer")
public class CustomerController extends RestResponseHandler {

    private static final String VMS_DATE_FORMAT = "yyyy-MM-dd";
    @Autowired
    private AplsCustomerService customerService;
    @Autowired
    private SessionService sessionService;
    @Autowired
    private AuditService auditService;
    @Autowired
    private AplsDisputeService aplsDisputeService;
    @Autowired
    private ProductDescriptionService productDescriptionService;
    @Autowired
    private AplsCardService aplsCardService;
    @Autowired
    private AplsTransactionService aplsTransactionService;

    @PostMapping(value = "/search")
    public ResponseEntity search(@RequestParam(value = "sessionId", required = false) Long sessionId, @RequestBody CustomerSearchRequest searchParameters) {
        //If IVR session, the search needs a dnis parameter as well
        if (sessionId != null) {
            Session session = sessionService.findOne(sessionId);
            if (session != null && session.getCallComponent() != null) {
                searchParameters.setDnis(session.getCallComponent()
                                                .getDnis());
            }
        }

        EnhancedCustomers customers = customerService.search(searchParameters);
        return ok(customers.getCustomers());
    }

    @GetMapping(value = "/{customerId}")
    public ResponseEntity findOne(@PathVariable("customerId") String customerId) {
        EnhancedCustomer customer = customerService.findOne(customerId);
        return ok(customer);
    }

    @GetMapping(value = "/{customerId}/fee-plan")
    public ResponseEntity getFeePlans(@PathVariable("customerId") String customerId) {
        EnhancedFeePlans plans = customerService.getFeePlansByCustomerId(customerId);
        return ok(plans.getFeePlans());
    }

    @GetMapping(value = "/{customerId}/limit")
    public ResponseEntity getLimits(@PathVariable("customerId") String customerId) {
        EnhancedAccountLimits limits = customerService.getLimitsByCustomerId(customerId);
        return ok(limits.getLimits());
    }

    @GetMapping(value = "/{customerId}/comment")
    public ResponseEntity getComments(@PathVariable("customerId") String customerId) {
        CustomerCommentsView comments = customerService.getAllComments(customerId);
        return ok(comments);
    }

    @GetMapping(value = "/{customerId}/alert")
    public ResponseEntity getAlerts(@PathVariable("customerId") String customerId) {
        EnhancedAlertsInfo alerts = customerService.getAlertsByCustomerId(customerId);
        return ok(alerts.getAlertInfo());
    }

    @PutMapping(value = "/{customerId}/alert")
    public ResponseEntity putAlert(@PathVariable("customerId") String customerId,
                                   @RequestBody UpdateAlertsRequest updateAlertsRequest) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.CHANGE_CUSTOMER_ALERT);

        try {
            customerService.sendAlert(customerId, updateAlertsRequest);
			auditService.saveRecordAsSuccess(auditActivity);
            return noContent();
        } catch (CsCoreResponseException e) {
			auditService.saveRecordAsFailure(auditActivity);
			throw e;
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            return internalServerError();
        }
    }

    @GetMapping(value = "/{customerId}/pan/{pan}/unmask")
    public ResponseEntity unmaskPan(@PathVariable("customerId") String customerId, @PathVariable("pan") String pan) {
        UnmaskedPan unmaskedPan = aplsCardService.unmaskPan(customerId, pan);
        return ok(unmaskedPan);
    }

    @GetMapping(value = "/{customerId}/document/download", produces = {"application/pdf", "application/octet-stream"})
    public ResponseEntity findOne(@PathVariable("customerId") String customerId,
                                  @RequestParam("fileType") String fileType,
                                  @RequestParam("fileDate") String fileDate,
                                  @RequestParam("fileName") String fileName) {
        try {
            Instant instant = Instant.ofEpochMilli(Long.valueOf(fileDate));
            LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneId.of(AplsStrings.VMS_TIME_ZONE));
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(VMS_DATE_FORMAT);
            String formattedDate = dateTime.format(formatter);

            EnhancedDocument document = customerService.findDocument(customerId, fileType, formattedDate, fileName);

            InputStream inputStream = new ByteArrayInputStream(document.getFile()
                                                                       .getBytes(StandardCharsets.UTF_8));
            byte[] bytes = IOUtils.toByteArray(new BufferedInputStream(new Base64InputStream(inputStream, false)));

            return exportOk(bytes, String.format("attachment; filename=%s", document.getName()));
        } catch (Exception e) {
            return internalServerError();
        }
    }

    @PostMapping(value = "/{customerId}/releasePreauth")
    public ResponseEntity releasePreauth(@PathVariable("customerId") String customerId,
                                         @RequestBody PreauthReleaseRequest entity) {
        EnhancedGenericResponse responseDto = aplsTransactionService.releasePreAuth(customerId, entity);
        return ok(responseDto);
    }

    @PostMapping(value = "/{customerId}/reverseFee")
    public ResponseEntity reverseFee(@PathVariable("customerId") String customerId, @RequestBody AdjustBalanceRequest request) {
        EnhancedAdjustBalanceResponse response = aplsTransactionService.reverseFee(customerId, request);
        return ok(response);
    }

    @PostMapping(value = "/{customerId}/adjustBalance")
    public ResponseEntity adjustBalance(@PathVariable("customerId") String customerId, @RequestBody EnhancedAdjustBalanceRequest request) {
        EnhancedAdjustBalanceResponse response = customerService.adjustBalance(customerId, request);
        return ok(response);
    }

    @PostMapping(value = "/{customerId}/replaceCard")
    public ResponseEntity replaceCard(@PathVariable("customerId") String customerId,
                                      @RequestBody ReplaceCardRequest entity) {
        EnhancedGenericResponse responseDto = aplsCardService.replaceCard(customerId, entity);
        return ok(responseDto);
    }

    @PostMapping(value = "/{customerId}/resetOnlinePassword")
    public ResponseEntity resetOnlinePassword(@PathVariable("customerId") String customerId, @RequestBody UpdateAccountRequest request) {
        customerService.resetOnlinePassword(customerId, request);
        return noContent();
    }

    @PostMapping(value = "/{customerId}/raiseDispute")
    public ResponseEntity raiseDispute(@PathVariable("customerId") String customerId,
                                       @RequestBody DisputeComponent request) {
        aplsDisputeService.raiseDispute(customerId, request);
        return noContent();
    }

    @PutMapping(value = "/{customerId}/updateStatus")
    public ResponseEntity updateCardStatus(@PathVariable("customerId") String customerId, @RequestBody ModifiedUpdateCardStatusRequest updateRequest) {
        updateRequest.setType("CARD_STATUS");
        EnhancedGenericResponse response = aplsCardService.updateCardStatus(customerId, updateRequest);
        return ok(response);
    }

    @PostMapping(value = "/{customerId}/registerCard")
    public ResponseEntity registerCard(
            @PathVariable("customerId") String customerId,
            @RequestParam(value = "createSession", defaultValue = "false") Boolean createSession,
            @RequestBody ProductRegistrationRequest request) {
        EnhancedCustomer customer = customerService.findOne(customerId);

        if (customer != null) {
            String productName = customer.getProductName();

            request.setStarterCardNumber(aplsCardService.unmaskPan(customerId, request.getStarterCardNumber())
                                                        .getPan());
            String starterCardNumber = request.getStarterCardNumber();

            String starterCardNumberLastFour = starterCardNumber.substring(starterCardNumber.length() - 4, starterCardNumber.length());

            List<EnhancedCard> cards = customer.getCards();

            EnhancedCard cardToRegister = null;

            for (EnhancedCard card : cards) {
                String pan = card.getIdentifiers()
                                 .getPan();
                String lastFour = pan.substring(pan.length() - 4, pan.length());

                if (lastFour.equals(starterCardNumberLastFour)) {
                    cardToRegister = card;
                    break;
                }
            }

            if (cardToRegister == null) {
                throw new IllegalArgumentException("Specified Card not found on Customer!");
            }

            String productCategory = cardToRegister.getProductCategory();

            List<ProductDescription> descriptions = productDescriptionService.findAll();

            String productCode = null;
            String productType = null;

            for (ProductDescription description : descriptions) {
                if (description.getName()
                               .equals(productName)) {
                    productCode = description.getCode();

                    List<ProductDescriptionType> types = description.getTypes();

                    for (ProductDescriptionType type : types) {
                        if (type.getName()
                                .equals(productCategory)) {
                            productType = type.getId();

                            if (productType.length() == 1) {
                                productType = String.format("0%s", productType);
                            }
                            break;
                        }
                    }

                    break;
                }
            }

            request.setProductCode(productCode);
            request.setProductType(productType);
        }

        ProductRegistrationResponse response = aplsCardService.registerCard(customerId, request, createSession);
        return ok(response);
    }

    @PutMapping(value = "/{customerId}")
    public ResponseEntity updateAccount(@PathVariable("customerId") String customerId, @RequestBody UpdateAccountRequest request) {
        EnhancedGenericResponse response = customerService.updateAccount(customerId, request);
        return ok(response);
    }

    @PostMapping(value = "/sendDisputeDocumentation")
    public ResponseEntity sendDisputeDocuments(@RequestBody TaskDetailsSendDisputeDocument request) {
        Response<TaskResponse> response = aplsDisputeService.sendDisputeDocuments(request);
        return ok(response);
    }

    @PostMapping(value = "/resendDisputeDocuments")
    public ResponseEntity resendDisputeDocuments(
            @RequestParam(value = "deliveryMethod") String deliveryMethod,
            @RequestParam(value = "deliveryValue", required = false) String deliveryValue,
            @RequestBody DisputedTransaction request) {
        Response<TaskResponse> response = aplsDisputeService.resendDisputeDocuments(request, deliveryMethod, deliveryValue);
        return ok(response);
    }

    @PutMapping("/{customerId}/toggle-one-time-fraud-override")
    public ResponseEntity toggleOneTimeFraudOverride(@PathVariable("customerId") String customerId) {
        EnhancedGenericResponse response = customerService.toggleOneTimeFraudOverride(customerId);
        return ok(response);
    }

    @PutMapping("/{customerId}/toggle-permanent-fraud-override")
    public ResponseEntity togglePermanentFraudOverride(@PathVariable("customerId") String customerId) {
        EnhancedGenericResponse response = customerService.togglePermanentFraudOverride(customerId);
        return ok(response);
    }

    @PutMapping(value = "/{customerId}/device")
    public ResponseEntity updateDeviceStatus(@PathVariable("customerId") String customerId, @RequestBody TokenStatus request) {
        EnhancedGenericResponse response = customerService.updateDeviceStatus(customerId, request);
        return ok(response);
    }

    @PutMapping(value = "/{customerId}/transaction")
    public ResponseEntity updateTransaction(@PathVariable("customerId") String customerId, @RequestBody UpdateTransactionStatusRequest request) {
        EnhancedGenericResponse response = aplsTransactionService.updateTransaction(customerId, request);
        return ok(response);
    }
}
