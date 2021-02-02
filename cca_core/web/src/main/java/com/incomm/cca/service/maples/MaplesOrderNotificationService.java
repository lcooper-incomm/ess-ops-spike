package com.incomm.cca.service.maples;

import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.service.SecurityService;
import com.incomm.cscore.client.maples.CsCoreMaplesOrderClient;
import com.incomm.cscore.client.maples.model.response.order.notification.NotificationResponse;
import com.incomm.cscore.client.maples.model.response.order.notification.OrderNotification;
import com.incomm.cscore.client.rest.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaplesOrderNotificationService {

    @Autowired
    private MaplesRequestSupportService supportService;
    @Autowired
    private CsCoreMaplesOrderClient orderClient;
    @Autowired
    private SecurityService securityService;

    public OrderNotification findOne(Long notificationId) {
        securityService.validateHasPermission(ManagedPermission.SEARCH_BY_ECOMM_ORDER);
        Response<NotificationResponse> response = orderClient.findOneNotificationByNotificationId(notificationId, this.supportService.defaultSupport());
        return response.getBody() != null ? response.getBody()
                                                    .getNotification() : null;
    }

    public void resendOne(Long notificationId) {
        securityService.validateHasPermission(ManagedPermission.RESEND_ORDER_NOTIFICATION);
        orderClient.resendOrderNotification(notificationId, this.supportService.defaultSupport());
    }
}
