package com.incomm.cca.model.domain.session.dispute;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.incomm.apls.model.requests.DisputeTransactionsRequest;
import com.incomm.apls.model.support.DisputeTransaction;
import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.domain.mapping.ActionReasonCodeMapping;
import com.incomm.cca.model.domain.session.Session;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table
public class DisputeComponent implements Serializable {

    private Long id;
    private Session session;
    private Identifier identifier;
    private String deliveryMethod;
    private Date createdDate;
    private String comment;
    private ActionReasonCodeMapping reasonCode;
    private String externalReasonCode;
    private List<DisputeProbingQuestion> probingQuestions = new ArrayList<>();
	private List<DisputedTransaction> transactions = new ArrayList<>();

    @PrePersist
    protected void prePersist() {
        this.createdDate = new Date();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonIgnore
    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "session_id")
    public Session getSession() {
        return session;
    }

    public void setSession(final Session session) {
        this.session = session;
    }

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "identifier_id")
    public Identifier getIdentifier() {
        return identifier;
    }

    public void setIdentifier(Identifier identifier) {
        this.identifier = identifier;
    }

    public String getDeliveryMethod() {
        return deliveryMethod;
    }

    public void setDeliveryMethod(String deliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

	@OneToMany(mappedBy = "disputeComponent", cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	public List<DisputedTransaction> getTransactions() {
        return transactions;
    }

	public void setTransactions(List<DisputedTransaction> transactions) {
        this.transactions = transactions;
    }

    @Transient
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @OneToMany(mappedBy = "disputeComponent", cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    public List<DisputeProbingQuestion> getProbingQuestions() {
        return probingQuestions;
    }

    public void setProbingQuestions(final List<DisputeProbingQuestion> probingQuestions) {
        this.probingQuestions = probingQuestions;
    }

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "reason_code_id")
    public ActionReasonCodeMapping getReasonCode() {
        return reasonCode;
    }

    public void setReasonCode(ActionReasonCodeMapping reasonCode) {
        this.reasonCode = reasonCode;
    }

    public String getExternalReasonCode() {
        return externalReasonCode;
    }

    public void setExternalReasonCode(String externalReasonCode) {
        this.externalReasonCode = externalReasonCode;
    }

    @Transient
    public DisputeTransactionsRequest toAplsRequest() {
        DisputeTransactionsRequest request = new DisputeTransactionsRequest();
        request.setDisputeTransactions(new ArrayList<>());
        request.setComment(this.comment);
        request.setDeliveryMethod(this.deliveryMethod);

		for (DisputedTransaction transaction : this.transactions) {
            DisputeTransaction disputeTransaction = new DisputeTransaction();
            disputeTransaction.setTransactionId(transaction.getTransactionId());
            disputeTransaction.setDeliveryChannelCode(transaction.getDeliveryChannelCode());
            disputeTransaction.setRequestCode(transaction.getRequestCode());
            disputeTransaction.setResponseCode(transaction.getResponseCode());
            disputeTransaction.setDate(transaction.getBusinessDate() != null ? LocalDateTime.ofInstant(transaction.getBusinessDate()
                                                                                                                  .toInstant(), ZoneId.systemDefault()) : null);
            disputeTransaction.setReason(this.getReasonCode().getPlatformCode());

            request.getDisputeTransactions()
                   .add(disputeTransaction);
        }

        return request;
    }

}
