package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.SessionClass;
import com.incomm.cca.model.view.session.SessionClassView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class SessionClassConverter {

    @Autowired
    private SessionTypeConverter sessionTypeConverter;

    public List<SessionClassView> convert(Collection<SessionClass> request) {
        List<SessionClassView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(sessionClass -> views.add(this.convert(sessionClass)));
        }

        return views;
    }

    public SessionClassView convert(SessionClass request) {
        SessionClassView view = null;

        if (request != null) {
            view = new SessionClassView();
            view.setName(request.getName());
            view.setSessionTypes(sessionTypeConverter.convert(request.getSessionTypes()));
        }

        return view;
    }
}
