package com.incomm.cca.model.view.order;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderSearchRequest implements Serializable {

    private String cardNumber;
    private String email;
    private String firstName;
    private String lastFour;
    private String lastName;
    private String orderId;
    private String orderNumber;
    private String quoteId;
    private String recipientAddressLine1;
    private String recipientEmail;
    private String recipientFirstName;
    private String recipientLastName;
    private String serialNumber;
    private String shipmentId;
    private String correlationId;
    private String customerNumber;

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(final String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(final String firstName) {
        this.firstName = firstName;
    }

    public String getLastFour() {
        return lastFour;
    }

    public void setLastFour(final String lastFour) {
        this.lastFour = lastFour;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(final String lastName) {
        this.lastName = lastName;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(final String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(final String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(final String orderId) {
        this.orderId = orderId;
    }

    public String getQuoteId() {
        return quoteId;
    }

    public void setQuoteId(String quoteId) {
        this.quoteId = quoteId;
    }

    public String getShipmentId() {
        return shipmentId;
    }

    public void setShipmentId(final String shipmentId) {
        this.shipmentId = shipmentId;
    }

    public String getRecipientAddressLine1() {
        return recipientAddressLine1;
    }

    public void setRecipientAddressLine1(final String recipientAddressLine1) {
        this.recipientAddressLine1 = recipientAddressLine1;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(final String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public String getRecipientFirstName() {
        return recipientFirstName;
    }

    public void setRecipientFirstName(final String recipientFirstName) {
        this.recipientFirstName = recipientFirstName;
    }

    public String getRecipientLastName() {
        return recipientLastName;
    }

    public void setRecipientLastName(final String recipientLastName) {
        this.recipientLastName = recipientLastName;
    }

    public String getCorrelationId() { return correlationId; }

    public void setCorrelationId(String correlationId) { this.correlationId = correlationId; }

    public String getCustomerNumber() {
        return customerNumber;
    }

    public void setCustomerNumber(String customerNumber) {
        this.customerNumber = customerNumber;
    }
}
