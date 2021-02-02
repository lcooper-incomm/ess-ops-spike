package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.auth.Role;
import com.incomm.cca.model.view.auth.RoleView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleConverter {

    @Autowired
    private GroupConverter groupConverter;
    @Autowired
    private PermissionConverter permissionConverter;
    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;

    public List<RoleView> convert(Collection<Role> request) {
        List<RoleView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(role -> views.add(this.convertSimple(role)));
        }

        return views;
    }

    public RoleView convert(Role request) {
        RoleView view = null;

        if (request != null) {
            view = this.convertSimple(request);
            view.setCreatedBy(userConverter.convertSimple(request.getCreatedBy()));
            view.setCreatedDate(timestampConverter.convert(request.getCreatedDate()));
            view.setGroup(groupConverter.convertSimple(request.getGroup()));
            view.setModifiedBy(userConverter.convertSimple(request.getModifiedBy()));
            view.setModifiedDate(timestampConverter.convert(request.getCreatedDate()));

            view.setAdmins(userConverter.convert(request.getAdmins()));
            view.setMembers(userConverter.convert(request.getMembers()));
            view.setPermissions(permissionConverter.convert(request.getPermissions()));

            //Hide cca_admin from UI
            view.setAdmins(view.getAdmins()
                               .stream()
                               .filter(userView -> !userView.getUsername()
                                                            .equalsIgnoreCase("cca_admin"))
                               .collect(Collectors.toList()));
            view.setMembers(view.getMembers()
                                .stream()
                                .filter(userView -> !userView.getUsername()
                                                             .equalsIgnoreCase("cca_admin"))
                                .collect(Collectors.toList()));
        }

        return view;
    }

    public RoleView convertSimple(Role request) {
        RoleView view = null;

        if (request != null) {
            view = new RoleView();
            view.setId(request.getId());
            view.setDescription(request.getDescription());
            view.setDisplayName(request.getDisplayName());
            view.setIsActive(request.getActive());
            view.setIsLocked(request.getLocked());
            view.setSystemName(request.getSystemName());
        }

        return view;
    }
}
