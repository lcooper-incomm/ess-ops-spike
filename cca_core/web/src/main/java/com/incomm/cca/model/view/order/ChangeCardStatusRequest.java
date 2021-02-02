package com.incomm.cca.model.view.order;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.maples.model.response.order.item.OrderItemCard;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ChangeCardStatusRequest {

    private Long orderId;
    private String orderNumber;
    private String partner;
    private String platform;
    private String reason;
    private String targetStatus;
    private List<OrderItemCard> cards = new ArrayList<>();

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(final Long orderId) {
        this.orderId = orderId;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(final String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getPartner() {
        return partner;
    }

    public void setPartner(final String partner) {
        this.partner = partner;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(final String platform) {
        this.platform = platform;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(final String reason) {
        this.reason = reason;
    }

    public String getTargetStatus() {
        return targetStatus;
    }

    public void setTargetStatus(final String targetStatus) {
        this.targetStatus = targetStatus;
    }

    public List<OrderItemCard> getCards() {
        return cards;
    }

    public void setCards(final List<OrderItemCard> cards) {
        this.cards = cards;
    }
}
