package com.incomm.cca.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incomm.cca.service.maples.MaplesAccountService;
import com.incomm.cscore.client.maples.model.request.MaplesRequestSupport;
import com.incomm.cscore.client.maples.model.request.account.AccountChangeStatusRequest;
import com.incomm.cscore.client.maples.model.request.account.AccountCodesQuery;
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
import com.incomm.cscore.client.maples.model.response.account.AccountDocument;
import com.incomm.cscore.client.maples.model.shared.DateRange;
import com.incomm.cscore.client.maples.model.shared.EmailTemplate;
import com.incomm.cscore.client.maples.model.shared.ResultMessageResponse;
import com.incomm.cscore.client.model.CsCoreAddress;
import com.incomm.cscore.client.model.CsCorePhoneNumber;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.codec.binary.Base64InputStream;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/rest/customer-account")
public class CustomerAccountController extends RestResponseHandler {

    @Autowired
    private MaplesAccountService customerAccountService;
    @Autowired
    private ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping(value = "/{accountId}")
    public ResponseEntity findOne(@PathVariable("accountId") String accountId) {
        return ok(customerAccountService.findOne(accountId));
    }

    @GetMapping(value = "/search")
    public ResponseEntity search(@RequestHeader("cca-query") String ccaQueryJson) {
        AccountQuery query = this.parseQueryHeader(ccaQueryJson);
        return ok(customerAccountService.search(query));
    }

    @PostMapping("/{accountNumber}/balance/adjustment")
    public ResponseEntity adjustAccountBalance(@PathVariable("accountNumber") String accountNumber, @RequestBody EnhancedAccountAdjustBalanceRequest request) {
        return ok(customerAccountService.adjustAccountBalance(accountNumber, request));
    }

    @PostMapping("/{accountNumber}/status")
    public ResponseEntity changeAccountStatus(@PathVariable("accountNumber") String accountNumber, @RequestBody AccountChangeStatusRequest request) {
        return ok(customerAccountService.changeAccountStatus(accountNumber, request));
    }

    @PostMapping("/codes")
    public ResponseEntity searchCodes(@RequestBody AccountCodesQuery request) {
        return ok(customerAccountService.searchCodes(request));
    }

    @PostMapping("/{accountId}/codes")
    public ResponseEntity searchCodesByAccount(@PathVariable("accountId") String accountId, @RequestBody AccountCodesQuery request) {
        return ok(customerAccountService.searchCodesByAccount(accountId, request));
    }

    @PostMapping("/{accountId}/codes/add")
    public ResponseEntity addStatusCode(@PathVariable("accountId") String accountId, @RequestBody AccountStatusCodeRequest request) {
        return ok(customerAccountService.addStatusCode(accountId, request));
    }

    @PutMapping("/{accountId}/codes/update")
    public ResponseEntity updateStatusCode(@PathVariable("accountId") String accountId, @RequestBody AccountStatusCodeRequest request) {
        return ok(customerAccountService.updateStatusCode(accountId, request));
    }

    @PostMapping("/{accountId}/codes/delete")
    public ResponseEntity deleteStatusCode(@PathVariable("accountId") String accountId, @RequestBody AccountStatusCodeRequest request) {
        return ok(customerAccountService.deleteStatusCode(accountId, request));
    }

    @GetMapping(value = "/{accountId}/documents")
    public ResponseEntity findDocuments(@PathVariable("accountId") String accountId) {
        return ok(customerAccountService.findDocuments(accountId));
    }

    @GetMapping(value = "/{accountId}/documents/{documentId}")
    public ResponseEntity getDocument(@PathVariable("accountId") String accountId,
                                      @PathVariable("documentId") String documentId) {
        try {
            return ok(customerAccountService.findDocument(accountId, documentId));
        } catch (Exception e) {
            return badRequest(e.getMessage());
        }
    }

    @DeleteMapping(value = "/{accountId}/documents/{documentId}")
    public ResponseEntity archiveDocument(@PathVariable("accountId") String accountId,
                                          @PathVariable("documentId") String documentId) {
        try {
            return ok(customerAccountService.archiveDocument(accountId, documentId));
        } catch (Exception e) {
            return badRequest(e.getMessage());
        }
    }

    @GetMapping(value = "/{accountId}/documents/{documentId}/download", produces = {"application/octet-stream"})
    public ResponseEntity downloadDocument(@PathVariable("accountId") String accountId,
                                           @PathVariable("documentId") String documentId,
                                           @RequestParam("fileName") String fileName) {

        try {
            AccountDocument document = customerAccountService.findDocument(accountId, documentId, true);

            InputStream inputStream = new ByteArrayInputStream(document.getFile()
                                                                       .getBytes(StandardCharsets.UTF_8));
            byte[] bytes = IOUtils.toByteArray(new BufferedInputStream(new Base64InputStream(inputStream, false)));

            return exportOk(bytes, String.format("attachment; filename=%s", fileName));
        } catch (Exception e) {
            return internalServerError();
        }
    }

    @PostMapping(value = "/{accountId}/comments/search")
    public ResponseEntity getAllComments(@PathVariable("accountId") String accountId, @RequestBody AccountNoteQuery query) {
        return ok(customerAccountService.getAllComments(accountId, query));
    }

    @PostMapping(value = "/{accountId}/comments")
    public ResponseEntity sendComment(@PathVariable("accountId") String accountId, @RequestBody SendNotesRequest request) {
        return ok(customerAccountService.sendComment(accountId, request));
    }

    @GetMapping(value = "/{accountId}/email-templates")
    public ResponseEntity getEmailTemplates(@PathVariable("accountId") String accountId) {
        return ok(customerAccountService.getEmailTemplates(accountId));
    }

    @PostMapping(value = "/{accountId}/notifications/preview")
    public ResponseEntity getNotificationPreview(@PathVariable("accountId") String accountId, @RequestBody EmailTemplate request) {
        return ok(customerAccountService.getNotificationPreview(accountId, request));
    }

    @PostMapping(value = "/{accountId}/notifications/send")
    public ResponseEntity sendNotification(@PathVariable("accountId") String accountId, @RequestBody EmailTemplate request) {
        return ok(customerAccountService.sendNotification(accountId, request));
    }

    @GetMapping(value = "/{accountId}/notifications")
    public ResponseEntity findNotifications(@PathVariable("accountId") String accountId) {
        return ok(customerAccountService.findNotifications(accountId));
    }

    @GetMapping(value = "/{accountId}/notifications/{messageId}")
    public ResponseEntity findNotifications(@PathVariable("accountId") String accountId, @PathVariable("messageId") String messageId) {
        return ok(customerAccountService.findNotification(accountId, messageId));
    }

    @PutMapping(value = "/{accountId}/notifications/{messageId}")
    public ResponseEntity resendNotifications(@PathVariable("accountId") String accountId, @PathVariable("messageId") String messageId) {
        return ok(customerAccountService.resendNotification(accountId, messageId));
    }

    @PostMapping(value = "/{accountId}/address/")
    public ResponseEntity addAddress(@PathVariable("accountId") String accountId, @RequestBody CsCoreAddress request) {
        return ok(customerAccountService.addAddress(accountId, request));
    }

    @PutMapping(value = "/{accountId}/address/")
    public ResponseEntity updateAddress(@PathVariable("accountId") String accountId, @RequestBody CsCoreAddress request) {
        return ok(customerAccountService.updateAddress(accountId, request));
    }

    @PostMapping(value = "/{accountId}/email/")
    public ResponseEntity addEmail(@PathVariable("accountId") String accountId, @RequestBody AddEmailAddress request) {
        return ok(customerAccountService.addEmail(accountId, request));
    }

    @PutMapping(value = "/{accountId}/email/")
    public ResponseEntity updateEmail(@PathVariable("accountId") String accountId, @RequestBody UpdateEmailAddress request) {
        return ok(customerAccountService.updateEmail(accountId, request));
    }

    @PostMapping(value = "/{accountId}/phone/")
    public ResponseEntity addPhone(@PathVariable("accountId") String accountId, @RequestBody CsCorePhoneNumber request) {
        return ok(customerAccountService.addPhone(accountId, request));
    }

    @PutMapping(value = "/{accountId}/phone/")
    public ResponseEntity updatePhone(@PathVariable("accountId") String accountId, @RequestBody CsCorePhoneNumber request) {
        return ok(customerAccountService.updatePhone(accountId, request));
    }

    @PostMapping(value = "/{accountId}/ssn/")
    public ResponseEntity updateSsn(@PathVariable("accountId") String accountId, @RequestBody UpdateSsn request) {
        return ok(customerAccountService.updateSsn(accountId, request));
    }

    @PutMapping(value = "/{accountId}/features")
    public ResponseEntity toggleFeatures(@PathVariable("accountId") String accountId, @RequestBody AccountFeaturesUpdateRequest request) {
        return ok(customerAccountService.toggleFeatures(accountId, request));
    }

    @GetMapping(value = "/{accountId}/documents/{documentId}/actions")
    public ResponseEntity getDocumentActions(@PathVariable("accountId") String accountId, @PathVariable("documentId") String documentId) {
        return ok(customerAccountService.getDocumentActions(accountId, documentId));
    }

    @PutMapping(value = "/{accountId}/documents/{documentId}/add-action")
    public ResponseEntity addDocumentAction(@PathVariable("accountId") String accountId,
                                            @PathVariable("documentId") String documentId,
                                            @RequestBody AddDocumentAction request) {
        return ok(customerAccountService.addDocumentAction(accountId, documentId, request));
    }

    @PutMapping(value = "/{accountId}/documents/{documentId}/update-document")
    public ResponseEntity updateDocument(@PathVariable("accountId") String accountId,
                                         @PathVariable("documentId") String documentId,
                                         @RequestBody UpdateDocumentRequest request) {
        return ok(customerAccountService.updateDocument(accountId, documentId, request));
    }

    @PostMapping(value = "/{accountId}/merchant/block")
    public ResponseEntity addMerchantBlock(@PathVariable("accountId") String accountId, @RequestBody AddMerchantBlockRequest request) {
        return ok(customerAccountService.addMerchantBlock(accountId, request));
    }

    @PutMapping(value = "/{accountId}/merchant/block")
    public ResponseEntity updateMerchantBlock(@PathVariable("accountId") String accountId, @RequestBody UpdateMerchantBlockRequest request) {
        return ok(customerAccountService.updateMerchantBlock(accountId, request));
    }

    @GetMapping(value = "/{accountId}/merchant/block")
    public ResponseEntity getBlockedMerchants(@PathVariable("accountId") String accountId) {
        return ok(customerAccountService.getBlockedMerchants(accountId));
    }

    @GetMapping(value = "/{accountId}/reserve")
    public ResponseEntity findReserveAccounts(@PathVariable("accountId") String accountId) {
        return ok(customerAccountService.findReserveAccounts(accountId));
    }

    private AccountQuery parseQueryHeader(String headerString) {
        try {
            return this.objectMapper.readValue(headerString, AccountQuery.class);
        } catch (IOException e) {
            CsCoreLogger.error("Failed to parse cca-query header value")
                        .keyValue("value", headerString)
                        .exception(e)
                        .build();
            throw new IllegalArgumentException("Illegal cca-query header format");
        }
    }

    @PutMapping(value = "/{accountId}/alert")
    public ResponseEntity updateAlert(@PathVariable("accountId") String accountId) {
        return ok();
    }

    @PostMapping(value = "/{accountId}/withdraw")
    public ResponseEntity accountWithdraw(@PathVariable("accountId") String accountId, @RequestBody AccountWithdrawRequest request) {
        return ok(customerAccountService.accountWithdraw(accountId, request));
    }
    @GetMapping(value = "/{accountId}/shipping")
    public ResponseEntity findShippingOptions(@PathVariable("accountId") String accountId) {
        return ok(customerAccountService.findShippingOptions(accountId));
    }

}
