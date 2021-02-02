package com.incomm.cca.controller.auth;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.GroupConverter;
import com.incomm.cca.model.converter.PermissionCategoryConverter;
import com.incomm.cca.model.converter.PermissionConverter;
import com.incomm.cca.model.converter.RoleConverter;
import com.incomm.cca.model.domain.auth.Group;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.domain.auth.PermissionCategory;
import com.incomm.cca.model.domain.auth.Role;
import com.incomm.cca.service.auth.GroupService;
import com.incomm.cca.service.auth.PermissionCategoryService;
import com.incomm.cca.service.auth.PermissionService;
import com.incomm.cca.service.auth.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/permission")
public class PermissionController extends RestResponseHandler {

    @Autowired
    private PermissionConverter permissionConverter;
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private PermissionCategoryConverter permissionCategoryConverter;
    @Autowired
    private PermissionCategoryService permissionCategoryService;
    @Autowired
    private GroupConverter groupConverter;
    @Autowired
    private GroupService groupService;
    @Autowired
    private RoleConverter roleConverter;
    @Autowired
    private RoleService roleService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity findAllPermissions() {
        List<Permission> permissions = permissionService.findAllPermissions();
        return ok(permissionConverter.convert(permissions));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/group")
    public ResponseEntity findAllGroups(@PathVariable("id") Long id) {
        List<Group> groups = groupService.findAllByPermission(id);
        return ok(groupConverter.convert(groups));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/role")
    public ResponseEntity findAllRoles(@PathVariable("id") Long id) {
        List<Role> roles = roleService.findAllByPermission(id);
        return ok(roleConverter.convert(roles));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity updatePermission(@RequestBody Permission permission) {
        Permission updated = permissionService.updatePermission(permission);
        return ok(permissionConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}/active")
    public ResponseEntity activatePermission(@PathVariable("id") Long id) {
        Permission permission = permissionService.updateStatus(id, true);
        return ok(permissionConverter.convert(permission));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}/active")
    public ResponseEntity deactivatePermission(@PathVariable("id") Long id) {
        Permission permission = permissionService.updateStatus(id, false);
        return ok(permissionConverter.convert(permission));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/category")
    public ResponseEntity findAllPermissionCategories() {
        List<PermissionCategory> categories = permissionCategoryService.findAll();
        return ok(permissionCategoryConverter.convert(categories));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{permissionId}/category/{categoryId}")
    public ResponseEntity setCategory(
            @PathVariable("permissionId") Long permissionId,
            @PathVariable("categoryId") Long categoryId) {
        Permission permission = permissionService.setCategory(permissionId, categoryId);
        return ok(permissionConverter.convert(permission));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}/category")
    public ResponseEntity removeCategory(@PathVariable("id") Long permissionId) {
        Permission permission = permissionService.setCategoryToUncategorized(permissionId);
        return ok(permissionConverter.convert(permission));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/category/{id}/permission")
    public ResponseEntity findAllByCategory(@PathVariable("id") Long categoryId) {
        List<Permission> permissions = permissionService.findAllPermissionsByCategory(categoryId);
        return ok(permissionConverter.convert(permissions));
    }
}
