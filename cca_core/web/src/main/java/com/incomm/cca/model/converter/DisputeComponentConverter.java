package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.dispute.DisputeComponent;
import com.incomm.cca.model.domain.session.dispute.DisputeProbingQuestion;
import com.incomm.cca.model.domain.session.dispute.DisputedTransaction;
import com.incomm.cca.model.view.session.dispute.DisputeComponentView;
import com.incomm.cca.model.view.session.dispute.DisputeProbingQuestionView;
import com.incomm.cca.model.view.session.dispute.DisputeTransactionView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import com.incomm.cscore.gringotts.GringottsExchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DisputeComponentConverter {

    @Autowired
    private MappingConverter mappingConverter;
    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;
    @Autowired
    private IdentifierConverter identifierConverter;

    public DisputeComponentView convert(DisputeComponent request) {
        DisputeComponentView view = null;

        if (request != null) {
            view = new DisputeComponentView();
            view.setId(request.getId());
            view.setIdentifier(identifierConverter.convert(request.getIdentifier()));
            view.setDeliveryMethod(request.getDeliveryMethod());
            view.setReasonCode(this.mappingConverter.convertActionReasonCodeMapping(request.getReasonCode()));
            view.setExternalReasonCode(request.getExternalReasonCode());
            view.setProbingQuestions(this.convertProbingQuestions(request.getProbingQuestions()));
            view.setTransactions(this.convertTransactions(request.getTransactions()));
        }

        return view;
    }

    private List<DisputeProbingQuestionView> convertProbingQuestions(List<DisputeProbingQuestion> request) {
        List<DisputeProbingQuestionView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(question -> {
                DisputeProbingQuestionView view = this.convertProbingQuestion(question);
                if (view != null) {
                    views.add(view);
                }
            });
        }

        return views;
    }

    private List<DisputeTransactionView> convertTransactions(List<DisputedTransaction> request) {
        List<DisputeTransactionView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(transaction -> {
                DisputeTransactionView view = this.convertTransaction(transaction);
                if (view != null) {
                    views.add(view);
                }
            });
        }

        return views;
    }

    private DisputeProbingQuestionView convertProbingQuestion(DisputeProbingQuestion request) {
        DisputeProbingQuestionView view = null;

        if (request != null) {
            view = new DisputeProbingQuestionView();
            view.setId(request.getId());
            view.setCreatedBy(this.userConverter.convertSimple(request.getCreatedBy()));
            view.setQuestion(request.getQuestion());
            view.setAnswer(request.getAnswer());
        }

        return view;
    }

    public DisputeTransactionView convertTransaction(DisputedTransaction request) {
        DisputeTransactionView view = null;

        if (request != null) {
            view = new DisputeTransactionView();
            view.setId(request.getId());
            view.setAmount(GringottsExchange.quickExchange(request.getAmount()));
            view.setBusinessDate(this.timestampConverter.convert(request.getBusinessDate()));
            view.setCardNumber(request.getCardNumber());
            view.setDeliveryChannelCode(request.getDeliveryChannelCode());
            view.setMerchantName(request.getMerchantName());
            view.setRequest(request.getRequest());
            view.setRequestCode(request.getRequestCode());
            view.setResponse(request.getResponse());
            view.setResponseCode(request.getResponseCode());
            view.setTransactionId(request.getTransactionId());
            view.setSourceRefNum(request.getSourceRefNum());
            view.setDisputeId(request.getDisputeId());
        }

        return view;
    }
}
