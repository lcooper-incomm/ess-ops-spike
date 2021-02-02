package com.incomm.cca.model.view.order;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.maples.model.response.order.Order;
import com.incomm.cscore.client.maples.model.response.order.item.OrderItem;
import com.incomm.cscore.client.maples.model.response.order.item.OrderItemCard;
import com.incomm.cscore.client.maples.model.response.order.shipment.OrderShipment;

import java.util.ArrayList;
import java.util.List;

/**
 * Since we can't just, for example, add a list of Item from the order items endpoint into an order
 * from the order endpoint, we have to create our own little container to manage all this in...
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderContainer {

    private Order order;
    private List<OrderItem> items = new ArrayList<>();
    private List<OrderItemCard> cards = new ArrayList<>();
    private List<OrderShipment> shipments = new ArrayList<>();

    public Order getOrder() {
        return order;
    }

    public void setOrder(final Order order) {
        this.order = order;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(final List<OrderItem> items) {
        this.items = items;
    }

    public List<OrderItemCard> getCards() {
        return cards;
    }

    public void setCards(final List<OrderItemCard> cards) {
        this.cards = cards;
    }

    public List<OrderShipment> getShipments() {
        return shipments;
    }

    public void setShipments(final List<OrderShipment> shipments) {
        this.shipments = shipments;
    }
}
