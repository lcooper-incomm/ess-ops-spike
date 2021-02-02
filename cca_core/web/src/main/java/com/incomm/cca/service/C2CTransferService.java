package com.incomm.cca.service;

import com.incomm.apls.model.requests.CardToCardTransferRequest;
import com.incomm.apls.model.response.UnmaskedPan;
import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.AuditActivityType;
import com.incomm.cca.model.constant.C2CRequestStatus;
import com.incomm.cca.model.converter.C2CRequestConverter;
import com.incomm.cca.model.domain.C2CRequest;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.action.C2CRequestView;
import com.incomm.cca.repository.action.C2CRequestRepository;
import com.incomm.cca.service.apls.AplsCardService;
import com.incomm.cca.service.apls.AplsCustomerService;
import com.incomm.cca.service.apls.AplsRequestSupportService;
import com.incomm.cscore.client.apls.CsCoreAplsCustomerClient;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.action.vms.EnhancedGenericResponse;
import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import com.incomm.cscore.client.apls.model.customer.EnhancedCustomer;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class C2CTransferService {

    @Autowired
    private C2CRequestConverter requestConverter;
    @Autowired
    private C2CRequestRepository c2CRequestRepository;
    @Autowired
    private SelectionService selectionService;
    @Autowired
    private AuditService auditService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserService userService;
    @Autowired
    private AplsCustomerService aplsCustomerService;
    @Autowired
    private CsCoreAplsCustomerClient customerClient;
    @Autowired
    private AplsCardService aplsCardService;
    @Autowired
    private AplsRequestSupportService supportService;
    @Autowired
    private RequestService requestService;

    public List<C2CRequest> findAllPendingC2CTransferRequests() {
        try {
            return c2CRequestRepository.findAllPending();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all pending VMS C2C Transfer Requests")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public C2CRequestView getDetails(Long requestId) {
        try {
            AplsPlatform platform = requestService.getPlatform();

            this.validateHasApprovePermission(platform);

            C2CRequest request = c2CRequestRepository.findById(requestId)
                                                     .orElse(null);
            if (request == null) {
                throw new NotFoundException("Request not found");
            }

            Selection selection = selectionService.findOne(request.getSelectionId());
            if (selection == null) {
                throw new NotFoundException("Associated selection not found");
            } else if (selection.getPartner() == null) {
                throw new NotFoundException("Associated partner not found");
            } else if (StringUtils.isBlank(selection.getExternalSessionId())) {
                throw new NotFoundException("Associated VMS Session ID not found");
            }

            C2CRequestView details = requestConverter.convert(request);
            EnhancedCustomer fromCustomer = aplsCustomerService.findOneWithApiKeyAndVMSSessionId(details.getFromCustomerId(), selection.getPartner()
                                                                                                                                       .getType(), selection.getExternalSessionId());
            EnhancedCustomer toCustomer = aplsCustomerService.findOneWithApiKeyAndVMSSessionId(details.getToCustomerId(), selection.getPartner()
                                                                                                                                   .getType(), selection.getExternalSessionId());

            EnhancedCard fromCard = aplsCustomerService.findActiveCard(fromCustomer, platform);
            EnhancedCard toCard = aplsCustomerService.findActiveCard(toCustomer, platform);

            details.setFromCardholder(String.format("%s %s", fromCustomer.getFirstName(), fromCustomer.getLastName()));
            details.setFromPan(fromCard.getIdentifiers()
                                       .getPan());
            details.setToCardholder(String.format("%s %s", toCustomer.getFirstName(), toCustomer.getLastName()));
            details.setToPan(toCard.getIdentifiers()
                                   .getPan());

            return details;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad attempt to retrieve C2CRequest details")
                        .keyValue("requestId", requestId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to retrieve C2CRequest details")
                        .keyValue("requestId", requestId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve C2CRequest details")
                        .keyValue("requestId", requestId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public C2CRequest createC2CTransferRequest(Long selectionId, C2CRequest request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_C2C_TRANSFER_REQUEST);

        try {
            AplsPlatform platform = AplsPlatform.convert(request.getPlatform());

            this.validateHasRequestPermission(platform);

            if (StringUtils.isBlank(request.getFromCustomerId())) {
                throw new IllegalArgumentException("'fromCustomerId' is required");
            } else if (StringUtils.isBlank(request.getToCustomerId())) {
                throw new IllegalArgumentException("'toCustomerId' is required");
            } else if (request.getAmount() == null) {
                throw new IllegalArgumentException("'amount' is required");
            } else if (request.getAmount() <= 0) {
                throw new IllegalArgumentException("'amount' must be greater than zero");
            }

            Selection selection = selectionService.findOne(selectionId);
            if (selection == null) {
                throw new NotFoundException("Associated selection not found");
            } else if (selection.getPartner() == null) {
                throw new NotFoundException("Associated partner not found");
            }

            request.setReason("Cardholder requested C2C Transfer");
            request.setComment("Cardholder requested C2C Transfer");
            request.setSelectionId(selectionId);
            request.setStatus(C2CRequestStatus.PENDING);
            request.setCreatedBy(userService.currentPersistentUser());
            request.setCreatedDate(new Date());
            request.setModifiedBy(userService.currentPersistentUser());
            request.setModifiedDate(new Date());

            auditService.saveRecordAsSuccess(auditActivity);

            return c2CRequestRepository.saveAndFlush(request);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to create VMS C2C Transfer Request")
                        .json("request", request)
                        .keyValue("cause", e.getMessage())
                        .build();
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to create VMS C2C Transfer Request")
                        .json("request", request)
                        .build();
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create VMS C2C Transfer Request")
                        .json("request", request)
                        .exception(e)
                        .build();
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    @Transactional
    public C2CRequest processC2CTransferRequest(C2CRequest request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_C2C_TRANSFER_APPROVE);

        try {
            AplsPlatform platform = requestService.getPlatform();

            this.validateHasApprovePermission(platform);

            if (!Objects.equals(request.getStatus(), C2CRequestStatus.APPROVED) && !Objects.equals(request.getStatus(), C2CRequestStatus.REJECTED)) {
                throw new IllegalArgumentException("Invalid status provided");
            }

            C2CRequest existing = c2CRequestRepository.findById(request.getId())
                                                      .orElse(null);
            if (existing == null) {
                throw new NotFoundException("Request record not found");
            }

            Selection selection = selectionService.findOne(existing.getSelectionId());
            if (selection == null) {
                throw new NotFoundException("Associated selection not found");
            } else if (selection.getPartner() == null) {
                throw new NotFoundException("Associated partner not found");
            }

            //Send APLS request
            EnhancedGenericResponse genericResponse = null;
            if (Objects.equals(request.getStatus(), C2CRequestStatus.APPROVED)) {

                //Find target pan
                EnhancedCustomer customer = aplsCustomerService.findOneWithApiKeyAndVMSSessionId(request.getToCustomerId(), selection.getPartner()
                                                                                                                                     .getType(), selection.getExternalSessionId());
                EnhancedCard card = aplsCustomerService.findActiveCard(customer, platform);
                UnmaskedPan unmaskedPan = aplsCardService.unmaskPanWithAplsPartnerAndVMSSessionId(customer.getId(), card.getIdentifiers()
                                                                                                                        .getPan(), selection.getPartner()
                                                                                                                                            .getType(), selection.getExternalSessionId());

                //Prepare APLS request
                CardToCardTransferRequest aplsRequest = new CardToCardTransferRequest();
                aplsRequest.setToPan(unmaskedPan.getPan());
                DecimalFormat decimalFormat = new DecimalFormat("#.00");
                aplsRequest.setAmount(decimalFormat.format(request.getAmount()));
                aplsRequest.setReason(request.getReason());
                aplsRequest.setComment(request.getComment());
                aplsRequest.setIsApproved(Objects.equals(request.getStatus(), C2CRequestStatus.APPROVED));
                aplsRequest.setIsFeeWaived(false);

                customerClient.cardToCardTransfer(request.getFromCustomerId(), aplsRequest, supportService.buildSupport(selection.getPartner()
                                                                                                                                 .getType(), selection.getExternalSessionId()));
            }

            //Update request record
            existing.setStatus(request.getStatus());
            existing.setComment(request.getComment());
            existing.setModifiedBy(userService.currentPersistentUser());
            existing.setModifiedDate(new Date());

            auditService.saveRecordAsSuccess(auditActivity);

            return existing;
        } catch (IllegalArgumentException | NotFoundException e) {
            CsCoreLogger.warn("Bad attempt to process VMS C2C Transfer Request")
                        .json("request", request)
                        .keyValue("cause", e.getMessage())
                        .build();
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to process VMS C2C Transfer Request")
                        .json("request", request)
                        .build();
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to process VMS C2C Transfer Request")
                        .json("request", request)
                        .exception(e)
                        .build();
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    private void validateHasApprovePermission(AplsPlatform platform) {
        switch (platform) {
            case CCL:
                securityService.validateHasPermission(ManagedPermission.CCL_C2C_TRANSFER_APPROVE);
                break;
            case VMS:
                securityService.validateHasPermission(ManagedPermission.VMS_C2C_TRANSFER_APPROVE);
                break;
            default:
                throw new UnsupportedOperationException("Unsupported platform");
        }
    }

    private void validateHasRequestPermission(AplsPlatform platform) {
        switch (platform) {
            case CCL:
                securityService.validateHasPermission(ManagedPermission.CCL_C2C_TRANSFER_REQUEST);
                break;
            case VMS:
                securityService.validateHasPermission(ManagedPermission.VMS_C2C_TRANSFER_REQUEST);
                break;
            default:
                throw new UnsupportedOperationException("Unsupported platform");
        }
    }
}
