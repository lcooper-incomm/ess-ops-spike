package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.auth.PermissionCategory;
import com.incomm.cca.model.view.auth.PermissionCategoryView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class PermissionCategoryConverter {

    @Autowired
    private PermissionConverter permissionConverter;
    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;

    public List<PermissionCategoryView> convert(Collection<PermissionCategory> request) {
        List<PermissionCategoryView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(category -> views.add(this.convertSimple(category)));
        }

        return views;
    }

    public PermissionCategoryView convert(PermissionCategory request) {
        PermissionCategoryView view = null;

        if (request != null) {
            view = this.convertSimple(request);
            view.setCreatedBy(userConverter.convertSimple(request.getCreatedBy()));
            view.setCreatedDate(timestampConverter.convert(request.getCreatedDate()));
            view.setModifiedBy(userConverter.convertSimple(request.getModifiedBy()));
            view.setModifiedDate(timestampConverter.convert(request.getModifiedDate()));

            view.setPermissions(permissionConverter.convert(request.getPermissions()));
        }

        return view;
    }

    public PermissionCategoryView convertSimple(PermissionCategory request) {
        PermissionCategoryView view = null;

        if (request != null) {
            view = new PermissionCategoryView();
            view.setId(request.getId());
            view.setDescription(request.getDescription());
            view.setDisplayName(request.getDisplayName());
            view.setLocked(request.getLocked());
            view.setSystemName(request.getSystemName());
        }

        return view;
    }
}
