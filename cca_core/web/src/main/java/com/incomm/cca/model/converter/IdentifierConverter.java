package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.view.session.selection.IdentifierView;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class IdentifierConverter {

    public List<IdentifierView> convert(Collection<Identifier> request) {
        List<IdentifierView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(identifier -> views.add(this.convert(identifier)));
        }

        return views;
    }

    public IdentifierView convert(Identifier request) {
        IdentifierView view = null;

        if (request != null) {
            view = new IdentifierView();
            view.setId(request.getId());
            view.setValue(request.getValue());
            view.setType(request.getIdentifierType());
            view.setPartner(request.getPartner());
            view.setPlatform(request.getPlatform());
        }

        return view;
    }

    public List<Identifier> convertToModel(Collection<IdentifierView> request) {
        List<Identifier> models = new ArrayList<>();

        if (request != null) {
            request.forEach(identifier -> models.add(this.convert(identifier)));
        }

        return models;
    }

    public Identifier convert(IdentifierView request) {
        Identifier model = null;

        if (request != null) {
            model = new Identifier();
            model.setId(request.getId());
            model.setValue(request.getValue());
            model.setIdentifierType(request.getType());
            model.setPartner(request.getPartner());

            if (request.getPlatform() != null) {
                model.setPlatform(request.getPlatform());
            }
        }

        return model;
    }
}
