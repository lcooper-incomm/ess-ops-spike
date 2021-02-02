package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.Partner;
import com.incomm.cca.model.view.session.selection.PartnerView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class PartnerConverter {

    @Autowired
    private PermissionConverter permissionConverter;

    public List<PartnerView> convert(Collection<Partner> request) {
        List<PartnerView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(partner -> views.add(this.convert(partner)));
        }

        return views;
    }

    public PartnerView convert(Partner request) {
        PartnerView view = null;

        if (request != null) {
            view = new PartnerView();
            view.setId(request.getId());
            view.setIvrDnis(request.getIvrDnis());
            view.setName(request.getName());
            view.setPermission(permissionConverter.convertSimple(request.getPermission()));
            view.setPlatform(request.getPlatform());
            view.setType(request.getType());
        }

        return view;
    }

    public Partner convert(PartnerView request) {
        Partner model = null;

        if (request != null) {
            model = new Partner();
            model.setId(request.getId());
            model.setIvrDnis(request.getIvrDnis());
            model.setName(request.getName());
            model.setPermission(permissionConverter.convertSimple(request.getPermission()));
            model.setType(request.getType());
        }

        return model;
    }
}
