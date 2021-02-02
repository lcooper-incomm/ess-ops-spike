package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.SessionComponent;
import com.incomm.cca.model.domain.session.SessionStatus;
import com.incomm.cca.model.domain.session.SessionType;
import com.incomm.cca.model.view.session.SessionTypeView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SessionTypeConverter {

    @Autowired
    private PermissionConverter permissionConverter;

    public List<SessionTypeView> convert(Collection<SessionType> request) {
        List<SessionTypeView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(sessionType -> views.add(this.convert(sessionType)));
        }

        return views;
    }

    public SessionTypeView convert(SessionType request) {
        SessionTypeView view = null;

        if (request != null) {
            view = new SessionTypeView();
            view.setName(request.getName());
            view.setPermission(permissionConverter.convertSimple(request.getPermission()));

            if (request.getComponents() != null) {
                view.getComponents()
                    .addAll(request.getComponents()
                                   .stream()
                                   .map(SessionComponent::getName)
                                   .collect(Collectors.toList()));
            }
            if (request.getStatuses() != null) {
                view.getStatuses()
                    .addAll(request.getStatuses()
                                   .stream()
                                   .map(SessionStatus::getName)
                                   .collect(Collectors.toList()));
            }
        }

        return view;
    }
}
