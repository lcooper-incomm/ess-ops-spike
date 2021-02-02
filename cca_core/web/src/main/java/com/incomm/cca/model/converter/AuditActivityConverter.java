package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.domain.audit.AuditCardReplacementActivity;
import com.incomm.cca.model.view.PseudoHateoasView;
import com.incomm.cca.model.view.audit.AuditActivityRequestView;
import com.incomm.cca.model.view.audit.AuditActivityView;
import com.incomm.cca.model.view.audit.AuditCardReplacementActivityView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditActivityConverter {

    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;

    public AuditActivityView convert(AuditActivity request) {
        AuditActivityView view = null;

        if (request != null) {
            view = new AuditActivityView();
            view.setId(request.getId());
            view.setType(request.getType());
            view.setActivityDate(timestampConverter.convert(request.getActivityDate()));
            view.setResponseSuccessDate(timestampConverter.convert(request.getResponseSuccessDate()));
            view.setResponseFailureDate(timestampConverter.convert(request.getResponseFailureDate()));
            view.setClientIpAddress(request.getClientIpAddress());
            view.setUser(userConverter.convertSimple(request.getUser()));

            PseudoHateoasView sessionView = new PseudoHateoasView();
            sessionView.setId(request.getSessionId());
            if (request.getSessionId() != null) {
                sessionView.setUri(String.format("/rest/session/%d", request.getSessionId()));
            }
            view.setSession(sessionView);

            PseudoHateoasView selectionView = new PseudoHateoasView();
            selectionView.setId(request.getSelectionId());
            view.setSelection(selectionView);
        }

        return view;
    }

    public AuditActivity convert(AuditActivityRequestView request) {
        AuditActivity view = null;

        if (request != null) {
            view = new AuditActivity();
            view.setId(request.getId());
            view.setType(request.getType());
            view.setActivityDate(request.getActivityDate());
            view.setResponseSuccessDate(request.getResponseSuccessDate());
            view.setResponseFailureDate(request.getResponseFailureDate());
            view.setClientIpAddress(request.getClientIpAddress());
            view.setSessionId(request.getSessionId());
            view.setSelectionId(request.getSelectionId());
            view.setUser(request.getUser());
        }

        return view;
    }

    public AuditCardReplacementActivityView convert(AuditCardReplacementActivity request) {
        AuditCardReplacementActivityView view = null;

        if (request != null) {
            view = new AuditCardReplacementActivityView();
            view.setId(request.getId());
            view.setIdentifier(request.getIdentifier());
            view.setIdentifierType(request.getIdentifierType());
            view.setLastReplacedDate(timestampConverter.convert(request.getLastReplacedDate()));
            view.setPlatform(request.getPlatform());
        }

        return view;
    }
}
