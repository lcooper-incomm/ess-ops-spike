package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.model.domain.session.WorkspaceSelection;
import com.incomm.cca.model.view.session.selection.SelectionView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class SelectionConverter {

    @Autowired
    private IdentifierConverter identifierConverter;
    @Autowired
    private PartnerConverter partnerConverter;

    public List<SelectionView> convert(Collection<Selection> request) {
        List<SelectionView> views = new ArrayList<>();

        if (request != null) {
            request.stream()
                   .filter(selection -> selection.getDeletedDate() == null)
                   .forEach(selection -> views.add(this.convert(selection)));
        }

        return views;
    }

    public SelectionView convert(Selection request) {
        SelectionView view = null;

        if (request != null) {
            view = this.convertSimple(request);
            view.getIdentifiers()
                .addAll(identifierConverter.convert(request.getIdentifiers()));
        }

        return view;
    }

    public Selection convert(SelectionView request) {
        Selection model = null;

        if (request != null) {
            model = new Selection();
            model.setId(request.getId());
            model.setDescription(request.getDescription());
            model.setExternalSessionId(request.getExternalSessionId());
            model.setPartner(partnerConverter.convert(request.getPartner()));
            model.setPlatform(request.getPlatform());
            model.setSimplePartner(request.getSimplePartner());
            model.setType(request.getType());
            model.getIdentifiers()
                 .addAll(identifierConverter.convertToModel(request.getIdentifiers()));
        }

        return model;
    }

    public SelectionView convertSimple(Selection request) {
        SelectionView view = null;

        if (request != null) {
            view = new SelectionView();
            view.setId(request.getId());
            view.setDescription(request.getDescription());
            view.setExternalSessionId(request.getExternalSessionId());
            view.setPartner(partnerConverter.convert(request.getPartner()));
            view.setPlatform(request.getPlatform());
            view.setSimplePartner(request.getSimplePartner());
            view.setType(request.getType());
        }

        return view;
    }

    public List<SelectionView> convertForWorkspace(Collection<WorkspaceSelection> request) {
        List<SelectionView> views = new ArrayList<>();

        if (request != null) {
            request.stream()
                   .filter(selection -> selection.getDeletedDate() == null)
                   .forEach(selection -> views.add(this.convert(selection)));
        }

        return views;
    }

    public SelectionView convert(WorkspaceSelection request) {
        SelectionView view = null;

        if (request != null) {
            view = new SelectionView();
            view.setId(request.getId());
            view.setPlatform(request.getPlatform());
            view.setType(request.getType());
        }

        return view;
    }
}
