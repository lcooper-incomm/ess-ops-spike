package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.VmsProductType;
import com.incomm.cca.model.view.external.vms.VmsProductTypeView;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VmsProductTypeConverter {

    public List<VmsProductTypeView> convert(List<VmsProductType> request) {
        List<VmsProductTypeView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(type -> views.add(this.convert(type)));
        }

        return views;
    }

    public VmsProductTypeView convert(VmsProductType request) {
        VmsProductTypeView view = null;

        if (request != null) {
            view = new VmsProductTypeView();
            view.setId(request.getId());
            view.setIsEnabled(request.getEnabled());
            view.setName(request.getName());
            view.setVmsId(request.getVmsId());
        }

        return view;
    }
}
