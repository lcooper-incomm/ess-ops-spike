package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.view.auth.PermissionView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class PermissionConverter {

    @Autowired
    private PermissionCategoryConverter permissionCategoryConverter;
    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;

    public List<PermissionView> convert(Collection<Permission> request) {
        List<PermissionView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(permission -> views.add(this.convert(permission)));
        }

        return views;
    }

    public PermissionView convert(Permission request) {
        PermissionView view = null;

        if (request != null) {
            view = this.convertSimple(request);
            view.setCategory(permissionCategoryConverter.convertSimple(request.getCategory()));
        }

        return view;
    }

    public List<PermissionView> convertSimple(Collection<Permission> request) {
        List<PermissionView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(permission -> views.add(this.convertSimple(permission)));
        }

        return views;
    }

    public PermissionView convertSimple(Permission request) {
        PermissionView view = null;

        if (request != null) {
            view = new PermissionView();
            view.setId(request.getId());
            view.setDescription(request.getDescription());
            view.setDisplayName(request.getDisplayName());
            view.setIsActive(request.getActive());
            view.setSystemName(request.getSystemName());
        }

        return view;
    }

    public Permission convertSimple(PermissionView request) {
        Permission model = null;

        if (request != null) {
            model = new Permission();
            model.setId(request.getId());
            model.setDescription(request.getDescription());
            model.setDisplayName(request.getDisplayName());
            model.setActive(request.getIsActive());
            model.setSystemName(request.getSystemName());
        }

        return model;
    }
}
