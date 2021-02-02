package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.SessionQueue;
import com.incomm.cca.model.domain.SessionQueueSessionType;
import com.incomm.cca.model.domain.session.WorkspaceSessionQueue;
import com.incomm.cca.model.view.session.queue.SessionQueueView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QueueConverter {

    @Autowired
    private WrapUpCodeCategoryConverter categoryConverter;
    @Autowired
    private PermissionConverter permissionConverter;

    public List<SessionQueueView> convert(Collection<SessionQueue> request) {
        List<SessionQueueView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(sessionQueue -> views.add(this.convertSimple(sessionQueue)));
        }

        return views;
    }

    public SessionQueueView convert(SessionQueue request) {
        SessionQueueView view = null;

        if (request != null) {
            view = this.convertSimple(request);
            view.setCategories(categoryConverter.convert(request.getWrapUpCodeCategories()));

            if (!request.getSessionTypes()
                        .isEmpty()) {
                view.getSessionTypes()
                    .addAll(request.getSessionTypes()
                                   .stream()
                                   .map(SessionQueueSessionType::getSessionType)
                                   .collect(Collectors.toList()));
            }
        }

        return view;
    }

    public SessionQueueView convertSimple(SessionQueue request) {
        SessionQueueView view = null;

        if (request != null) {
            view = new SessionQueueView();
            view.setId(request.getId());
            view.setIsActive(request.getActive());
            view.setIsAutoCloseEnabled(request.getAutoclose());
            view.setAutoWrapTime(request.getAutoWrapTime());
            view.setDisplayName(request.getDisplayName());
            view.setSystemName(request.getSystemName());
            view.setI3Name(request.getI3Name());
            view.setIsLocked(request.getIsLocked());
            view.setRoboHelpId(request.getRobohelpId());
            view.setDefaultNote(request.getDefaultNote());
            view.setType(request.getType());
            view.setLocale(request.getLocale());
            view.setPermission(permissionConverter.convert(request.getPermission()));
        }

        return view;
    }

    public SessionQueueView convert(WorkspaceSessionQueue request) {
        SessionQueueView view = null;

        if (request != null) {
            view = new SessionQueueView();
            view.setId(request.getId());
            view.setDisplayName(request.getDisplayName());
            view.setSystemName(request.getSystemName());
        }

        return view;
    }

    public SessionQueue convert(SessionQueueView request) {
        SessionQueue view = null;

        if (request != null) {
            view = new SessionQueue();
            view.setId(request.getId());
            view.setActive(request.getIsActive());
            view.setAutoclose(request.getIsAutoCloseEnabled());
            view.setAutoWrapTime(request.getAutoWrapTime());
            view.setDisplayName(request.getDisplayName());
            view.setSystemName(request.getSystemName());
            view.setI3Name(request.getI3Name());
            view.setIsLocked(request.getIsLocked());
            view.setRobohelpId(request.getRoboHelpId());
            view.setDefaultNote(request.getDefaultNote());
            view.setType(request.getType());
            view.setLocale(request.getLocale());

            if (!request.getCategories()
                        .isEmpty()) {
                view.getWrapUpCodeCategories()
                    .addAll(this.categoryConverter.convertToDomain(request.getCategories()));
            }

            /**
             * By default, the session types is an empty array.  If you want to update the queue and pass in an empty
             * array of session types, it will delete them all.  If you want to update the queue without touching the
             * session types, pass in null.
             */
            if (request.getSessionTypes() == null) {
                view.setSessionTypes(null);
            } else if (request.getSessionTypes() != null && !request.getSessionTypes()
                        .isEmpty()) {
                for (String sessionType : request.getSessionTypes()) {
                    SessionQueueSessionType mapping = new SessionQueueSessionType();
                    mapping.setSessionQueue(view);
                    mapping.setSessionType(sessionType);
                    view.getSessionTypes()
                        .add(mapping);
                }
            }
        }

        return view;
    }
}
