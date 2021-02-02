package com.incomm.cca.service;

import com.incomm.cca.model.domain.session.dispute.DisputeComponent;
import com.incomm.cca.model.domain.session.dispute.DisputedTransaction;
import com.incomm.cca.repository.DisputeComponentRepository;
import com.incomm.cca.repository.DisputedTransactionRepository;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DisputeService {

    @Autowired
    private DisputeComponentRepository disputeRepository;
    @Autowired
    private DisputedTransactionRepository transactionRepository;
    @Autowired
    private IdentifierService identifierService;
    @Autowired
    private RequestService requestService;
    @Autowired
    private SessionService sessionService;

    public DisputeComponent findOne(Long id) {
        try {
            return disputeRepository.findById(id)
                                    .orElse(null);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve DisputeDetail")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public DisputeComponent findOne(DisputedTransaction request) {
        try {
            List<DisputeComponent> disputeComponents = disputeRepository.findByTransactionData(request.getTransactionId(), request.getDeliveryChannelCode(), request.getRequestCode(), request.getResponseCode(), request.getBusinessDate());
            if (!disputeComponents.isEmpty()) {
                return disputeComponents.get(0);
            } else {
                return null;
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve DisputeDetail")
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    //TODO Refactor raise dispute endpoint to take new DetailDispute object, with the APLS request created out of it
    //TODO Add storing the new DetailDispute ON APLS SUCCESS!
    //TODO Refactor the send dispute forms endpoint

    @Transactional
    public DisputeComponent create(DisputeComponent request) {
        try {
            request.setCreatedDate(new Date());
            disputeRepository.save(request);

            for (DisputedTransaction transaction : request.getTransactions()) {
                transaction.setDisputeComponent(request);
            }

            transactionRepository.saveAll(request.getTransactions());

            return request;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create dispute detail")
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    /**
     * Finds all disputed transactions for the given transactionIds. If a transaction has been disputed multiple times,
     * the first dispute is returned.
     *
     * @param transactionIds
     * @return The disputed transaction results by transaction ID
     */
    public Map<String, DisputedTransaction> findDisputedTransactions(List<String> transactionIds) {
        try {
            if (transactionIds.isEmpty()) {
                return Collections.emptyMap();
            } else {
                return transactionRepository.findByTransactionIdIn(transactionIds)
                                            .stream()
                                            .collect(Collectors.toMap(
                                                    DisputedTransaction::getTransactionId,
                                                    disputedTransaction -> disputedTransaction,
                                                    // TODO: support multiple disputes per transaction in the future?
                                                    (DisputedTransaction first, DisputedTransaction second) -> first
                                            ));
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve Disputed Transaction Details")
                        .keyValue("id", transactionIds)
                        .exception(e)
                        .build();
            throw e;
        }
    }

}
