package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.mapping.ActionReasonCodeMapping;
import com.incomm.cca.model.view.mapping.ActionReasonCodeMappingView;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MappingConverter {

    public List<ActionReasonCodeMappingView> convertActionReasonCodeMappings(List<ActionReasonCodeMapping> request) {
        List<ActionReasonCodeMappingView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(mapping -> {
                ActionReasonCodeMappingView view = this.convertActionReasonCodeMapping(mapping);
                if (view != null) {
                    views.add(view);
                }
            });
        }

        return views;
    }

    public ActionReasonCodeMappingView convertActionReasonCodeMapping(ActionReasonCodeMapping request) {
        ActionReasonCodeMappingView view = null;

        if (request != null) {
            view = new ActionReasonCodeMappingView();
            view.setId(request.getId());
            view.setIsActive(request.getIsActive());
            view.setCode(request.getCode());
            view.setDisplayValue(request.getDisplayValue());
            view.setPlatform(request.getPlatform());
            view.setPlatformCode(request.getPlatformCode());
            view.setType(request.getType());
        }

        return view;
    }
}
