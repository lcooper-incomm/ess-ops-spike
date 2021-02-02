package com.incomm.cca.service.apls;

import com.google.common.base.Strings;
import com.incomm.apls.model.requests.ActivateB2bCardRequest;
import com.incomm.apls.model.requests.ActivateGiftCardReplacementRequest;
import com.incomm.apls.model.requests.ProductRegistrationRequest;
import com.incomm.apls.model.requests.ReplaceCardRequest;
import com.incomm.apls.model.requests.StatusChangeRequest;
import com.incomm.apls.model.response.ActivateB2bCardResponse;
import com.incomm.apls.model.response.ActivateGiftCardReplacementResponse;
import com.incomm.apls.model.response.GiftCardReplacementResponse;
import com.incomm.apls.model.response.ProductActionReasonCodes;
import com.incomm.apls.model.response.ProductRegistrationResponse;
import com.incomm.apls.model.response.StatusChangeResponse;
import com.incomm.apls.model.response.UnmaskedPan;
import com.incomm.apls.model.support.Pagination;
import com.incomm.apls.model.thirdparty.aps.ApsCCAReq;
import com.incomm.apls.model.thirdparty.greencard.CardToCardRequest;
import com.incomm.apls.model.thirdparty.greencard.CardToCardResponse;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.AuditActivityType;
import com.incomm.cca.model.constant.IdentifierType;
import com.incomm.cca.model.constant.TransactionType;
import com.incomm.cca.model.domain.ActivatingMerchant;
import com.incomm.cca.model.domain.BulkDeactivateRequest;
import com.incomm.cca.model.domain.PlatformStatusValue;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.enums.GreencardStatusDescription;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.enums.apls.AplsIdentifier;
import com.incomm.cca.model.view.codex.CcaCardSeed;
import com.incomm.cca.model.view.external.apls.customer.ModifiedUpdateCardStatusRequest;
import com.incomm.cca.model.view.external.apls.product.CardTransferRequestView;
import com.incomm.cca.model.view.external.apls.product.EnhancedBalanceAdjustmentRequest;
import com.incomm.cca.model.view.external.apls.product.MerchandiseReleaseRequestView;
import com.incomm.cca.service.ActivatingMerchantService;
import com.incomm.cca.service.AuditService;
import com.incomm.cca.service.GreencardActionSecurityService;
import com.incomm.cca.service.PlatformStatusValueService;
import com.incomm.cca.service.RequestService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.UserService;
import com.incomm.cca.service.VmsSessionService;
import com.incomm.cca.service.codex.CodexSeedService;
import com.incomm.cca.service.codex.CodexService;
import com.incomm.cca.util.BulkDeactivateUtil;
import com.incomm.cca.util.GreencardPanEncryptionUtil;
import com.incomm.cca.util.GreencardStatusUtil;
import com.incomm.cca.util.MaskingUtil;
import com.incomm.cscore.client.apls.CsCoreAplsCardClient;
import com.incomm.cscore.client.apls.CsCoreAplsCustomerClient;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.action.aps.EnhancedApsResponse;
import com.incomm.cscore.client.apls.model.action.greencard.EnhancedBalanceAdjustmentResponseGreencard;
import com.incomm.cscore.client.apls.model.action.vms.EnhancedGenericResponse;
import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import com.incomm.cscore.client.apls.model.card.EnhancedCards;
import com.incomm.cscore.client.apls.model.card.EnhancedProgramLimitsResponse;
import com.incomm.cscore.client.apls.model.card.EnhancedStatusResponse;
import com.incomm.cscore.client.apls.model.card.EnhancedStatusResponseValue;
import com.incomm.cscore.client.apls.model.card.GiftCardReplacementRequest;
import com.incomm.cscore.client.apls.model.customer.FsapiRequestSupport;
import com.incomm.cscore.client.job.CsCoreJobClient;
import com.incomm.cscore.client.job.model.response.job.JobResponse;
import com.incomm.cscore.client.rest.CsCoreResponseException;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.logging.CsCoreLogger;
import com.incomm.minion.model.scheduler.Job;
import com.incomm.minion.model.scheduler.Owner;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AplsCardService {

    @Autowired
    private ActivatingMerchantService activatingMerchantService;
    @Autowired
    private AuditService auditService;
    @Autowired
    private CsCoreAplsCardClient cardClient;
    @Autowired
    private CodexService codexService;
    @Autowired
    private CsCoreAplsCustomerClient customerClient;
    @Autowired
    private GreencardActionSecurityService greencardActionSecurityService;
    @Autowired
    private CsCoreJobClient jobClient;
    @Autowired
    private PlatformStatusValueService platformStatusValueService;
    @Autowired
    private RequestService requestService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private CodexSeedService seedService;
    @Autowired
    private AplsRequestSupportService supportService;
    @Autowired
    private UserService userService;
    @Autowired
    private VmsSessionService vmsSessionService;

    public ActivateB2bCardResponse activateB2BCard(ActivateB2bCardRequest requestDto) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.ACTIVATE_B2B_CARD);
        try {
            greencardActionSecurityService.authorizeActivateB2BCard(requestDto);

            Response<ActivateB2bCardResponse> response = cardClient.activateCardGreencardB2B(requestDto);
			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedApsResponse activateFastCard(ApsCCAReq requestDto, String merchantId, String platformStr) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.ACTIVATE_FAST_CARD);

        try {
            AplsPlatform platform = null;
            securityService.validateHasPermission(ManagedPermission.ACTIVATE_FAST_CARD);
            if(platformStr.equalsIgnoreCase("SEJ")) {
                platform = AplsPlatform.SEJ;
            } else {
                platform = getActivateDeactivatePlatform(merchantId);
            }

            Response<EnhancedApsResponse> response = cardClient.activateCardFastCard(requestDto, platform);
			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public ActivateGiftCardReplacementResponse activateGiftCardReplacement(ActivateGiftCardReplacementRequest requestDto) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.ACTIVATE_GIFT_CARD_REPLACEMENT);

        try {
            greencardActionSecurityService.authorizeActivateGiftCardReplacement(requestDto);

            Response<ActivateGiftCardReplacementResponse> response = cardClient.activateCardGreencardGiftCardReplacement(requestDto);
			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedBalanceAdjustmentResponseGreencard adjustBalance(EnhancedBalanceAdjustmentRequest requestDto) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.ADJUST_BALANCE);

        try {
            greencardActionSecurityService.authorizeBalanceAdjustment(requestDto);

            Response<EnhancedBalanceAdjustmentResponseGreencard> response = cardClient.adjustBalanceGreencard(requestDto);
            auditService.createBalanceAdjustmentActivity(IdentifierType.SERIALNUMBER, requestDto.getSerialNumber(), AplsPlatform.GREENCARD.toString(), Double.parseDouble(requestDto.getAmount()), (requestDto.getReason()
                                                                                                                                                                                                              .toLowerCase()
                                                                                                                                                                                                              .contains("debit") ? TransactionType.DEBIT : TransactionType.CREDIT), requestDto.getProductDescription());
			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public Response<JobResponse> bulkDeactivateFastCard(BulkDeactivateRequest request, String merchantName) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.BULK_DEACTIVATE);

        try {
            securityService.validateHasPermission(ManagedPermission.BULK_DEACTIVATE);
            request.setPlatform(getActivateDeactivatePlatform(merchantName));

            User user = userService.currentPersistentUser();
            Owner owner = user.toMinionOwner();
            Job job = BulkDeactivateUtil.convertToJob(request, com.incomm.apls.model.support.IdentifierType.SERIAL_NUMBER);
            job.setIpAddress(requestService.getIpAddress());
            job.setOwner(owner);

            if (StringUtils.isBlank(request.getMerchant())) {
                Map<AplsPlatform, List<String>> dstMerchantsMap = activatingMerchantService.findAllAsMap();
                BulkDeactivateUtil.setPlatformMembers(job, dstMerchantsMap);
            }

            Response<JobResponse> response = jobClient.scheduleOne(job);

			auditService.saveRecordAsSuccess(auditActivity);

            return response;
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public StatusChangeResponse changeStatus(StatusChangeRequest requestDto) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.CHANGE_STATUS);

        try {
            greencardActionSecurityService.authorizeChangeStatus(requestDto);

            Response<StatusChangeResponse> response = cardClient.changeStatusGreencard(requestDto);
			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedApsResponse deactivateFastCard(ApsCCAReq requestDto, String merchantId,String platformStr) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.DEACTIVATE_FAST_CARD);
            AplsPlatform platform = null;
        try {
            securityService.validateHasPermission(ManagedPermission.DEACTIVATE_FAST_CARD);
            if(platformStr.equalsIgnoreCase("SEJ")) {
                platform = AplsPlatform.SEJ;
            } else {
                platform = getActivateDeactivatePlatform(merchantId);
            }
            Response<EnhancedApsResponse> response = null;

            if (StringUtils.isNotBlank(requestDto.getRequestAction()) && requestDto.getRequestAction()
                                                                                   .equalsIgnoreCase("return")) {
                response = cardClient.deactivateCardFastPin(requestDto, platform);
            } else {
                response = cardClient.deactivateCardFastCard(requestDto, platform);
            }

			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public List<String> findAllCardNumbers(AplsPlatform platform, String identifierType, String identifier) {
        AplsIdentifier aplsIdentifier = AplsIdentifier.valueOf(identifierType.toUpperCase());
        List<String> results = new ArrayList<>();

        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.QUICK_LOOKUP);

        try {
            EnhancedCards cards = search(aplsIdentifier, identifier, platform, false);
            if (cards != null && cards.getCards() != null) {
                for (EnhancedCard card : cards.getCards()) {
                    switch (platform) {
                        //This is only the beginning, so build this to easily support adding other options later
                        case GREENCARD:
                            String encryptedPan = card.getIdentifiers()
                                                      .getPan();
                            if (securityService.hasPermission(ManagedPermission.UNMASK_PAN)) {
                                results.add(GreencardPanEncryptionUtil.decrypt(encryptedPan));
                            } else {
                                results.add(MaskingUtil.decryptAndMaskPAN(encryptedPan));
                            }
                            break;
                        default:
                            break;
                    }
                }
            }

			auditService.saveRecordAsSuccess(auditActivity);
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }

        return results;
    }

    public EnhancedStatusResponseValue findCardStatusBySerialNumber(String serialNumber, String partner) {
        Response<EnhancedStatusResponse> response = cardClient.findStatus(AplsPlatform.VMS.toString(), "serialNumber", serialNumber, supportService.buildSupport(partner, null));
        EnhancedStatusResponse value = response.getBody();
        return value != null ? value.getStatus() : null;
    }

    public ProductActionReasonCodes findProductActionReasonCodes(AplsPlatform platform) {
        Response<ProductActionReasonCodes> response;
        if (platform == AplsPlatform.VMS || platform == AplsPlatform.CCL) {
            response = customerClient.findProductActionReasonCodes(supportService.defaultSupport());
        } else {
            response = cardClient.findProductActionReasonCodes();
        }

        return response.getBody();
    }

    public ProductRegistrationResponse orderNewCard(ProductRegistrationRequest request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_ORDER_NEW_CARD);

        try {
            securityService.validateHasPermission(ManagedPermission.VMS_ORDER_NEW_CARD);

            FsapiRequestSupport support = this.supportService.defaultSupport();
            support.setSessionId("999999");

            Response<ProductRegistrationResponse> response = cardClient.registerCard(request, support);

			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public ProductRegistrationResponse registerCard(String customerId, ProductRegistrationRequest cardRequest, Boolean createSession) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_REGISTER_CARD);
        ProductRegistrationResponse registrationResponse = null;

        try {
            String vmsSessionId = null;
            if (createSession) {
                String sessionRefNum = String.format("%s-%s", userService.currentUser()
                                                                         .getUsername(), customerId);
                vmsSessionId = vmsSessionService.createSessionForCustomer(sessionRefNum, customerId);
            }

            Response<ProductRegistrationResponse> response = cardClient.registerCard(cardRequest, supportService.buildSupport(null, vmsSessionId));
            registrationResponse = response.getBody();

			auditService.saveRecordAsSuccess(auditActivity);
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            CsCoreLogger.error("Failed to register card")
                        .keyValue("customerId", customerId)
                        .keyValue("starterCardLastFour", StringUtils.isNotBlank(cardRequest.getStarterCardNumber()) ? cardRequest.getStarterCardNumber()
                                                                                                                                 .substring(cardRequest.getStarterCardNumber()
                                                                                                                                                       .length() - 4) : "Not Available")
                        .build();
            throw e;
        }

        return registrationResponse;
    }

    public EnhancedProgramLimitsResponse releaseMerchandise(MerchandiseReleaseRequestView request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.MERCHANDISE_RELEASE);

        EnhancedProgramLimitsResponse limits;

        try {
            securityService.validateHasPermission(ManagedPermission.GC_MERCHANDISE_RELEASE);

            // Note: even though this is a GET, it causes Greencard to set the program limits
            Response<EnhancedProgramLimitsResponse> response = cardClient.findProgramLimits(request.getSerialNumber());
            limits = response.getBody();

			auditService.saveRecordAsSuccess(auditActivity);
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }

        if (request.isApproved()) {
            // Now change the status
            StatusChangeRequest changeStatusRequest = new StatusChangeRequest();
            changeStatusRequest.setComment(request.getReason());
            changeStatusRequest.setSerialNumber(request.getSerialNumber());
            changeStatusRequest.setCardStatusCode(GreencardStatusUtil.getStatusCode(GreencardStatusDescription.ACTIVE));
            changeStatus(changeStatusRequest);
        }

        return limits;
    }

    public EnhancedGenericResponse replaceCard(String customerId, ReplaceCardRequest request) {
        Response<EnhancedGenericResponse> response = cardClient.replaceCard(customerId, request, supportService.defaultSupport());
        return response.getBody();
    }

    public GiftCardReplacementResponse replaceCard(GiftCardReplacementRequest requestDto, Boolean reorder) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.REPLACE_CARD);

        try {
            greencardActionSecurityService.authorizeReplaceCard(requestDto);

            Response<GiftCardReplacementResponse> response = cardClient.replaceCard(requestDto, reorder);
            auditService.createCardReplacementActivity(IdentifierType.SERIALNUMBER, requestDto.getSerialNumber(), AplsPlatform.GREENCARD.toString());
			auditService.saveRecordAsSuccess(auditActivity);

            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedCards search(AplsIdentifier identifierType, String identifier, AplsPlatform platform, boolean enableDecryptOfProtectedFields) {
        return search(identifierType, identifier, platform, enableDecryptOfProtectedFields, false);
    }

    public EnhancedCards search(AplsIdentifier identifierType, String identifier, AplsPlatform platform, boolean enableDecryptOfProtectedFields, boolean recentActivity) {
        if (StringUtils.isNotBlank(identifier)) {
            identifier = StringUtils.trim(identifier);
        }

        //Handle encryption if applicable
        if (identifierType.needsEncryption() && platform != AplsPlatform.DDP && StringUtils.isNotBlank(identifier)) {
            identifier = GreencardPanEncryptionUtil.encrypt(identifier);
        }

        //Conduct search
        EnhancedCards response = null;
        try {
            if (identifierType.equals(AplsIdentifier.VENDORSERIALNUMBER)) {
                response = getProductsBasedOnVendorSerialNumber(identifier, platform, recentActivity);
            } else {
                response = getProductsBasedOnUserDefaultPlatform(identifierType, identifier, platform, recentActivity);
            }
        } catch (CsCoreResponseException e) {
            if (e.getResponse()
                 .getStatus() == 404) {
                response = new EnhancedCards();
            } else {
                throw e;
            }
        }

        //Handle decryption if applicable
        if (enableDecryptOfProtectedFields) {
            for (EnhancedCard card : response.getCards()) {
                switch (card.getPlatform()) {
                    case GREENCARD:
                        String encryptedPan = card.getIdentifiers()
                                                  .getPan();
                        String maskedPan = MaskingUtil.decryptAndMaskPAN(encryptedPan);
                        card.getIdentifiers()
                            .setPanMasked(maskedPan);

                        String encryptedReplacementPan = card.getIdentifiers()
                                                             .getReplacementPan();
                        if (!Strings.isNullOrEmpty(encryptedReplacementPan)) {
                            card.getIdentifiers()
                                .setReplacementPanMasked(MaskingUtil.decryptAndMaskPAN(encryptedReplacementPan));
                        }
                        break;
                    case SRL:
                        String maskedSrlPan = MaskingUtil.decryptAndMaskPAN(card.getIdentifiers()
                                                                                .getPan());
                        card.getIdentifiers()
                            .setPanMasked(maskedSrlPan);
                        break;
                    default:
                        break;
                }
            }
            maskPinIfVendorIsPayPal(response);
        }

        Pagination pagination = new Pagination();
        pagination.setResultsPerPage(response.getCards()
                                             .size());
        pagination.setPage(1);
        pagination.setTotalResults(response.getCards()
                                           .size());
        response.setPagination(pagination);

        return response;
    }

    public CardToCardResponse transferCard(CardTransferRequestView requestDto) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.CARD_TRANSFER);

        try {
            securityService.validateHasAnyPermission(ManagedPermission.GC_CARD_TRANSFER, ManagedPermission.GC_CARD_TRANSFER_STATUS_OVERRIDE);

            CardToCardRequest request = obtainEncryptedPans(requestDto);
            Response<CardToCardResponse> response = cardClient.cardToCardTransferGreencard(request);
			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public UnmaskedPan unmaskPan(String customerId, String pan) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.UNMASK_PAN);

        try {
            securityService.validateHasAnyPermission(ManagedPermission.UNMASK_PAN, ManagedPermission.VMS_RESET_PIN);

            Response<UnmaskedPan> response = customerClient.unmaskPan(customerId, pan, supportService.defaultSupport());
			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    /**
     * This is used internally by CCA, where the partnerId and selectionId may not be present in the request parameters...
     */
    public UnmaskedPan unmaskPanWithAplsPartnerAndVMSSessionId(String customerId, String pan, String aplsPartner, String vmsSessionId) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.UNMASK_PAN);

        try {
            securityService.validateHasAnyPermission(ManagedPermission.UNMASK_PAN, ManagedPermission.VMS_RESET_PIN);
            Response<UnmaskedPan> response = customerClient.unmaskPan(customerId, pan, supportService.buildSupport(aplsPartner, vmsSessionId));
			auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedGenericResponse updateCardStatus(String customerId, ModifiedUpdateCardStatusRequest cardRequest) {
        AplsPlatform cardPlatform = this.requestService.getPlatform();
        AuditActivity auditActivity = auditService.createActivity(cardPlatform.equals(AplsPlatform.CCL) ? AuditActivityType.CCL_CHANGE_CARD_STATUS : AuditActivityType.VMS_CHANGE_CARD_STATUS);

        try {

            PlatformStatusValue currentStatusValue = platformStatusValueService.findOneByNameAndPlatform(cardRequest.getCurrentStatus(), cardPlatform.toString());
            if (currentStatusValue == null) {
                throw new IllegalArgumentException(String.format("Unsupported current status option '%s'", cardRequest.getValue()));
            }
            PlatformStatusValue platformStatusValue = platformStatusValueService.findOneByNameAndPlatform(cardRequest.getValue(), cardPlatform.toString());
            if (platformStatusValue == null) {
                throw new IllegalArgumentException(String.format("Unsupported status option '%s'", cardRequest.getValue()));
            }

            CcaCardSeed seed = seedService.createChangeStatusSeed(cardPlatform, currentStatusValue);
            CcaCardSeed codexResponse = null;

            if (cardPlatform == AplsPlatform.CCL) {
                codexResponse = codexService.runCclGiftChangeStatusCodex(seed);
            } else if (cardRequest.getIsVmsGiftCard()) {
                codexResponse = codexService.runVmsGiftChangeStatusCodex(seed);
            } else {
                codexResponse = codexService.runVmsGprChangeStatusCodex(seed);
            }

            if (!codexResponse.getAllowedStatuses()
                              .contains(cardRequest.getValue())) {
                throw new SecurityViolationException();
            }

            cardRequest.setValue(platformStatusValue.getValue());

            if (cardRequest.getValue()
                           .equals("CARD_ACTIVATION")) {
                cardRequest.setComment("Customer requested card activation");
            }

            Response<EnhancedGenericResponse> response = customerClient.changeStatus(customerId, cardRequest, supportService.defaultSupport());
			auditService.saveRecordAsSuccess(auditActivity);

            return response.getBody();
        } catch (Exception e) {
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    private void maskPinIfVendorIsPayPal(EnhancedCards cards) {
        if (cards != null && cards.getCards() != null) {
            for (EnhancedCard product : cards.getCards()) {
                if (StringUtils.isNotEmpty(product.getIdentifiers()
                                                  .getVendorId()) && product.getIdentifiers()
                                                                            .getVendorId()
                                                                            .trim()
                                                                            .equals("5348")) {
                    String maskedPin = MaskingUtil.mask(product.getIdentifiers()
                                                               .getPin());
                    product.getIdentifiers()
                           .setPin(maskedPin);
                }
            }
        }
    }

    private EnhancedCards getProductsBasedOnVendorSerialNumber(String serialNumber, AplsPlatform platform, boolean recentActivity) {
        Response<EnhancedCards> response = cardClient.findCardsByVendorSerialNumber(serialNumber, platform, recentActivity);
        return response.getBody();
    }

    private EnhancedCards getProductsBasedOnUserDefaultPlatform(AplsIdentifier identifierType, String identifier, AplsPlatform platform, boolean recentActivity) {
        String identifierTypeValue = identifierType.getAplsPathTemplate(); //Not its intended use, but it works...

        EnhancedCards cards = null;
        try {
            //If it's an encrypted Greencard PAN, we unfortunately have to use a different method which URL encodes the pan
            if ((identifierType == AplsIdentifier.PAN || identifierType == AplsIdentifier.GREENCARDEPAN) && platform == AplsPlatform.GREENCARD) {
                cards = cardClient.findCardsByGreencardEncryptedPan(identifier)
                                  .getBody();
            } else if (identifierType.equals(AplsIdentifier.ORDERID)) {
                cards = cardClient.findCardsByPromoOrderId(identifier, platform)
                                  .getBody();
            } else if (identifierType.equals(AplsIdentifier.PROMOCODE)) {
                cards = cardClient.findCardsByPromoCode(identifier, platform)
                                  .getBody();
            } else if (identifierType.equals(AplsIdentifier.VAN)) {
                cards = cardClient.search("van16", identifier, platform, recentActivity)
                                  .getBody();
            }
            //Everything else can use the normal getProducts()
            else {
                cards = cardClient.search(identifierTypeValue, identifier, platform, recentActivity)
                                  .getBody();
            }
        } catch (CsCoreResponseException e) {
            if (e.getResponse()
                 .getStatus() == 404) {
                cards = new EnhancedCards();
            }
        }

        return cards;
    }

    private AplsPlatform getActivateDeactivatePlatform(String merchantId) {
        AplsPlatform platform = AplsPlatform.APS;

        //If merchantId was provided, check the table to see if there's a platform override for that merchant
        if (StringUtils.isNotBlank(merchantId)) {
            ActivatingMerchant activatingMerchant = activatingMerchantService.findOneByMerchantId(merchantId);
            if (activatingMerchant != null) {
                platform = activatingMerchant.getAplsPlatform();
            }
        }

        return platform;
    }

    private CardToCardRequest obtainEncryptedPans(CardTransferRequestView requestDto) {
        EnhancedCards parentDto = this.search(AplsIdentifier.SERIALNUMBER, requestDto.getParentSerialNumber(), AplsPlatform.GREENCARD, false);
        EnhancedCards childDto = this.search(AplsIdentifier.SERIALNUMBER, requestDto.getChildSerialNumber(), AplsPlatform.GREENCARD, false);

        CardToCardRequest request = new CardToCardRequest();
        request.setChildCardType(requestDto.getChildCardType());
        request.setNotes(requestDto.getNotes());
        request.setFees(requestDto.getFees());

        try {
            request.setParentPANNumber(URLEncoder.encode(parentDto.getCards()
                                                                  .get(0)
                                                                  .getIdentifiers()
                                                                  .getPan(), "UTF-8"));
            request.setChildPANNumber(URLEncoder.encode(childDto.getCards()
                                                                .get(0)
                                                                .getIdentifiers()
                                                                .getPan(), "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

        return request;
    }
}
