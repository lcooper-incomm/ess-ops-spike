package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.auth.Group;
import com.incomm.cca.model.view.auth.GroupView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupConverter {

    @Autowired
    private PermissionConverter permissionConverter;
    @Autowired
    private RoleConverter roleConverter;
    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;

    public List<GroupView> convert(Collection<Group> request) {
        List<GroupView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(group -> views.add(this.convertSimple(group)));
        }

        return views;
    }

    public GroupView convert(Group request) {
        GroupView view = null;

        if (request != null) {
            view = this.convertSimple(request);
            view.setCreatedBy(userConverter.convertSimple(request.getCreatedBy()));
            view.setCreatedDate(timestampConverter.convert(request.getCreatedDate()));
            view.setModifiedBy(userConverter.convertSimple(request.getCreatedBy()));
            view.setModifiedDate(timestampConverter.convert(request.getModifiedDate()));

            view.setOwners(userConverter.convert(request.getOwners()));
            view.setPermissions(permissionConverter.convert(request.getPermissions()));
            view.setRoles(roleConverter.convert(request.getRoles()));

            //Hide cca_admin from UI
            view.setOwners(view.getOwners()
                               .stream()
                               .filter(userView -> !userView.getUsername()
                                                            .equalsIgnoreCase("cca_admin"))
                               .collect(Collectors.toList()));
        }

        return view;
    }

    public GroupView convertSimple(Group request) {
        GroupView view = null;

        if (request != null) {
            view = new GroupView();
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
