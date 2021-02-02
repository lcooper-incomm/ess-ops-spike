package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.CallComponent;
import com.incomm.cca.model.domain.session.WorkspaceCallComponent;
import com.incomm.cca.model.view.session.CallComponentView;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CallComponentConverter {

    @Autowired
    private TimestampConverter timestampConverter;

    public CallComponentView convert(CallComponent request) {
        CallComponentView view = null;

        if (request != null) {
            view = new CallComponentView();
            view.setId(request.getId());
            view.setAccountNumber(request.getAccountNumber());
            view.setAni(request.getAni());
            view.setCallerName(request.getCallerName());
            view.setCallbackNumber(request.getCallbackNumber());
            view.setCallId(request.getCallId());
            view.setCallIdKey(request.getCallIdKey());
            view.setConnectedDate(timestampConverter.convert(request.getConnectedDate()));
            view.setCreatedDate(timestampConverter.convert(request.getCreatedDate()));
            view.setDisconnectedDate(timestampConverter.convert(request.getDisconnectedDate()));
            view.setDisconnectType(request.getDisconnectType());
            view.setDnis(request.getDnis());
            view.setLastFour(request.getLastFour());
            view.setOrderNumber(request.getOrderNumber());
            view.setOriginalAni(request.getOriginalAni());
            view.setOriginalDnis(request.getOriginalDnis());
            view.setPin(request.getPin());
            view.setPlatform(request.getPlatform());
            view.setProxyNumber(request.getProxyNumber());
            view.setSerialNumber(request.getSerialNumber());
            view.setUid(request.getUid());
            view.setAccountId(request.getAccountId());
            view.setIsCardVerified(request.getIsCardVerified());
            view.setIsDateOfBirthVerified(request.getIsDateOfBirthVerified());
            view.setIsLastFourSsnVerified(request.getIsLastFourSsnVerified());

        }

        return view;
    }

    public CallComponentView convert(WorkspaceCallComponent request) {
        CallComponentView view = null;

        if (request != null) {
            view = new CallComponentView();
            view.setId(request.getId());
            view.setCallerName(request.getCallerName());
            view.setConnectedDate(timestampConverter.convert(request.getConnectedDate()));
            view.setDisconnectedDate(timestampConverter.convert(request.getDisconnectedDate()));
            view.setUid(request.getUid());
        }

        return view;
    }
}
