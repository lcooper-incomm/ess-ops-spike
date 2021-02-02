package com.incomm.cca.controller.order;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.OrderRelatedJobConverter;
import com.incomm.cca.model.domain.order.OrderRelatedJob;
import com.incomm.cca.model.view.order.ChangeCardStatusRequest;
import com.incomm.cca.model.view.order.OrderRelatedJobView;
import com.incomm.cca.model.view.order.OrderSearchRequest;
import com.incomm.cca.service.maples.MaplesOrderService;
import com.incomm.cca.service.maples.MaplesRequestSupportService;
import com.incomm.cscore.client.maples.constant.MaplesPlatform;
import com.incomm.cca.service.order.OrderRelatedJobService;
import com.incomm.cscore.client.maples.model.request.order.CancelOrderRequest;
import com.incomm.cscore.client.maples.model.request.order.HoldOrderRequest;
import com.incomm.cscore.client.maples.model.request.order.OrderQuery;
import com.incomm.cscore.client.maples.model.request.order.RefundOrderRequest;
import com.incomm.cscore.client.maples.model.request.order.ResendEmailRequest;
import com.incomm.cscore.client.maples.model.response.order.Order;
import com.incomm.cscore.client.maples.model.response.order.item.OrderItem;
import com.incomm.cscore.client.maples.model.response.order.notification.ResendDeliveryEmailResponse;
import com.incomm.cscore.client.maples.model.response.order.shipment.OrderShipment;
import com.incomm.cscore.client.maples.model.response.order.transaction.OrderTransaction;
import com.incomm.cscore.client.rest.CsCoreResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/rest/order")
public class OrderController extends RestResponseHandler {

    @Autowired
	private OrderRelatedJobConverter jobConverter;
    @Autowired
    private MaplesOrderService maplesOrderService;
    @Autowired
    private OrderRelatedJobService relatedJobService;
    @Autowired
    private MaplesRequestSupportService supportService;

    @PutMapping(value = "/{id}/cancel")
    public ResponseEntity cancelOne(@PathVariable("id") String id, @RequestBody(required = false) CancelOrderRequest request) {
        maplesOrderService.cancelOne(id, request);
        return noContent();
    }

    @PutMapping(value = "/{id}/card/status")
    public ResponseEntity changeCardStatus(@PathVariable("id") String id, @RequestBody ChangeCardStatusRequest request) {
        // TODO: this logic should be moved to the service, once we determine what the common response model should be
        if (request.getTargetStatus()
                   .equalsIgnoreCase("CLOSED")) {
			OrderRelatedJob response = maplesOrderService.prepareCardsForCancellation(request);
			return ok(jobConverter.convert(response));
        } else {
            return badRequest("Only 'CLOSED' target status is currently supported");
        }
    }

	@GetMapping(value = "/{id}/related-job")
	public ResponseEntity findAllRelatedJobs(@PathVariable("id") Long id) {
		List<OrderRelatedJobView> jobs = relatedJobService.findAllByOrderId(id);
		return ok(jobs);
    }

    @GetMapping(value = "/{id}/item")
    public ResponseEntity findAllItems(@PathVariable("id") String id) {
        List<OrderItem> items = maplesOrderService.findAllItems(id);
        return ok(items);
    }

    @PostMapping(value = "/{number}/notifications/resend-delivery-email")
    public ResponseEntity resendDeliveryEmail(@PathVariable("number") String number) {
        ResendDeliveryEmailResponse content = maplesOrderService.resendDeliveryEmail(number);
        return ok(content);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity findOne(@PathVariable("id") String id) {
        Order order = maplesOrderService.findOne(id);
            if (order != null) {
            return ok(order);
        } else {
            return noContent();
        }
    }

    @GetMapping(value = "/{id}/transaction")
    public ResponseEntity findOneOrderTransaction(@PathVariable("id") String orderId) {
        List<OrderTransaction> transactions = null;
        try {
            transactions = maplesOrderService.findAllOrderTransactions(orderId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ok(transactions);
    }

    @GetMapping(value = "/{id}/shipment")
    public ResponseEntity findAllShipments(@PathVariable("id") String id) {
        List<OrderShipment> shipments = maplesOrderService.findAllShipments(id);
        return ok(shipments);
    }

    @PutMapping(value = "/{id}/hold")
    public ResponseEntity holdOne(@PathVariable("id") String id, @RequestBody(required = false) HoldOrderRequest request) {
        maplesOrderService.holdOne(id, request);
        return noContent();
    }

    @PostMapping(value = "/{id}/calculate-refund")
    public ResponseEntity calculateRefund(@PathVariable("id") String id, @RequestBody RefundOrderRequest request) {
        return ok(maplesOrderService.calculateRefund(id, request));
    }

    @PutMapping(value = "/{id}/refund")
    public ResponseEntity refundOne(@PathVariable("id") String id, @RequestBody RefundOrderRequest request) {
        maplesOrderService.refundOne(id, request);
        return noContent();
    }

    @PostMapping(value = "/search")
    public ResponseEntity search(@RequestBody OrderSearchRequest request) {
        List<Order> orders = new ArrayList<>();
        if (request.getOrderId() != null && this.supportService.defaultSupport().getPlatform() != MaplesPlatform.ALDER) {
            Order order = maplesOrderService.findOne(request.getOrderId());
            if (order != null) {
                orders.add(order);
            }
        } else {
            try {
                OrderQuery orderQuery = this.convertOrderSearchRequest(request);
                orders.addAll(maplesOrderService.search(orderQuery));
            } catch (CsCoreResponseException e) {
                // If no orders found for Encor, don't throw error.
                if (this.supportService.defaultSupport().getPlatform() == MaplesPlatform.ENCOR
                        && e.getMessage().contains("No orders found")) {
                    return ok(new ArrayList<>());
                } else {
                    throw e;
                }
            }
        }
        return ok(orders);
    }

    @PutMapping(value = "/{id}/resume")
    public ResponseEntity resumeOne(@PathVariable("id") String id, @RequestBody(required = false) HoldOrderRequest request) {
        maplesOrderService.resumeOne(id, request);
        return noContent();
    }

    @PostMapping(value = "/resend-email/{emailRefId}")
    public ResponseEntity resendEmail(@PathVariable("emailRefId") String emailRefId, @RequestBody ResendEmailRequest request) {
        return ok(maplesOrderService.resendEmail(emailRefId, request));
    }

    private OrderQuery convertOrderSearchRequest(OrderSearchRequest request) {
        OrderQuery query = new OrderQuery();
        query.setCardNumber(request.getCardNumber());
        query.setCustomerEmailAddress(request.getEmail());
        query.setCustomerFirstName(request.getFirstName());
        query.setCcLastFour(request.getLastFour());
        query.setCustomerLastName(request.getLastName());
        query.setCustomerNumber(request.getCustomerNumber());
        query.setOrderId(request.getOrderId());
        query.setOrderNumber(request.getOrderNumber());
        query.setQuoteId(request.getQuoteId());
        query.setRecipientAddressLine1(request.getRecipientAddressLine1());
        query.setRecipientEmailAddress(request.getRecipientEmail());
        query.setRecipientFirstName(request.getRecipientFirstName());
        query.setRecipientLastName(request.getRecipientLastName());
        query.setSerialNumber(request.getSerialNumber());
        query.setShipmentNumber(request.getShipmentId());
        query.setCorrelationId(request.getCorrelationId());

        return query;
    }
}
