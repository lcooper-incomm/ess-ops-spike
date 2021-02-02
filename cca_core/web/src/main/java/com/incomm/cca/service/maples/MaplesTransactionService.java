package com.incomm.cca.service.maples;

import com.incomm.cscore.client.maples.CsCoreMaplesTransactionClient;
import com.incomm.cscore.client.maples.model.request.MaplesRequestSupport;
import com.incomm.cscore.client.maples.model.request.transaction.AdjustTransactionRequest;
import com.incomm.cscore.client.maples.model.request.transaction.CancelPreauthRequest;
import com.incomm.cscore.client.maples.model.request.transaction.CancelTransactionRequest;
import com.incomm.cscore.client.maples.model.request.transaction.DisputeTransactionRequest;
import com.incomm.cscore.client.maples.model.request.transaction.TransactionQuery;
import com.incomm.cscore.client.maples.model.response.transaction.Transaction;
import com.incomm.cscore.client.maples.model.response.transaction.TransactionAmounts;
import com.incomm.cscore.client.maples.model.response.transaction.TransactionSettlement;
import com.incomm.cscore.client.maples.model.response.transaction.TransactionsResponse;
import com.incomm.cscore.client.maples.model.shared.IdCodeResponse;
import com.incomm.cscore.client.maples.model.shared.ResultMessageResponse;
import com.incomm.cscore.client.model.CsCoreTimestamp;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.gringotts.model.CsCoreCurrency;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MaplesTransactionService {

    @Autowired
    CsCoreMaplesTransactionClient transactionClient;
    @Autowired
    private MaplesRequestSupportService supportService;


    public ResultMessageResponse adjustTransation(String transactionId, AdjustTransactionRequest request) throws Exception {
        MaplesRequestSupport support = this.supportService.defaultSupport();

        Response<ResultMessageResponse> response = transactionClient.adjustTransaction(transactionId, request, support);

        if (response.getBody() != null) {
            return response.getBody();
        } else {
            throw new Exception("Failed to adjust the transaction.");
        }
    }

    public TransactionsResponse search(TransactionQuery request) {
        MaplesRequestSupport support = this.supportService.defaultSupport();
        // TODO: Any permission to validate? this.validateSearchPermission(support);

        Response<TransactionsResponse> response = transactionClient.search(request, support);

        // TODO: Add data filter

        if (response.getBody() != null) {
            return response.getBody();
        } else {
            return new TransactionsResponse();
        }
    }

    public TransactionsResponse findOne(String accountId, String transactionId) throws Exception {
        MaplesRequestSupport support = this.supportService.defaultSupport();

        Response<TransactionsResponse> response = transactionClient.findOne(accountId, transactionId, support);

        if (response.getBody() != null) {
            return response.getBody();
        } else {
            throw new Exception("Failed to find the transaction.");
        }
    }

    public IdCodeResponse createDispute(String transactionId, DisputeTransactionRequest request) throws Exception {
        MaplesRequestSupport support = this.supportService.defaultSupport();

        Response<IdCodeResponse> response = transactionClient.createDispute(transactionId, request, support);

        if (response.getBody() != null) {
            return response.getBody();
        } else {
            throw new Exception("Failed to dispute the transaction.");
        }
    }

    public ResultMessageResponse cancelPreauthTransaction(String accountId, CancelPreauthRequest request) throws Exception {
        MaplesRequestSupport support = this.supportService.defaultSupport();

        Response<ResultMessageResponse> response = transactionClient.cancelPreauthTransaction(accountId, request, support);

        if (response.getBody() != null) {
            return response.getBody();
        } else {
            throw new Exception("Failed to cancel the transaction.");
        }
    }

    public ResultMessageResponse cancelTransaction(String eventId, CancelTransactionRequest request) throws Exception {
        MaplesRequestSupport support = this.supportService.defaultSupport();

        Response<ResultMessageResponse> response = transactionClient.cancelTransaction(eventId, request, support);

        if (response.getBody() != null) {
            return response.getBody();
        } else {
            throw new Exception("Failed to cancel the transaction.");
        }
    }

    public TransactionsResponse findOnePreauth(String accountId, String transactionId) throws Exception {

        MaplesRequestSupport support = this.supportService.defaultSupport();
        Response<TransactionsResponse> response = transactionClient.findOnePreAuth(accountId, transactionId, support);

        if (response.getBody() != null) {
            return response.getBody();
        } else {
            throw new Exception("Failed to find the transaction.");
        }
    }
}
