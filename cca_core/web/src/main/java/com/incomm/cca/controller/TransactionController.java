package com.incomm.cca.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.enums.apls.AplsIdentifier;
import com.incomm.cca.model.view.transaction.TransactionSearchRequestView;
import com.incomm.cca.service.SecurityFilterService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.apls.AplsTransactionService;
import com.incomm.cca.service.maples.MaplesTransactionService;
import com.incomm.cca.service.mapping.DataFilterService;
import com.incomm.cca.util.DateUtil;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.customer.EnhancedDispute;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransactions;
import com.incomm.cscore.client.maples.model.request.transaction.AdjustTransactionRequest;
import com.incomm.cscore.client.maples.model.request.transaction.CancelPreauthRequest;
import com.incomm.cscore.client.maples.model.request.transaction.CancelTransactionRequest;
import com.incomm.cscore.client.maples.model.request.transaction.DisputeTransactionRequest;
import com.incomm.cscore.client.maples.model.request.transaction.TransactionQuery;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/rest/transaction")
public class TransactionController extends RestResponseHandler {

    @Autowired
    private AplsTransactionService aplsTransactionService;
    @Autowired
    private SecurityFilterService securityFilterService;
    @Autowired
    private DataFilterService dataFilterService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private MaplesTransactionService maplesTransactionService;
    @Autowired
    private ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping(value = "/maples-search")
    public ResponseEntity search(@RequestHeader("maples-query") String maplesQueryJson) {
        return ok(maplesTransactionService.search(parseQueryHeader(maplesQueryJson)));
    }

    @GetMapping(value = "/{accountId}/{transactionId}")
    public ResponseEntity findOne(@PathVariable("accountId") String accountId, @PathVariable("transactionId") String transactionId) {
        try {
            return ok(maplesTransactionService.findOne(accountId, transactionId));
        } catch (Exception e) {
            return badRequest(e.getMessage());
        }
    }


    @GetMapping(value = "/preauth/{accountId}/{transactionId}")
    public ResponseEntity findOnePreauth(@PathVariable("accountId") String accountId, @PathVariable("transactionId") String transactionId) {
        try {
            return ok(maplesTransactionService.findOnePreauth(accountId, transactionId));
        } catch (Exception e) {
            return badRequest(e.getMessage());
        }
    }
    
    @PostMapping(value = "/{transactionId}/adjust")
    public ResponseEntity adjustTransaction(@PathVariable("transactionId") String transactionId, @RequestBody AdjustTransactionRequest request) {
        try {
            return ok(maplesTransactionService.adjustTransation(transactionId, request));
        } catch (Exception e) {
            return badRequest(e.getMessage());
        }
    }

    @PostMapping(value = "/{transactionId}/create-dispute")
    public ResponseEntity createDispute(@PathVariable("transactionId") String transactionId, @RequestBody DisputeTransactionRequest request) {
        try {
            return ok(maplesTransactionService.createDispute(transactionId, request));
        } catch (Exception e) {
            return badRequest(e.getMessage());
        }
    }

    @PostMapping(value = "/account/{accountId}/cancel")
    public ResponseEntity cancelPreauthTransaction(@PathVariable("accountId") String accountId, @RequestBody CancelPreauthRequest request) {
        try {
            return ok(maplesTransactionService.cancelPreauthTransaction(accountId, request));
        } catch (Exception e) {
            return badRequest(e.getMessage());
        }
    }

    @PostMapping(value = "/{eventId}/cancel")
    public ResponseEntity cancelScheduledTransaction(@PathVariable("eventId") String eventId, @RequestBody CancelTransactionRequest request) {
        try {
            return ok(maplesTransactionService.cancelTransaction(eventId, request));
        } catch (Exception e) {
            return badRequest(e.getMessage());
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "/search")
    public ResponseEntity searchRest(@RequestBody TransactionSearchRequestView request) {
        DateUtil.checkDateRange(request.getStartDate(), request.getEndDate());
        this.validateSelectionIdPresentWhenNecessary(request);
        this.validatePermissionForIsFraudulentFilter(request);

        EnhancedTransactions transactions = aplsTransactionService.search(request);

        if (request.getPlatform() == AplsPlatform.INCOMM) {
            dataFilterService.filterOpCodes(transactions);
        } else if (request.getPlatform() == AplsPlatform.GREENCARD) {
            dataFilterService.filterGCRequestAndResponse(transactions);
        }

        aplsTransactionService.setTransactionsToInDispute(transactions);

        //CCA-581 Run through filter to mask certain fields based on user role
        securityFilterService.filterTransactionHistory(request.getIdentifierType(), transactions);

        return ok(transactions);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{identifierType}/{identifier}/dispute/{transactionId}")
    public ResponseEntity getDisputesForTransaction(
            @PathVariable("identifierType") AplsIdentifier identifierType,
            @PathVariable("identifier") String identifier,
            @PathVariable("transactionId") String transactionId,
            @RequestParam(value = "platform", defaultValue = "VMS") String platform,
            @RequestParam("businessDate") Long businessDate,
            @RequestParam("deliveryChannel") String deliveryChannel,
            @RequestParam("requestCode") String requestCode,
            @RequestParam("responseCode") String responseCode
    ) {
        EnhancedDispute dispute = aplsTransactionService.getDisputeForVmsTransaction(identifier, transactionId, businessDate, deliveryChannel, requestCode, responseCode);
        return ok(dispute);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{identifierType}/{identifier}/details/{transactionId}")
    public ResponseEntity getTransactionDetails(
            @PathVariable("identifierType") AplsIdentifier identifierType,
            @PathVariable("identifier") String identifier,
            @PathVariable("transactionId") String transactionId,
            @RequestParam(value = "platform", defaultValue = "INCOMM") String platform,
            @RequestParam("businessDate") Long businessDate,
            @RequestParam("deliveryChannel") String deliveryChannel,
            @RequestParam("requestCode") String requestCode,
            @RequestParam("responseCode") String responseCode,
            @RequestParam("selectionId") Long selectionId
    ) {

        //If platform VMS, it is critical that we have a selectionId
        if (AplsPlatform.convert(platform) == AplsPlatform.VMS && selectionId == null) {
            CsCoreLogger.error("Expected selectionId for VMS history request")
                        .build();
            return badRequest("selectionId must be provided for VMS requests");
        }

        EnhancedTransaction dto = aplsTransactionService.getTransactionDetails(identifierType, identifier, AplsPlatform.convert(platform), transactionId, businessDate, deliveryChannel, requestCode, responseCode);
        return ok(dto);
    }

    private void validatePermissionForIsFraudulentFilter(TransactionSearchRequestView request) {
        //If transactionFilter is isFraudulent, permission is required
        if (StringUtils.equals("isFraudulent", request.getTransactionFilter())) {
            securityService.validateHasPermission(ManagedPermission.TRANSACTION_FILTER_REPORTED_FRAUD);
        }
    }

    private void validateSelectionIdPresentWhenNecessary(TransactionSearchRequestView request) {
        //If platform VMS, it is critical that we have a selectionId
        switch (request.getPlatform()) {
            case CCL:
            case VMS:
                if (request.getSelectionId() == null) {
                    throw new IllegalArgumentException("selectionId must be provided");
                }
                break;
            default:
                break;
        }
    }

    private TransactionQuery parseQueryHeader(String headerString) {
        try {
            return this.objectMapper.readValue(headerString, TransactionQuery.class);
        } catch (IOException e) {
            CsCoreLogger.error("Failed to parse maples-query header value")
                        .keyValue("value", headerString)
                        .exception(e)
                        .build();
            throw new IllegalArgumentException("Illegal transaction-query header format");
        }
    }

}
