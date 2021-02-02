package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.VmsProductCode;
import com.incomm.cca.model.view.external.vms.VmsProductCodeView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class VmsProductCodeConverter {

    @Autowired
    private PartnerConverter partnerConverter;
    @Autowired
    private VmsProductTypeConverter productTypeConverter;

    public List<VmsProductCodeView> convert(Collection<VmsProductCode> request) {
        List<VmsProductCodeView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(code -> views.add(this.convert(code)));
        }

        return views;
    }

    public VmsProductCodeView convert(VmsProductCode request) {
        VmsProductCodeView view = null;

        if (request != null) {
            view = new VmsProductCodeView();
            view.setId(request.getId());
            view.setCode(request.getCode());
            view.setName(request.getName());
            view.setPartner(partnerConverter.convert(request.getPartner()));
            view.setVmsId(request.getVmsId());
            view.getTypes()
                .addAll(productTypeConverter.convert(request.getTypes()));
        }

        return view;
    }
}
