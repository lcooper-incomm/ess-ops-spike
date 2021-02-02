package com.incomm.cca.model.domain.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReceiptComponent implements Serializable {

    private Long id;
    private Session session;
    private String receiptId;
    private Date transactionDate;
    private String transactionTime;
    private String totalAmount;
    private String paymentMethod;
    private String transactionAmount;
    private List<ReceiptCard> cards = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "session_id")
    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public String getReceiptId() {
        return receiptId;
    }

    public void setReceiptId(String receiptId) {
        this.receiptId = receiptId;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(final String transactionTime) {
        this.transactionTime = transactionTime;
    }

    public String getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(String totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    @OneToMany(mappedBy = "receiptComponent", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    public List<ReceiptCard> getCards() {
        return cards;
    }

    public void setCards(List<ReceiptCard> cards) {
        this.cards = cards;
    }

    public String getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(final String transactionAmount) {
        this.transactionAmount = transactionAmount;
    }
}
