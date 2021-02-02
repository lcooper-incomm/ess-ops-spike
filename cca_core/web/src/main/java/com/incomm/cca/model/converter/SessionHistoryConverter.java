package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.SessionStatusHistory;
import com.incomm.cca.model.view.session.SessionHistoryItemType;
import com.incomm.cca.model.view.session.SessionHistoryItemView;
import com.incomm.cca.model.view.session.StatusChangeSessionHistoryItemView;
import com.incomm.cca.service.UserService;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionHistoryConverter {

    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;
    @Autowired
    private UserService userService;

    public SessionHistoryItemView convert(SessionStatusHistory statusHistory) {
        StatusChangeSessionHistoryItemView view = new StatusChangeSessionHistoryItemView();
        view.setDate(timestampConverter.convert(statusHistory.getCreatedDate()));
        view.setDescription("Session Status Change");
        view.setFromStatus(statusHistory.getFromStatus());
        view.setToStatus(statusHistory.getToStatus());
        view.setType(SessionHistoryItemType.STATUS_CHANGE);
        view.setUser(userConverter.convert(userService.findOne(statusHistory.getUserId())));
        return view;
    }
}
