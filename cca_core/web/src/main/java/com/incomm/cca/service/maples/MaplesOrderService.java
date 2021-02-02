package com.incomm.cca.service.maples;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.AuditActivityType;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.domain.order.OrderRelatedJob;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.order.ChangeCardStatusRequest;
import com.incomm.cca.service.AuditService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cscore.client.maples.CsCoreMaplesOrderClient;
import com.incomm.cscore.client.maples.constant.MaplesPlatform;
import com.incomm.cscore.client.maples.model.request.MaplesRequestSupport;
import com.incomm.cscore.client.maples.model.request.order.CancelOrderRequest;
import com.incomm.cscore.client.maples.model.request.order.HoldOrderRequest;
import com.incomm.cscore.client.maples.model.request.order.OrderQuery;
import com.incomm.cscore.client.maples.model.request.order.RefundOrderRequest;
import com.incomm.cscore.client.maples.model.request.order.ResendEmailRequest;
import com.incomm.cscore.client.maples.model.response.order.Order;
import com.incomm.cscore.client.maples.model.response.order.OrderActionResponse;
import com.incomm.cscore.client.maples.model.response.order.OrderResponse;
import com.incomm.cscore.client.maples.model.response.order.item.OrderItem;
import com.incomm.cscore.client.maples.model.response.order.item.OrderItemResponse;
import com.incomm.cscore.client.maples.model.response.order.notification.ResendDeliveryEmailResponse;
import com.incomm.cscore.client.maples.model.response.order.shipment.OrderShipment;
import com.incomm.cscore.client.maples.model.response.order.shipment.OrderShipmentResponse;
import com.incomm.cscore.client.maples.model.response.order.transaction.OrderTransaction;
import com.incomm.cscore.client.maples.model.response.order.transaction.OrderTransactionsResponse;
import com.incomm.cscore.client.rest.CsCoreResponseException;
import com.incomm.cscore.client.rest.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class MaplesOrderService {

    @Autowired
    private AuditService auditService;
    @Autowired
    private MaplesOrderCancellationSupportService cancellationSupportService;
    @Autowired
    private CsCoreMaplesOrderClient orderClient;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private MaplesRequestSupportService supportService;

    public void cancelOne(String orderId, CancelOrderRequest request) {
        securityService.validateHasPermission(ManagedPermission.CANCEL_ORDER);
        orderClient.cancelOrder(orderId, request, this.supportService.defaultSupport());
    }

    public List<OrderItem> findAllItems(String orderId) {
        MaplesRequestSupport support = this.supportService.defaultSupport();
        this.validateSearchPermission(support);

        Response<OrderItemResponse> response = null;

        try {
            response = orderClient.findAllItemsByOrderId(orderId, support);
        } catch (CsCoreResponseException e) {
            response = (Response<OrderItemResponse>) e.getResponse();
            if (response.getStatus() != 206) {
                throw e;
            }
        }

        return response.getBody()
                       .getItems();
    }

    public List<OrderShipment> findAllShipments(String orderId) {
        MaplesRequestSupport support = this.supportService.defaultSupport();
        this.validateSearchPermission(support);

        Response<OrderShipmentResponse> response = null;
        try {
            response = orderClient.findAllShipmentsByOrderId(orderId, support);
        } catch (CsCoreResponseException e) {
            response = (Response<OrderShipmentResponse>) e.getResponse();
            if (response.getStatus() != 206) {
                throw e;
            }
        }
        List<OrderShipment> results = new ArrayList<>();
        if (response.getStatus() != 204) {
            results.addAll(response.getBody()
                                   .getShipments());
        }

        return results;
    }

    public Order findOne(String id) {
        MaplesRequestSupport support = this.supportService.defaultSupport();
        this.validateSearchPermission(support);

        if (support.getPlatform() == MaplesPlatform.ALDER )
        {
            OrderQuery orderQuery = new OrderQuery();
            Order order = null;
            orderQuery.setOrderNumber(id);
            Response<OrderResponse> response = orderClient.search(orderQuery, support);
            if (response.getBody() != null) {
                order = response.getBody()
                                .getOrders().get(0);
            }

            return filterOrderData(order);
        } else {
            Response<Order> response = orderClient.findOneByOrderId(id, support);
            return filterOrderData(response.getBody());
        }
    }

    public List<OrderTransaction> findAllOrderTransactions(String orderId) {
        MaplesRequestSupport support = this.supportService.defaultSupport();
        this.validateSearchPermission(support);

        Response<OrderTransactionsResponse> response = orderClient.findAllTransactionsByOrderId(orderId, support);
        return response.getBody()
                       .getTransactions();
    }

    public void holdOne(String orderId, HoldOrderRequest request) {
        securityService.validateHasPermission(ManagedPermission.HOLD_ORDER);
        orderClient.holdOrder(orderId, request, this.supportService.defaultSupport());
    }

    /**
     * Submits a job to MINION that changes card statuses to 'CLOSED' and performs a balance adjustment on all cards to
     * reduce their balance to zero.
     *
     * @param request
     */
	public OrderRelatedJob prepareCardsForCancellation(ChangeCardStatusRequest request) {
        securityService.validateHasPermission(ManagedPermission.CANCEL_ORDER_WITH_REFUND);
        return cancellationSupportService.submitCancellationPreparationJobForOrder(request);
    }

    public OrderActionResponse calculateRefund(String orderId, RefundOrderRequest request) {
        securityService.validateHasAnyPermission(ManagedPermission.CANCEL_ORDER, ManagedPermission.CANCEL_ORDER_WITH_REFUND);
        return orderClient.calculateRefundOrder(orderId, request, this.supportService.defaultSupport()).getBody();
    }

    public void refundOne(String orderId, RefundOrderRequest request) {
        securityService.validateHasAnyPermission(ManagedPermission.CANCEL_ORDER, ManagedPermission.CANCEL_ORDER_WITH_REFUND);
        orderClient.refundOrder(orderId, request, this.supportService.defaultSupport());
    }

    public OrderActionResponse resendEmail(String emailRefId, ResendEmailRequest request) {
        securityService.validateHasAnyPermission(ManagedPermission.RESEND_ORDER_NOTIFICATION);

        return orderClient.resendEmail(emailRefId, request, this.supportService.defaultSupport()).getBody();
    }

    public ResendDeliveryEmailResponse resendDeliveryEmail(String orderNumber) {
        AuditActivity auditActivity = this.auditService.createActivity(AuditActivityType.RESEND_DELIVERY);

        try {
            this.securityService.validateHasPermission(ManagedPermission.RESEND_DELIVERY);
            MaplesRequestSupport support = this.supportService.defaultSupport();
            Response<ResendDeliveryEmailResponse> response = this.orderClient.resendDeliveryEmail(orderNumber, support);

            this.auditService.saveRecordAsSuccess(auditActivity);

            return response.getBody();
        } catch (Exception e) {
            this.auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    public void resumeOne(String orderId, HoldOrderRequest request) {
        securityService.validateHasPermission(ManagedPermission.UNHOLD_ORDER);
        orderClient.resumeOrder(orderId, request, this.supportService.defaultSupport());
    }

    public List<Order> search(OrderQuery request) {
        MaplesRequestSupport support = this.supportService.defaultSupport();
        this.validateSearchPermission(support);

        Response<OrderResponse> response = orderClient.search(request, support);
        List<Order> orders = new ArrayList<>();

        if (response.getBody() != null) {
            orders.addAll(response.getBody()
                                  .getOrders());
        }

        orders.forEach(this::filterOrderData);

        return orders;
    }

    private Order filterOrderData(Order order) {
        if (!securityService.hasPermission(ManagedPermission.VIEW_SENSITIVE_ORDER_INFORMATION)
                && order.getPayment() != null) {
            order.getPayment()
                 .setReason(null);
        }
        return order;
    }

    private void validateSearchPermission(MaplesRequestSupport support) {
        switch (support.getPlatform()) {
            case ALDER:
                securityService.validateHasPermission(ManagedPermission.SEARCH_BY_ALDER_ORDER);
                break;
            case ECOMM:
                securityService.validateHasPermission(ManagedPermission.SEARCH_BY_ECOMM_ORDER);
                break;
            case ENCOR:
                break;
            case BOL:
                switch (support.getPartner()) {
                    case AXBOL:
                        securityService.validateHasPermission(ManagedPermission.SEARCH_BY_AMEX_BOL);
                        break;
                    case MBOL:
                        securityService.validateHasPermission(ManagedPermission.SEARCH_BY_MASTERCARD_BOL);
                        break;
                    case VANILLA:
                        securityService.validateHasPermission(ManagedPermission.SEARCH_BY_VANILLA_BOL);
                        break;
                    case WALMART:
                        securityService.validateHasPermission(ManagedPermission.SEARCH_BY_WALMART_BOL);
                        break;
                    default:
                        throw new SecurityViolationException();
                }
                break;
            default:
                throw new SecurityViolationException();
        }
    }

}
