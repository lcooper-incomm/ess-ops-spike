package com.incomm.cca.service.apls;

import com.incomm.apls.model.requests.AdjustBalanceRequest;
import com.incomm.apls.model.requests.PreauthReleaseRequest;
import com.incomm.apls.model.requests.TransactionSearchReq;
import com.incomm.apls.model.requests.UpdateTransactionStatusRequest;
import com.incomm.apls.model.support.Pagination;
import com.incomm.apls.model.support.SortType;
import com.incomm.apls.model.thirdparty.greencard.GreenCardPreauthReleaseRequest;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.AuditActivityType;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.domain.session.dispute.DisputeComponent;
import com.incomm.cca.model.domain.session.dispute.DisputedTransaction;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.enums.apls.AplsIdentifier;
import com.incomm.cca.model.view.transaction.TransactionSearchRequestView;
import com.incomm.cca.repository.DisputeComponentRepository;
import com.incomm.cca.service.AuditService;
import com.incomm.cca.service.DisputeService;
import com.incomm.cca.service.RequestService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.mapping.DataFilterService;
import com.incomm.cscore.client.apls.CsCoreAplsTransactionClient;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.action.vms.EnhancedAdjustBalanceResponse;
import com.incomm.cscore.client.apls.model.action.vms.EnhancedGenericResponse;
import com.incomm.cscore.client.apls.model.customer.EnhancedDispute;
import com.incomm.cscore.client.apls.model.transaction.EnhancedPreAuthReleaseResponse;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransactionDetail;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransactions;
import com.incomm.cscore.client.apls.model.transaction.TransactionHistoryRequestSupport;
import com.incomm.cscore.client.apls.model.transaction.VmsTransactionDetailsRequest;
import com.incomm.cscore.client.rest.CsCoreResponseException;
import com.incomm.cscore.client.rest.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AplsTransactionService {

    @Autowired
    private AuditService auditService;
    @Autowired
    private DataFilterService dataFilterService;
    @Autowired
    private RequestService requestService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private DisputeComponentRepository disputeComponentRepository;
    @Autowired
    private CsCoreAplsTransactionClient transactionClient;
    @Autowired
    private AplsRequestSupportService supportService;
    @Autowired
    private DisputeService disputeService;

    public EnhancedTransactions search(TransactionSearchRequestView requestView) {
        TransactionHistoryRequestSupport request = this.buildRequest(requestView);
        EnhancedTransactions transactions = null;
        try {
            Response<EnhancedTransactions> response = null;
            if (requestView.getPlatform() == AplsPlatform.VMS || requestView.getPlatform() == AplsPlatform.CCL) {
                response = transactionClient.search(requestView.getIdentifier(), request, supportService.defaultSupport());
            } else {
                response = transactionClient.search(requestView.getIdentifierType()
                                                               .getIdentifierTypeString(), requestView.getIdentifier(), request, requestView.getPlatform());
            }
            transactions = response.getBody();
        } catch (CsCoreResponseException e) {
            if (e.getResponse()
                 .getStatus() == 404) {
                try {
                    transactions = new EnhancedTransactions();
                } catch (Exception e1) {
                    e1.printStackTrace();
                }
            } else {
                throw e;
            }
        }

        //Try to make sure the pagination is filled out as best as possible

        if (transactions != null && transactions.getPagination() == null) {
            buildPagination(transactions, requestView.getSortOrder(), requestView.getResultsPerPage());
        }

        return transactions;
    }

    public EnhancedTransaction getTransactionDetails(
            AplsIdentifier identifierType,
            String identifier,
            AplsPlatform platform,
            String transactionId,
            Long businessDate,
            String deliveryChannel,
            String requestCode,
            String responseCode
    ) {
        VmsTransactionDetailsRequest request = new VmsTransactionDetailsRequest();
        request.setTransactionId(transactionId);
        request.setBusinessDate(businessDate);
        request.setDeliveryChannel(deliveryChannel);
        request.setRequestCode(requestCode);
        request.setResponseCode(responseCode);

        Response<EnhancedTransactionDetail> response = transactionClient.findTransactionDetails(identifier, request, supportService.defaultSupport());
        return response.getBody()
                       .getTransaction();
    }

    public EnhancedDispute getDisputeForVmsTransaction(
            String customerId,
            String transactionId,
            Long businessDate,
            String deliveryChannel,
            String requestCode,
            String responseCode) {
        if (!securityService.hasPermission(ManagedPermission.VMS_VIEW_DISPUTE)) {
            throw new SecurityViolationException();
        }

        VmsTransactionDetailsRequest request = new VmsTransactionDetailsRequest();
        request.setTransactionId(transactionId);
        request.setBusinessDate(businessDate);
        request.setDeliveryChannel(deliveryChannel);
        request.setRequestCode(requestCode);
        request.setResponseCode(responseCode);

        Response<EnhancedDispute> response = transactionClient.findDispute(customerId, request, supportService.defaultSupport());
        EnhancedDispute dispute = response.getBody();

        //CCA-3046 Check whether CCA has record of the dispute in order to resend documents
        List<DisputeComponent> ccaDisputeComponents = disputeComponentRepository.findByTransactionData(transactionId, deliveryChannel, requestCode, responseCode, new Date(businessDate));
        if (!ccaDisputeComponents.isEmpty()) {
            dispute.setCanResendDocuments(true);
        }

        return dispute;
    }

    public EnhancedTransactions getSelected(TransactionSearchReq requestDto, int page, int resultsPerPage, boolean archive, TransactionHistoryRequestSupport.SortOrder sortOrder, AplsPlatform platform) {
        TransactionHistoryRequestSupport support = new TransactionHistoryRequestSupport();
        support.setPage(page);
        support.setResultsPerPage(resultsPerPage);
        support.setArchive(archive);
        support.setSortOrder(sortOrder);

        Response<EnhancedTransactions> response = transactionClient.findByTransactionIds(requestDto, support, platform);
        EnhancedTransactions transactions = response.getBody();

        if (platform == AplsPlatform.INCOMM) {
            dataFilterService.filterOpCodes(transactions);
        } else if (platform == AplsPlatform.GREENCARD) {
            dataFilterService.filterGCRequestAndResponse(transactions);
        }

        return transactions;
    }

    public EnhancedPreAuthReleaseResponse releasePreAuth(GreenCardPreauthReleaseRequest requestDto) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.RELEASE_PREAUTH);

        try {
            securityService.validateHasPermission(ManagedPermission.GC_RELEASE_PREAUTH);

            Response<EnhancedPreAuthReleaseResponse> response = transactionClient.releasePreAuth(requestDto);
            auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedGenericResponse releasePreAuth(String customerId, PreauthReleaseRequest request) {
        AplsPlatform cardPlatform = this.requestService.getPlatform();
        AuditActivity auditActivity = auditService.createActivity(cardPlatform.equals(AplsPlatform.CCL) ? AuditActivityType.CCL_CHANGE_CARD_STATUS : AuditActivityType.VMS_CHANGE_CARD_STATUS);

        try {
            // check permissions separately in case the user groups for CCL and VMS don't overlap 100%
            if (cardPlatform.equals(AplsPlatform.CCL) && !securityService.hasPermission(ManagedPermission.CCL_RELEASE_PRE_AUTH)) {
                throw new SecurityViolationException();
            }
            if (cardPlatform.equals(AplsPlatform.VMS) && !securityService.hasPermission(ManagedPermission.VMS_RELEASE_PRE_AUTH)) {
                throw new SecurityViolationException();
            }

            Response<EnhancedGenericResponse> response = transactionClient.releasePreAuth(customerId, request, supportService.defaultSupport());
            auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedAdjustBalanceResponse reverseFee(String customerId, AdjustBalanceRequest request) {
        AplsPlatform aplsPlatform = this.requestService.getPlatform();
        AuditActivity auditActivity = auditService.createActivity(aplsPlatform.equals(AplsPlatform.CCL) ? AuditActivityType.CCL_REVERSE_FEE : AuditActivityType.VMS_REVERSE_FEE);

        try {
            // check permissions separately in case the user groups for CCL and VMS don't overlap 100%
            if (aplsPlatform.equals(AplsPlatform.CCL)) {
                securityService.validateHasPermission(ManagedPermission.CCL_REVERSE_FEE);
            } else {
                securityService.validateHasPermission(ManagedPermission.VMS_REVERSE_FEE);
            }

            Response<EnhancedAdjustBalanceResponse> response = transactionClient.reverseFee(customerId, request, supportService.defaultSupport());
            auditService.saveRecordAsSuccess(auditActivity);

            return response.getBody();
        } catch (Exception e) {
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public EnhancedGenericResponse updateTransaction(String customerId, UpdateTransactionStatusRequest request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.VMS_UPDATE_TRANSACTION);

        try {
            securityService.validateHasPermission(ManagedPermission.VMS_REPORT_TRANSACTION_AS_FRAUD);

            Response<EnhancedGenericResponse> response = transactionClient.updateTransaction(customerId, request, supportService.defaultSupport());
            auditService.saveRecordAsSuccess(auditActivity);
            return response.getBody();
        } catch (Exception e) {
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    private void buildPagination(EnhancedTransactions transactions, TransactionHistoryRequestSupport.SortOrder sortOrder, int resultsPerPage) {
        Pagination pagination = new Pagination();
        pagination.setStart(1L);
        pagination.setEnd(1L);
        pagination.setSortType(SortType.valueOf(sortOrder.toString()));
        pagination.setTotalPages(1);
        pagination.setPage(1);
        pagination.setTotalResults(transactions.getTransactions()
                                               .size());
        pagination.setResultsPerPage(resultsPerPage);

        transactions.setPagination(pagination);
    }

    public TransactionHistoryRequestSupport buildRequest(TransactionSearchRequestView requestView) {
        TransactionHistoryRequestSupport request = new TransactionHistoryRequestSupport();
        request.setArchive(requestView.getIsArchive());
        request.setCashierId(requestView.getCashierId());
        request.setStartDate(requestView.getStartDate());
        request.setEndDate(requestView.getEndDate());
        request.setSortOrder(requestView.getSortOrder());
        request.setPage(requestView.getPage());
        request.setResultsPerPage(requestView.getResultsPerPage());
        request.setBillable((requestView.getIsBillable() == true) ? true : null); //It CAN be null...
        request.setTransactionFilter(requestView.getTransactionFilter());
        request.setAccountType(requestView.getAccountType());
        request.setToken(requestView.getToken());

        return request;
    }

    public void setTransactionsToInDispute(EnhancedTransactions transactions) {
        // Find all transactions that have related dispute case
        List<String> transactionIds = transactions.getTransactions()
                                                  .stream()
                                                  .map(EnhancedTransaction::getId)
                                                  .collect(Collectors.toList());
        Map<String, DisputedTransaction> disputedTransactions = disputeService.findDisputedTransactions(transactionIds);

        // Update flag and dispute ID on each transaction with a dispute
        transactions.getTransactions()
                    .stream()
                    .filter(transaction -> disputedTransactions.containsKey(transaction.getId()))
                    .forEach(transaction -> {
                        transaction.getFlags()
                                   .setIsInDispute(true);
                        transaction.setDisputeId(disputedTransactions.get(transaction.getId())
                                                                     .getDisputeComponent()
                                                                     .getSession()
                                                                     .getId());
                    });
    }
}
