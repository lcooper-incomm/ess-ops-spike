package com.incomm.cca.service.maples;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.AuditActivityType;
import com.incomm.cca.model.constant.IdentifierType;
import com.incomm.cca.model.constant.TransactionType;
import com.incomm.cca.model.converter.CcaCommentConverter;
import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.session.comment.CommentView;
import com.incomm.cca.model.view.session.comment.CustomerCommentsView;
import com.incomm.cca.repository.IdentifierRepository;
import com.incomm.cca.service.AuditService;
import com.incomm.cca.service.BalanceAdjustmentLimitService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.document.DocumentFileService;
import com.incomm.cca.util.DateUtil;
import com.incomm.cscore.client.maples.CsCoreMaplesAccountClient;
import com.incomm.cscore.client.maples.constant.MaplesPlatform;
import com.incomm.cscore.client.maples.model.request.MaplesRequestSupport;
import com.incomm.cscore.client.maples.model.request.account.AccountChangeStatusRequest;
import com.incomm.cscore.client.maples.model.request.account.AccountCloseRequest;
import com.incomm.cscore.client.maples.model.request.account.AccountCodesQuery;
import com.incomm.cscore.client.maples.model.request.account.AccountDocumentUploadRequest;
import com.incomm.cscore.client.maples.model.request.account.AccountFeaturesUpdateRequest;
import com.incomm.cscore.client.maples.model.request.account.AccountNoteQuery;
import com.incomm.cscore.client.maples.model.request.account.AccountQuery;
import com.incomm.cscore.client.maples.model.request.account.AccountStatusCodeRequest;
import com.incomm.cscore.client.maples.model.request.account.AccountWithdrawRequest;
import com.incomm.cscore.client.maples.model.request.account.AddDocumentAction;
import com.incomm.cscore.client.maples.model.request.account.AddMerchantBlockRequest;
import com.incomm.cscore.client.maples.model.request.account.EnhancedAccountAdjustBalanceRequest;
import com.incomm.cscore.client.maples.model.request.account.SendNotesRequest;
import com.incomm.cscore.client.maples.model.request.account.UpdateDocumentRequest;
import com.incomm.cscore.client.maples.model.request.account.UpdateMerchantBlockRequest;
import com.incomm.cscore.client.maples.model.request.customer.AddEmailAddress;
import com.incomm.cscore.client.maples.model.request.customer.UpdateEmailAddress;
import com.incomm.cscore.client.maples.model.request.customer.UpdateSsn;
import com.incomm.cscore.client.maples.model.response.account.Account;
import com.incomm.cscore.client.maples.model.response.account.AccountCode;
import com.incomm.cscore.client.maples.model.response.account.AccountCodesResponse;
import com.incomm.cscore.client.maples.model.response.account.AccountDocument;
import com.incomm.cscore.client.maples.model.response.account.AccountDocumentsResponse;
import com.incomm.cscore.client.maples.model.response.account.AccountNote;
import com.incomm.cscore.client.maples.model.response.account.AccountNoteResponse;
import com.incomm.cscore.client.maples.model.response.account.AccountNotification;
import com.incomm.cscore.client.maples.model.response.account.AccountNotificationResponse;
import com.incomm.cscore.client.maples.model.response.account.AccountResponse;
import com.incomm.cscore.client.maples.model.response.account.AccountShippingOption;
import com.incomm.cscore.client.maples.model.response.account.ActionsAccountAdjustBalance;
import com.incomm.cscore.client.maples.model.response.account.BlockedMerchantsResponse;
import com.incomm.cscore.client.maples.model.response.account.DocumentAction;
import com.incomm.cscore.client.maples.model.response.account.MaplesRule;
import com.incomm.cscore.client.maples.model.response.account.ReserveAccount;
import com.incomm.cscore.client.maples.model.shared.DateRange;
import com.incomm.cscore.client.maples.model.shared.EmailTemplate;
import com.incomm.cscore.client.maples.model.shared.IdCodeResponse;
import com.incomm.cscore.client.maples.model.shared.IdResultResponse;
import com.incomm.cscore.client.maples.model.shared.ResultMessageResponse;
import com.incomm.cscore.client.model.CsCoreAddress;
import com.incomm.cscore.client.model.CsCorePhoneNumber;
import com.incomm.cscore.client.model.CsCoreTimestamp;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class MaplesAccountService {

    @Autowired
    CsCoreMaplesAccountClient accountClient;
    @Autowired
    private AuditService auditService;
    @Autowired
    private BalanceAdjustmentLimitService balanceAdjustmentLimitService;
    @Autowired
    CcaCommentConverter commentConverter;
    @Autowired
    IdentifierRepository identifierRepository;
    @Autowired
    MaplesRequestSupportService supportService;
    @Autowired
    TimestampConverter timestampConverter;
    @Autowired
    SecurityService securityService;
    @Autowired
    DocumentFileService documentFileService;

    public Account findOne(String accountId) {
        Account account = accountClient.findOneByAccountId(accountId, supportService.defaultSupport())
                                       .getBody();

        stripAccountPCI(account);

        return account;
    }

    public List<Account> search(AccountQuery request) {
        MaplesRequestSupport support = this.supportService.defaultSupport();
        this.validateSearchPermission(support);

        Response<AccountResponse> response;
        response = accountClient.search(request, support);

        if (response.getBody() != null) {
            return response.getBody()
                           .getAccounts();
        } else {
            return Collections.emptyList();
        }
    }

    public List<AccountCode> searchCodes(AccountCodesQuery request) {
        MaplesRequestSupport support = this.supportService.defaultSupport();

        Response<AccountCodesResponse> response = accountClient.searchCodes(request, support);

        if (response.getBody() != null) {
            return response.getBody()
                           .getCodes();
        } else {
            return Collections.emptyList();
        }
    }

    public List<AccountCode> searchCodesByAccount(String accountId, AccountCodesQuery request) {
        MaplesRequestSupport support = this.supportService.defaultSupport();

        Response<AccountCodesResponse> response = accountClient.searchCodesByAccount(accountId, request, support);

        if (response.getBody() != null) {
            return response.getBody()
                           .getCodes();
        } else {
            return Collections.emptyList();
        }
    }

    public ResultMessageResponse addStatusCode(String accountId, AccountStatusCodeRequest request) {
        securityService.validateHasPermission(ManagedPermission.SERVE_STATUS_CODE_EDIT);

        MaplesRequestSupport support = this.supportService.defaultSupport();

        Response<ResultMessageResponse> response = accountClient.addStatusCode(accountId, request, support);
        return response.getBody();
    }

    public ResultMessageResponse updateStatusCode(String accountId, AccountStatusCodeRequest request) {
        securityService.validateHasPermission(ManagedPermission.SERVE_STATUS_CODE_EDIT);

        MaplesRequestSupport support = this.supportService.defaultSupport();

        Response<ResultMessageResponse> response = accountClient.updateStatusCode(accountId, request, support);
        return response.getBody();
    }

    public ResultMessageResponse deleteStatusCode(String accountId, AccountStatusCodeRequest request) {
        securityService.validateHasPermission(ManagedPermission.SERVE_STATUS_CODE_EDIT);

        MaplesRequestSupport support = this.supportService.defaultSupport();

        Response<ResultMessageResponse> response = accountClient.deleteStatusCode(accountId, request, support);
        return response.getBody();
    }

    public List<AccountDocument> findDocuments(String accountId) {
        Response<AccountDocumentsResponse> response;
        response = accountClient.findDocumentsByAccountId(accountId, supportService.defaultSupport());

        if (response.getBody() != null) {
            return response.getBody()
                           .getDocuments()
                           .stream()
                           .filter(document -> {
                               return document.getRestrictedCode() == null
                                       || document.getRestrictedCode() != null && securityService.hasPermission(ManagedPermission.SERVE_VIEW_RESTRICTED_DOCS);
                           })
                           .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }

    public AccountDocument findDocument(String accountId, String documentId) throws Exception {
        AccountDocument document = findDocument(accountId, documentId, false);
        if (document.getRestrictedCode() != null) {
            securityService.validateHasPermission(ManagedPermission.SERVE_VIEW_RESTRICTED_DOCS);
        }
        return document;
    }

    /**
     * Find the document by accountId and documentId.  If the document is a .docx or .dot then convert the file contents
     * to pdf before sending it back to CCA.
     *
     * @param accountId
     * @param documentId
     * @return
     * @throws Exception
     */
    public AccountDocument findDocument(String accountId, String documentId, Boolean download) throws Exception {
        securityService.validateHasPermission(ManagedPermission.VIEW_DOCUMENT);

        Response<AccountDocument> response = accountClient.findDocumentByAccountIdDocumentId(accountId, documentId, supportService.defaultSupport());

        if (response.getBody() != null) {
            if (response.getBody()
                        .getRestrictedCode() != null) {
                securityService.validateHasPermission(ManagedPermission.SERVE_VIEW_RESTRICTED_DOCS);
            }
            if (response.getBody().getFilePath().endsWith(".docx") || response.getBody().getFilePath().endsWith(".dot")) {
                try {
                    response.getBody()
                            .setFile(documentFileService.convertBase64DocxToPdf(response.getBody()
                                                                                        .getFile()));
                    response.getBody()
                            .setFileMimeType("application/pdf");
                } catch (Exception e) {
                    CsCoreLogger.error(e.getMessage())
                                .build();
                    throw new Exception("Failed to convert docx/dot to pdf for viewing.");
                }
            }

            return response.getBody();
        } else {
            throw new NotFoundException("Document not found");
        }
    }

    public ResultMessageResponse archiveDocument(String accountId, String documentId) {
        try {
            Response<ResultMessageResponse> response = accountClient.archiveDocument(accountId, documentId, supportService.defaultSupport());
            return response.getBody();
        } catch (Exception e) {
            CsCoreLogger.warn("Failed to archive document")
                        .keyValue("accountId", accountId)
                        .keyValue("messageId", documentId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public AccountNotification findNotification(String accountId, String messageId) {
        try {
            Response<AccountNotificationResponse> response = accountClient.findNotificationByMessageId(accountId, messageId, supportService.defaultSupport());

            if (response.getBody() != null && !response.getBody()
                                                       .getNotifications()
                                                       .isEmpty()) {
                return response.getBody()
                               .getNotifications()
                               .get(0);
            } else {
                throw new NotFoundException("Notification not found");
            }
        } catch (Exception e) {
            CsCoreLogger.warn("Failed to find notification")
                        .keyValue("accountId", accountId)
                        .keyValue("messageId", messageId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public ResultMessageResponse resendNotification(String accountId, String messageId) {
        try {
            Response<ResultMessageResponse> response = accountClient.resendNotificationByMessageId(accountId, messageId, supportService.defaultSupport());
            return response.getBody();
        } catch (Exception e) {
            CsCoreLogger.warn("Failed to resend notification")
                        .keyValue("accountId", accountId)
                        .keyValue("messageId", messageId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public ResultMessageResponse updateAddress(String accountId, CsCoreAddress request) {
        try {
            Response<ResultMessageResponse> response = accountClient.updateAddress(accountId, request, supportService.defaultSupport());
            return response.getBody();
        } catch (Exception e) {
            CsCoreLogger.warn("Failed to update Address")
                        .keyValue("accountId", accountId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public ResultMessageResponse addAddress(String accountId, CsCoreAddress request) {
        try {
            Response<ResultMessageResponse> response = accountClient.addAddress(accountId, request, supportService.defaultSupport());
            return response.getBody();
        } catch (Exception e) {
            CsCoreLogger.warn("Failed to update Address")
                        .keyValue("accountId", accountId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public ResultMessageResponse updateEmail(String accountId, UpdateEmailAddress request) {
        try {
            Response<ResultMessageResponse> response = accountClient.updateEmail(accountId, request, supportService.defaultSupport());
            return response.getBody();
        } catch (Exception e) {
            CsCoreLogger.warn("Failed to update email")
                        .keyValue("accountId", accountId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public ResultMessageResponse addEmail(String accountId, AddEmailAddress request) {
        try {
            Response<ResultMessageResponse> response = accountClient.addEmail(accountId, request, supportService.defaultSupport());
            return response.getBody();
        } catch (Exception e) {
            CsCoreLogger.warn("Failed to update email")
                        .keyValue("accountId", accountId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public ResultMessageResponse updatePhone(String accountId, CsCorePhoneNumber request) {
        try {
            Response<ResultMessageResponse> response = accountClient.updatePhone(accountId, request, supportService.defaultSupport());
            return response.getBody();
        } catch (Exception e) {
            CsCoreLogger.warn("Failed to update phone")
                        .keyValue("accountId", accountId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public ResultMessageResponse addPhone(String accountId, CsCorePhoneNumber request) {
        try {
            Response<ResultMessageResponse> response = accountClient.addPhone(accountId, request, supportService.defaultSupport());
            return response.getBody();
        } catch (Exception e) {
            CsCoreLogger.warn("Failed to update phone")
                        .keyValue("accountId", accountId)
                        .exception(e)
                        .build();
            throw e;
        }
    }


    public ResultMessageResponse updateSsn(String accountId, UpdateSsn request) {
        try {
            Response<ResultMessageResponse> response = accountClient.updateSsn(accountId, request, supportService.defaultSupport());
            return response.getBody();
        } catch (Exception e) {
            CsCoreLogger.warn("Failed to update ssn")
                        .keyValue("accountId", accountId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public AccountDocumentsResponse submitDocument(String accountId, AccountDocumentUploadRequest request) {
        Response<AccountDocumentsResponse> response;

        try {
            response = accountClient.uploadDocument(accountId, request, supportService.defaultSupport());
            return response.getBody();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to upload document to the account")
                        .keyValue("id", accountId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<AccountNotification> findNotifications(String accountId) {
        Response<AccountNotificationResponse> response;
        response = accountClient.findNotificationsByAccountId(accountId, supportService.defaultSupport());

        if (response.getBody() != null) {
            return response.getBody()
                           .getNotifications();
        } else {
            return Collections.emptyList();
        }
    }

    public ResultMessageResponse closeAccount(String accountId, AccountCloseRequest request) {
        return this.accountClient.closeAccount(accountId, request, supportService.defaultSupport())
                                 .getBody();
    }

    public ResultMessageResponse changeAccountStatus(String accountId, AccountChangeStatusRequest request) {
        return this.accountClient.changeAccountStatus(accountId, request, supportService.defaultSupport())
                                 .getBody();
    }

    public ResultMessageResponse toggleFeatures(String accountId, AccountFeaturesUpdateRequest request) {
        try {
            Response<ResultMessageResponse> response = accountClient.updateFeatures(accountId, request, supportService.defaultSupport());
            return response.getBody();
        } catch (Exception e) {
            CsCoreLogger.warn("Failed to update features")
                        .keyValue("accountId", accountId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public ActionsAccountAdjustBalance adjustAccountBalance(String accountId, EnhancedAccountAdjustBalanceRequest request) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.ADJUST_BALANCE);
        try {
            MaplesPlatform platform = supportService.defaultSupport()
                                                    .getPlatform();

            switch (platform) {
                case SERVE:
                    securityService.validateHasPermission(ManagedPermission.SERVE_ADJUST_BALANCE);
                    break;
                default:
                    throw new UnsupportedOperationException("Unsupported platform");
            }

            balanceAdjustmentLimitService.authorizeMaplesBalanceAdjustmentAgainstLimits(accountId, request, platform);
            Response<ActionsAccountAdjustBalance> response = this.accountClient.adjustAccountBalance(accountId, request, supportService.defaultSupport());
            auditService.saveRecordAsSuccess(auditActivity);
            auditService.createBalanceAdjustmentActivity(IdentifierType.ACCOUNT_ID, accountId, platform.toString(), Double.parseDouble(request.getAmount()), TransactionType.valueOf(request.getAdjustmentType()), "");

            return response.getBody();
        } catch (Exception e) {
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }

    }

    public List<DocumentAction> getDocumentActions(String accountId, String documentId) {
        return this.accountClient.getDocumentActions(accountId, documentId, supportService.defaultSupport())
                                 .getBody();
    }

    public ResultMessageResponse addDocumentAction(String accountId, String documentId, AddDocumentAction request) {
        return this.accountClient.addDocumentAction(accountId, documentId, request, supportService.defaultSupport())
                                 .getBody();
    }

    public ResultMessageResponse updateDocument(String accountId, String documentId, UpdateDocumentRequest request) {
        return this.accountClient.updateDocument(accountId, documentId, request, supportService.defaultSupport())
                                 .getBody();
    }

    public List<EmailTemplate> getEmailTemplates(String accountId) {
        return this.accountClient.getEmailTemplates(accountId, supportService.defaultSupport())
                                 .getBody();
    }

    public AccountNotification getNotificationPreview(String accountId, EmailTemplate request) {
        return this.accountClient.getNotificationPreview(accountId, request, supportService.defaultSupport())
                                 .getBody();
    }

    public IdResultResponse sendNotification(String accountId, EmailTemplate request) {
        return this.accountClient.sendNotification(accountId, request, supportService.defaultSupport())
                                 .getBody();
    }

    public BlockedMerchantsResponse updateMerchantBlock(String accountId, UpdateMerchantBlockRequest request) {
        return this.accountClient.updateBlockedMerchants(accountId, request, supportService.defaultSupport())
                                 .getBody();
    }

    public ResultMessageResponse addMerchantBlock(String accountId, AddMerchantBlockRequest request) {
        return this.accountClient.addMerchantBlock(accountId, request, supportService.defaultSupport())
                                 .getBody();
    }

    public List<MaplesRule> getBlockedMerchants(String accountId) {
        Response<BlockedMerchantsResponse> response;
        response = accountClient.getBlockedMerchants(accountId, supportService.defaultSupport());

        if (response.getBody() != null) {
            return response.getBody()
                           .getBlockedMerchants();
        } else {
            return Collections.emptyList();
        }
    }

    public IdCodeResponse accountWithdraw(String accountId, AccountWithdrawRequest request) {
        return this.accountClient.accountWithdraw(accountId, request, supportService.defaultSupport())
                                 .getBody();
    }

    @Transactional
    public CustomerCommentsView getAllComments(String accountId, AccountNoteQuery query) {
        String platform = supportService.defaultSupport()
                                        .getPlatform()
                                        .toString();

        CustomerCommentsView view = getPlatformComments(accountId, platform, query);
        List<CommentView> ccaComments = getCCAComments(accountId, platform, query);
        view.getComments()
            .addAll(ccaComments);

        return view;
    }

    public ResultMessageResponse sendComment(String accountId, SendNotesRequest request) {
        return this.accountClient.sendNote(accountId, request, supportService.defaultSupport())
                                 .getBody();
    }

    public List<ReserveAccount> findReserveAccounts(String accountId) {
        return this.accountClient.findReserveAccounts(accountId, supportService.defaultSupport())
                                 .getBody();
    }

    private List<AccountNote> findNotes(String accountId, AccountNoteQuery query) {
        Response<AccountNoteResponse> response;
        response = accountClient.findNotesByAccountId(accountId, query, supportService.defaultSupport());

        if (response.getBody() != null) {
            return response.getBody()
                           .getNotes();
        } else {
            return Collections.emptyList();
        }
    }

    private List<CommentView> getCCAComments(String accountId, String platform, AccountNoteQuery query) {
        Identifier identifier = identifierRepository.findOneByIdentifierTypeAndValueAndPlatform(IdentifierType.ACCOUNT_ID, accountId, platform);
        if (identifier != null) {
            return this.commentConverter.convert(identifier.getComments())
                                        .stream()
                                        .filter(this.isInDateRange(query.getDateQuery()))
                                        .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }

    private CustomerCommentsView getPlatformComments(String accountId, String platform, AccountNoteQuery query) {
        try {
            List<AccountNote> notes = findNotes(accountId, query);
            return commentConverter.convertAccountNotes(notes, platform);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to get account comments")
                        .keyValue("accountId", accountId)
                        .exception(e)
                        .build();
            CustomerCommentsView comments = new CustomerCommentsView();
            comments.setIsPartial(true);
            return comments;
        }
    }

    private void validateSearchPermission(MaplesRequestSupport support) {
        switch (support.getPlatform()) {
            case SERVE:
                securityService.validateHasPermission(ManagedPermission.SEARCH_SERVE);
                break;
            default:
                throw new SecurityViolationException();
        }
    }

    public List<AccountShippingOption> findShippingOptions(String accountId) {
        return this.accountClient.findShippingOptions(accountId, supportService.defaultSupport())
                                 .getBody();
    }

    /**
     * Remove any sensitive information in the account based on permissions.
     *
     * @param account
     */
    private void stripAccountPCI(Account account) {
        if (account != null && account.getDirectDeposit() != null) {
            String billPayDda = account.getDirectDeposit()
                                       .getBillPayDda();
            if (billPayDda != null && !billPayDda.isEmpty()) {
                if (!securityService.hasPermission(ManagedPermission.SERVE_VIEW_BILL_PAY_DDA)) {
                    account.getDirectDeposit()
                           .setBillPayDda("****");
                }
            }
        }
    }

    private Predicate<CommentView> isInDateRange(DateRange dateRange) {
        CsCoreTimestamp startDate = this.timestampConverter.convertFromYYYYMMDD(dateRange.getStartDate());
        CsCoreTimestamp endDate = this.timestampConverter.convertFromYYYYMMDD(dateRange.getEndDate());
        return (CommentView comment) -> DateUtil.isInRange(comment.getCreatedDate()
                                                                  .getValue(), startDate.getValue(), endDate.getValue());
    }
}

