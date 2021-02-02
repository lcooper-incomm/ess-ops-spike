package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.LawEnforcementComponent;
import com.incomm.cca.model.view.session.LawEnforcementComponentView;
import org.springframework.stereotype.Service;

@Service
public class LawEnforcementComponentConverter {

    public LawEnforcementComponentView convert(LawEnforcementComponent request) {
        LawEnforcementComponentView view = null;

        if (request != null) {
            view = new LawEnforcementComponentView();
            view.setId(request.getId());
            view.setAgency(request.getAgency());
            view.setBadgeNumber(request.getBadgeNumber());
            view.setCaseNumber(request.getCaseNumber());
        }

        return view;
    }
}
