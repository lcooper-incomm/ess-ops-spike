package com.incomm.cca.controller.order;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.service.maples.MaplesOrderNotificationService;
import com.incomm.cscore.client.maples.model.response.order.notification.OrderNotification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/order/notification")
public class OrderNotificationController extends RestResponseHandler {

    @Autowired
    private MaplesOrderNotificationService notificationService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        OrderNotification content = notificationService.findOne(id);
        if (content != null) {
            return ok(content);
        } else {
            return noContent();
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void resendOne(@PathVariable("id") Long id) {
        notificationService.resendOne(id);
    }
}
