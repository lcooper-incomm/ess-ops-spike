package com.incomm.cca.model.view.session.dispute;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.mapping.ActionReasonCodeMappingView;
import com.incomm.cca.model.view.session.selection.IdentifierView;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DisputeComponentView implements Serializable {

    private Long id;
    private IdentifierView identifier;
    private String deliveryMethod;
    private ActionReasonCodeMappingView reasonCode;
    private String externalReasonCode;
    private List<DisputeProbingQuestionView> probingQuestions = new ArrayList<>();
    private List<DisputeTransactionView> transactions = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public IdentifierView getIdentifier() {
        return identifier;
    }

    public void setIdentifier(IdentifierView identifier) {
        this.identifier = identifier;
    }

    public String getDeliveryMethod() {
        return deliveryMethod;
    }

    public void setDeliveryMethod(final String deliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }

    public ActionReasonCodeMappingView getReasonCode() {
        return reasonCode;
    }

    public void setReasonCode(ActionReasonCodeMappingView reasonCode) {
        this.reasonCode = reasonCode;
    }

    public String getExternalReasonCode() {
        return externalReasonCode;
    }

    public void setExternalReasonCode(String externalReasonCode) {
        this.externalReasonCode = externalReasonCode;
    }

    public List<DisputeProbingQuestionView> getProbingQuestions() {
        return probingQuestions;
    }

    public void setProbingQuestions(final List<DisputeProbingQuestionView> probingQuestions) {
        this.probingQuestions = probingQuestions;
    }

    public List<DisputeTransactionView> getTransactions() {
        return transactions;
    }

    public void setTransactions(final List<DisputeTransactionView> transactions) {
        this.transactions = transactions;
    }
}
