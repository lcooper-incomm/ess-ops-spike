package com.incomm.cca.controller.auth;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.GroupConverter;
import com.incomm.cca.model.converter.PermissionConverter;
import com.incomm.cca.model.converter.RoleConverter;
import com.incomm.cca.model.converter.UserConverter;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.auth.Group;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.domain.auth.Role;
import com.incomm.cca.service.UserService;
import com.incomm.cca.service.auth.GroupService;
import com.incomm.cca.service.auth.PermissionService;
import com.incomm.cca.service.auth.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/group")
public class GroupController extends RestResponseHandler {

    @Autowired
    private GroupConverter groupConverter;
    @Autowired
    private GroupService groupService;
    @Autowired
    private RoleConverter roleConverter;
    @Autowired
    private RoleService roleService;
    @Autowired
    private PermissionConverter permissionConverter;
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private UserConverter userConverter;
    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity findAll() {
        List<Group> groups = groupService.findAll();
        return ok(groupConverter.convert(groups));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        Group group = groupService.findOneWithFetch(id);
        if (group != null) {
            return ok(groupConverter.convert(group));
        } else {
            return noContent();
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity create(
            @RequestBody Group group,
            @RequestParam(value = "copyGroupId", required = false) Long copyGroupId) {
        Group updated = groupService.addOne(group, copyGroupId);
        return ok(groupConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity update(@RequestBody Group group) {
        Group updated = groupService.update(group.getId(), group);
        return ok(groupConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/owner")
    public ResponseEntity findOwners(@PathVariable("id") Long groupId) {
        List<User> admins = userService.findGroupOwners(groupId);
        return ok(userConverter.convert(admins.stream()
                                              .filter(user -> !user.getUsername()
                                                                   .equalsIgnoreCase("cca_admin"))
                                              .collect(Collectors.toList())));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/role")
    public ResponseEntity findRoles(@PathVariable("id") Long groupId) {
        List<Role> roles = roleService.findAllByGroup(groupId);
        return ok(roleConverter.convert(roles));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/permission")
    public ResponseEntity findPermissions(@PathVariable("id") Long groupId) {
        List<Permission> permissions = permissionService.findAllPermissionsByGroup(groupId);
        return ok(permissionConverter.convert(permissions));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public ResponseEntity delete(@PathVariable("id") Long groupId) {
        groupService.delete(groupId);
        return noContent();
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}/active")
    public ResponseEntity activate(@PathVariable("id") Long groupId) {
        Group updated = groupService.updateStatus(groupId, true);
        return ok(groupConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}/active")
    public ResponseEntity deactivate(@PathVariable("id") Long groupId) {
        Group updated = groupService.updateStatus(groupId, false);
        return ok(groupConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{groupId}/permission/{permissionId}")
    public ResponseEntity addPermissionToGroup(
            @PathVariable("groupId") Long groupId,
            @PathVariable("permissionId") Long permissionId) {
        Group updated = groupService.addPermissionToGroup(groupId, permissionId);
        return ok(groupConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{groupId}/permission/{permissionId}")
    public ResponseEntity removePermissionFromGroup(
            @PathVariable("groupId") Long groupId,
            @PathVariable("permissionId") Long permissionId) {
        Group updated = groupService.removePermissionFromGroup(groupId, permissionId);
        return ok(groupConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{groupId}/category/{categoryId}")
    public ResponseEntity addPermissionsOfCategoryToGroup(
            @PathVariable("groupId") Long groupId,
            @PathVariable("categoryId") Long categoryId) {
        Group updated = groupService.addPermissionsOfCategoryToGroup(groupId, categoryId);
        return ok(groupConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{groupId}/category/{categoryId}")
    public ResponseEntity removePermissionsOfCategoryFromGroup(
            @PathVariable("groupId") Long groupId,
            @PathVariable("categoryId") Long categoryId) {
        Group updated = groupService.removePermissionsOfCategoryFromGroup(groupId, categoryId);
        return ok(groupConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{groupId}/owner/{userId}")
    public ResponseEntity addOwnerToGroup(
            @PathVariable("groupId") Long groupId,
            @PathVariable("userId") Long userId) {
        Group updated = groupService.addOwnerToGroup(groupId, userId);
        return ok(groupConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{groupId}/owner/{userId}")
    public ResponseEntity removeOwnerFromGroup(
            @PathVariable("groupId") Long groupId,
            @PathVariable("userId") Long userId) {
        Group updated = groupService.removeOwnerFromGroup(groupId, userId);
        return ok(groupConverter.convert(updated));
    }
}
