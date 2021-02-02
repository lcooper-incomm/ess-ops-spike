package com.incomm.cca.service.apls;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incomm.apls.model.requests.SubmitDocumentRequest;
import com.incomm.apls.model.requests.UpdateAccountRequest;
import com.incomm.apls.model.requests.UpdateAlertsRequest;
import com.incomm.apls.model.response.Comments;
import com.incomm.apls.model.response.UnmaskedPan;
import com.incomm.apls.model.support.Alert;
import com.incomm.apls.model.support.CommentCallLog;
import com.incomm.apls.model.support.TokenStatus;
import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.model.constant.AuditActivityType;
import com.incomm.cca.model.constant.IdentifierType;
import com.incomm.cca.model.constant.TransactionType;
import com.incomm.cca.model.converter.CcaCommentConverter;
import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.domain.Partner;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.external.apls.customer.ModifiedCommentsView;
import com.incomm.cca.model.view.external.apls.product.EnhancedAdjustBalanceRequest;
import com.incomm.cca.model.view.session.comment.CustomerCommentsView;
import com.incomm.cca.repository.IdentifierRepository;
import com.incomm.cca.service.AuditService;
import com.incomm.cca.service.BalanceAdjustmentLimitService;
import com.incomm.cca.service.PartnerService;
import com.incomm.cca.service.RequestService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.util.MaskingUtil;
import com.incomm.cca.util.ThreadPoolUtil;
import com.incomm.cscore.client.apls.CsCoreAplsCustomerClient;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
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
import com.incomm.cscore.client.apls.model.customer.FsapiRequestSupport;
import com.incomm.cscore.client.apls.model.customer.VmsDocumentRequest;
import com.incomm.cscore.client.apls.model.shared.EnhancedStatus;
import com.incomm.cscore.client.apls.model.shared.constant.StatusType;
import com.incomm.cscore.client.rest.CsCoreResponseException;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

@Service
public class AplsCustomerService {

    private static final String dateSourceFormat = "MM/dd/yyyy";
    private static final String dateTargetFormat = "yyyy-MM-dd";
    @Autowired
    private AuditService auditService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private IdentifierRepository identifierRepository;
    @Autowired
    private PartnerService partnerService;
    @Autowired
    private CsCoreAplsCustomerClient customerClient;
    @Autowired
    private AplsRequestSupportService supportService;
    @Autowired
    private CcaCommentConverter commentConverter;
    @Autowired
    private BalanceAdjustmentLimitService balanceAdjustmentLimitService;
    @Autowired
    private RequestService requestService;
    private static final String VMS_SESSION_ID_DEFAULT = "999999";

    private Map<String, String> prepareParamsForLogging(CustomerSearchRequest params) {
        Map<String, String> logParams = new ObjectMapper().convertValue(params, HashMap.class);

        if (StringUtils.isNotBlank(params.getPAN())) {
            String maskedPan = MaskingUtil.mask(params.getPAN());
            logParams.put("PAN", maskedPan);
        }
        if (StringUtils.isNotBlank(params.getIdentificationId()) && params.getIdentificationId()
                                                                          .length() > 4) {
            String maskedIdentificationId = MaskingUtil.mask(params.getIdentificationId());
            logParams.put("identificationId", maskedIdentificationId);
        }

        return logParams;
    }

    public List<String> findAllCardNumbers(String identifierType, String identifier) {
        CustomerSearchRequest request = prepareSearchRequest(identifierType, identifier);

        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.QUICK_LOOKUP);

        List<CustomerPartnerPair> customers = searchAllPartners(request);

        List<String> results = new ArrayList<>();

        for (CustomerPartnerPair resultPair : customers) {

            for (EnhancedCard card : resultPair.getCustomer()
                                               .getCards()) {
                //Only add PAN to results if the search was account-wide, or this card matches the card-specific identifier
                if (resultMatchesSearchCriteria(request, card)) {

                    String cardNumber = card.getIdentifiers()
                                            .getPan();

                    if (securityService.hasPermission(ManagedPermission.UNMASK_PAN)) {
                        FsapiRequestSupport support = new FsapiRequestSupport();
                        support.setPlatform(AplsPlatform.VMS);
                        support.setSessionId(VMS_SESSION_ID_DEFAULT);
                        support.setPartner(resultPair.getPartner()
                                                     .getType());

                        Response<UnmaskedPan> response = customerClient.unmaskPan(resultPair.getCustomer()
                                                                                            .getId(), cardNumber, support);

                        if (response.getBody() != null
                                && StringUtils.isNotBlank(response.getBody()
                                                                  .getPan())) {
                            cardNumber = response.getBody()
                                                 .getPan();
                        }
                    }

                    results.add(cardNumber);
                }
            }
        }

		auditService.saveRecordAsSuccess(auditActivity);

        return results;
    }

    private boolean resultMatchesSearchCriteria(CustomerSearchRequest request, EnhancedCard card) {
        if (StringUtils.isNotBlank(request.getAccountNumber())) {
            return true;
        }

        if (StringUtils.isNotBlank(request.getCardId())) {
            String cardId = card.getIdentifiers()
                                .getCardId();
            return StringUtils.isNotBlank(cardId) && request.getCardId()
                                                            .contains(cardId);
        }

        if (StringUtils.isNotBlank(request.getSerialNumber())) {
            String serialNumber = card.getIdentifiers()
                                      .getSerialNumber();
            return StringUtils.isNotBlank(serialNumber) && serialNumber.equalsIgnoreCase(request.getSerialNumber());
        }

        return false;
    }

    private CustomerSearchRequest prepareSearchRequest(String identifierType, String identifier) {
        CustomerSearchRequest request = new CustomerSearchRequest();

        switch (identifierType.toLowerCase()) {
            case "accountnumber":
                request.setAccountNumber(identifier);
                break;
            case "cardid":
                request.setCardId(identifier);
                break;
            case "serialnumber":
                request.setSerialNumber(identifier);
                break;
        }

        return request;
    }

    private List<CustomerPartnerPair> searchAllPartners(CustomerSearchRequest request) {
        List<CustomerPartnerPair> masterResults = new ArrayList<>();

        List<Future<List<CustomerPartnerPair>>> futures = new ArrayList<>();

        //Asynchronously search all partners
        for (Partner partner : partnerService.getAllGranted()
                                             .stream()
                                             .filter(partner -> partner.getPlatform()
                                                                       .equalsIgnoreCase("VMS"))
                                             .collect(Collectors.toList())) {
            futures.add(ThreadPoolUtil.threadPool.submit(() -> {
                FsapiRequestSupport support = new FsapiRequestSupport();
                support.setPartner(partner.getType());
                support.setSessionId(VMS_SESSION_ID_DEFAULT);
                support.setPlatform(AplsPlatform.VMS);

                List<CustomerPartnerPair> results = new ArrayList<>();

                Response<EnhancedCustomers> response = null;

                try {

                    response = customerClient.search(request, support);
                } catch (CsCoreResponseException e) {
                    //Do nothing
                } catch (Exception e) {
                    CsCoreLogger.error("Failed to perform customer search")
                                .keyValue("partner", partner.getName())
                                .json("request", request)
                                .exception(e)
                                .build();
                }

                if (response != null
                        && response.getBody() != null
                        && response.getBody()
                                   .getCustomers() != null
                        && !response.getBody()
                                    .getCustomers()
                                    .isEmpty()) {
                    List<EnhancedCustomer> customers = response.getBody()
                                                               .getCustomers();
                    for (EnhancedCustomer customer : customers) {
                        //Get details, otherwise we don't have serial numbers to check against
                        Response<EnhancedCustomer> customerDetailsResponse = customerClient.findCustomerDetails(customer.getId(), support);
                        if (customerDetailsResponse != null && customerDetailsResponse.getBody() != null) {
                            CustomerPartnerPair customerPartnerPair = new CustomerPartnerPair(customerDetailsResponse.getBody(), partner);
                            results.add(customerPartnerPair);
                        }
                    }
                }

                return results;
            }));
        }

        //Wait for all requests to return
        boolean allComplete = false;
        while (!allComplete) {
            allComplete = true;
            for (Future future : futures) {
                if (!future.isDone()) {
                    allComplete = false;
                }
            }
        }

        //Get all results
        for (Future<List<CustomerPartnerPair>> future : futures) {
            try {
                masterResults.addAll(future.get());
            } catch (Exception e) {
                CsCoreLogger.error("Failed to retrieve search results from Future")
                            .exception(e)
                            .build();
            }
        }

        return masterResults;
    }

    private static class CustomerPartnerPair {

        private EnhancedCustomer customer;
        private Partner partner;

        CustomerPartnerPair(EnhancedCustomer customer, Partner partner) {
            this.customer = customer;
            this.partner = partner;
        }

        public EnhancedCustomer getCustomer() {
            return customer;
        }

        public void setCustomer(final EnhancedCustomer customer) {
            this.customer = customer;
        }

        public Partner getPartner() {
            return partner;
        }

        public void setPartner(final Partner partner) {
            this.partner = partner;
        }
    }

    public EnhancedCustomers search(CustomerSearchRequest request) {
        Map<String, String> logParams = prepareParamsForLogging(request);

        try {
            formatStartEndDates(request);
            Response<EnhancedCustomers> response = customerClient.search(request, supportService.defaultSupport());
            return response.getBody();
        } catch (CsCoreResponseException e) {
            //Return no results for a 400, else return a 500
            if (e.getResponse()
                 .getStatus() == 400) {
                CsCoreLogger.warn("Bad attempt to search for customers")
                            .json("request", logParams)
                            .keyValue("cause", e.getMessage())
                            .build();
                return new EnhancedCustomers();
            } else if (e.getResponse()
                        .getStatus() == 404) {
                return new EnhancedCustomers();
            } else {
                throw e;
            }
        } catch (ParseException e) {
            CsCoreLogger.warn("Bad date format for customer search")
                        .exception(e)
                        .build();
            throw new IllegalArgumentException("Bad date format for customer search");
        }
    }

    private void formatStartEndDates(CustomerSearchRequest request) throws ParseException {
        request.setStartDate(formatSearchDate(request.getStartDate()));
        request.setEndDate(formatSearchDate(request.getEndDate()));
    }

    private String formatSearchDate(String value) throws ParseException {
        if (StringUtils.isNotBlank(value)) {
            Date sourceDate = new SimpleDateFormat(dateSourceFormat).parse(value);
            return new SimpleDateFormat(dateTargetFormat).format(sourceDate);
        }
        return value;
    }

    public EnhancedCustomer findOne(String customerId) {
        Response<EnhancedCustomer> response = customerClient.findCustomerDetails(customerId, supportService.defaultSupport());
        return response.getBody();
    }

    public EnhancedCustomer findOneWithApiKeyAndVMSSessionId(String id, String aplsPartner, String vmsSessionId) {
        Response<EnhancedCustomer> response = customerClient.findCustomerDetails(id, supportService.buildSupport(aplsPartner, vmsSessionId));
        return response.getBody();
    }

    public EnhancedFeePlans getFeePlansByCustomerId(String customerId) {
        Response<EnhancedFeePlans> response = customerClient.findFeePlans(customerId, supportService.defaultSupport());
        EnhancedFeePlans feePlans = response.getBody();
        if (feePlans == null || feePlans.getFeePlans()
                                        .isEmpty()) {
            feePlans = new EnhancedFeePlans();
        }

        return feePlans;
    }

    @Transactional
    public CustomerCommentsView getAllComments(String customerId) {
        ModifiedCommentsView comments = getCommentsByCustomerId(customerId);
        Identifier identifier = identifierRepository.findOneByIdentifierTypeAndValueAndPlatform(IdentifierType.CUSTOMERID, customerId, AplsPlatform.VMS.toString());

        CustomerCommentsView view = this.commentConverter.convertCustomerComments(comments);
        view.getComments()
            .addAll(this.commentConverter.convert(identifier.getComments()));

        return view;
    }

    public EnhancedAlertsInfo getAlertsByCustomerId(String customerId) {
        Response<EnhancedAlertsInfo> response = customerClient.findAlerts(customerId, supportService.defaultSupport());
        return response.getBody();
    }

    public void sendAlert(String customerId, UpdateAlertsRequest updateAlertsRequest) {
        //Clean the value, since FSAPI can't handle it
        if (updateAlertsRequest.getAlertInfo() != null && updateAlertsRequest.getAlertInfo()
                                                                             .getAlerts() != null && !updateAlertsRequest.getAlertInfo()
                                                                                                                         .getAlerts()
                                                                                                                         .isEmpty()) {
            DecimalFormat df = new DecimalFormat("0.00");
            for (Alert alert : updateAlertsRequest.getAlertInfo()
                                                  .getAlerts()) {
                if (alert.getValue() != null) {
                    Double value = Double.parseDouble(alert.getValue());
                    alert.setValue(df.format(value));
                }
            }
        }

        customerClient.updateAlerts(customerId, updateAlertsRequest, supportService.defaultSupport());
    }

    public EnhancedCard findActiveCard(EnhancedCustomer customer, AplsPlatform platform) {
        for (EnhancedCard card : customer.getCards()) {
            EnhancedStatus status = card.findStatusByPlatformAndType(platform, StatusType.PLATFORM);
            if (status != null && (status.getName()
                                         .equalsIgnoreCase("ACTIVE")
                    || status.getName()
                             .equalsIgnoreCase("ACTIVE_UNREGISTERED"))) {
                return card;
            }
        }
        throw new NotFoundException(String.format("No active card found for customerId=%s", customer.getId()));
    }

    public void resetOnlinePassword(String customerId, UpdateAccountRequest request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_RESET_ONLINE_PASSWORD);

        try {
            securityService.validateHasPermission(ManagedPermission.VMS_RESET_ONLINE_PASSWORD);

            request.setComment("Cardholder requested reset of online password");
            request.setAction(UpdateAccountRequest.Action.RESET_PASSWORD.toString());

            customerClient.updateAccount(customerId, request, supportService.defaultSupport());

            auditService.saveRecordAsSuccess(auditActivity);
        } catch (Exception e) {
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedAdjustBalanceResponse adjustBalance(String customerId, EnhancedAdjustBalanceRequest request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.ADJUST_BALANCE);

        try {
            AplsPlatform platform = requestService.getPlatform();

            switch (platform) {
                case CCL:
                    securityService.validateHasPermission(ManagedPermission.CCL_ADJUST_BALANCE);
                    break;
                case VMS:
                    securityService.validateHasPermission(ManagedPermission.VMS_ADJUST_BALANCE);
                    break;
                default:
                    throw new UnsupportedOperationException("Unsupported platform");
            }

            balanceAdjustmentLimitService.authorizeBalanceAdjustmentAgainstLimits(customerId, request, platform);

            Response<EnhancedAdjustBalanceResponse> response = customerClient.adjustBalance(customerId, request, supportService.defaultSupport());
			auditService.saveRecordAsSuccess(auditActivity);
            auditService.createBalanceAdjustmentActivity(IdentifierType.CUSTOMERID, customerId, platform.toString(), Double.parseDouble(request.getAmount()), TransactionType.valueOf(request.getCrdrFlag()), request.getProductDescription());

            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedAccountLimits getLimitsByCustomerId(String customerId) {
        Response<EnhancedAccountLimits> response = customerClient.findLimits(customerId, supportService.defaultSupport());
        EnhancedAccountLimits limits = response.getBody();

        if (limits == null || limits.getLimits()
                                    .isEmpty()) {
            limits = new EnhancedAccountLimits();
        }

        return limits;
    }

    public EnhancedDocument findDocument(String customerId, String fileType, String fileDate, String fileName) {
        VmsDocumentRequest request = new VmsDocumentRequest();
        request.setFileDate(fileDate);
        request.setFileName(fileName);
        request.setFileType(fileType);

        Response<EnhancedDocument> response = customerClient.findDocument(customerId, request, supportService.defaultSupport());
        return response.getBody();
    }

    private UpdateAccountRequest maskRequest(UpdateAccountRequest request) {
        try {
            request.getAccountDetail()
                   .getAccountHolder()
                   .getIdentification()
                   .setNumber(MaskingUtil.mask(request.getAccountDetail()
                                                      .getAccountHolder()
                                                      .getIdentification()
                                                      .getNumber()));
        } catch (NullPointerException e) {
            //If a null pointer is thrown, there is no identification number to mask
        }
        return request;
    }

    public EnhancedGenericResponse updateAccount(String customerId, UpdateAccountRequest request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_EDIT_CARD_HOLDER);

        try {
            Response<EnhancedGenericResponse> response = customerClient.updateAccount(customerId, request, supportService.defaultSupport());
			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedGenericResponse submitDocument(String customerId, SubmitDocumentRequest request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_SUBMIT_DOCUMENT);

        try {
            Response<EnhancedGenericResponse> response = customerClient.uploadDocument(customerId, request, supportService.defaultSupport());
			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedGenericResponse toggleOneTimeFraudOverride(String customerId) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_TOGGLE_ONE_TIME_FRAUD_OVERRIDE);
        try {
            EnhancedCustomer customer = findOne(customerId);
            if (customer.getFlags()
                        .getIsTokenProvisioningOneTimeFraudOverrideEnabled()) {
                securityService.validateHasAnyPermission(ManagedPermission.VMS_DISABLE_ONE_TIME_FRAUD_OVERRIDE);
            } else {
                securityService.validateHasAnyPermission(ManagedPermission.VMS_ENABLE_ONE_TIME_FRAUD_OVERRIDE);
            }

            Response<EnhancedGenericResponse> response = customerClient.toggleMobileWalletOneTimeFraudOverride(customerId, supportService.defaultSupport());

            auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedGenericResponse togglePermanentFraudOverride(String customerId) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_TOGGLE_PERMANENT_FRAUD_OVERRIDE);
        try {
            EnhancedCustomer customer = findOne(customerId);
            if (customer.getFlags()
                        .getIsTokenProvisioningPermanentFraudOverrideEnabled()) {
                securityService.validateHasAnyPermission(ManagedPermission.VMS_DISABLE_PERMANENT_FRAUD_OVERRIDE);
            } else {
                securityService.validateHasAnyPermission(ManagedPermission.VMS_ENABLE_PERMANENT_FRAUD_OVERRIDE);
            }

            Response<EnhancedGenericResponse> response = customerClient.toggleMobileWalletPermanentFraudOverride(customerId, supportService.defaultSupport());

            auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedGenericResponse updateDeviceStatus(String customerId, TokenStatus request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_UPDATE_DEVICE_STATUS);

        try {
            securityService.validateHasPermission(ManagedPermission.VMS_UPDATE_DEVICE_STATUS);

            Response<EnhancedGenericResponse> response = customerClient.updateToken(customerId, request, supportService.defaultSupport());
			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    private ModifiedCommentsView getCommentsByCustomerId(String customerId) {
        try {
            try {
                Response<Comments> response = customerClient.findComments(customerId, supportService.defaultSupport());
                Comments comments = response.getBody();
                //Filter out all "Inquiry Start" entries
                comments.getComments()
                        .forEach(comment -> {
                            List<CommentCallLog> callLogs = comment.getCallLog()
                                                                   .stream()
                                                                   .filter(callLog -> {
                                                                       return !StringUtils.containsIgnoreCase(callLog.getComment(), "inquiry start")
                                                                               && !StringUtils.containsIgnoreCase(callLog.getComment(), "inquiry end");
                                                                   })
                                                                   .collect(Collectors.toList());
                            comment.setCallLog(callLogs);
                        });
                //Filter out all comments that now have no call log entries
                comments.setComments(comments.getComments()
                                             .stream()
                                             .filter(comment -> {
                                                 return !comment.getCallLog()
                                                                .isEmpty();
                                             })
                                             .collect(Collectors.toList()));

                return new ModifiedCommentsView(comments);
            } catch (CsCoreResponseException e) {
                if (e.getResponse()
                     .getStatus() == 404) {
                    CsCoreLogger.warn("Customer comments not found")
                                .json("customerId", customerId)
                                .keyValue("cause", e.getMessage());

                    return new ModifiedCommentsView();
                } else {
                    throw e;
                }
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to get customer comments")
                        .keyValue("customerId", customerId)
                        .exception(e)
                        .build();
            ModifiedCommentsView comments = new ModifiedCommentsView();
            comments.setIsPartial(true);
            return comments;
        }
    }
}
