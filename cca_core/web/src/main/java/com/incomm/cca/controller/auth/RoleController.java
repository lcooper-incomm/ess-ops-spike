package com.incomm.cca.controller.auth;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.PermissionConverter;
import com.incomm.cca.model.converter.RoleConverter;
import com.incomm.cca.model.converter.UserConverter;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.domain.auth.Role;
import com.incomm.cca.service.UserService;
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
@RequestMapping("/rest/role")
public class RoleController extends RestResponseHandler {

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
    public ResponseEntity findAllAssignableByPermissionForRoleAdmin(
            @RequestParam("permissionId") Long permissionId,
            @RequestParam("userId") Long userId) {
        List<Role> roles = roleService.findAllAssignableByPermissionForRoleAdmin(permissionId, userId);
        return ok(roleConverter.convert(roles));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        Role role = roleService.findOne(id);
        if (role != null) {
            return ok(roleConverter.convert(role));
        } else {
            return noContent();
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity create(@RequestBody Role role, @RequestParam(value = "copyRoleId", required = false) Long copyRoleId) {
        Role updated = roleService.create(role, copyRoleId);
        return ok(roleConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity update(@RequestBody Role role) {
        Role updated = roleService.update(role);
        return ok(roleConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public ResponseEntity delete(@PathVariable("id") Long roleId) {
        roleService.delete(roleId);
        return noContent();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/admin")
    public ResponseEntity findAdmins(@PathVariable("id") Long roleId) {
        List<User> admins = userService.findRoleAdmins(roleId);
        return ok(userConverter.convert(admins.stream()
                                              .filter(user -> !user.getUsername()
                                                                   .equalsIgnoreCase("cca_admin"))
                                              .collect(Collectors.toList())));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/member")
    public ResponseEntity findMembers(@PathVariable("id") Long roleId) {
        List<User> members = userService.findRoleMembers(roleId);
        return ok(userConverter.convert(members.stream()
                                               .filter(user -> !user.getUsername()
                                                                    .equalsIgnoreCase("cca_admin"))
                                               .collect(Collectors.toList())));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{roleId}/group/{groupId}")
    public ResponseEntity updateRoleGroup(@PathVariable("roleId") Long roleId, @PathVariable("groupId") Long groupId) {
        Role updated = roleService.updateRoleGroup(roleId, groupId);
        return ok(roleConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/permission")
    public ResponseEntity findPermissions(@PathVariable("id") Long roleId) {
        List<Permission> permissions = permissionService.findAllPermissionsByRole(roleId);
        return ok(permissionConverter.convert(permissions));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}/active")
    public ResponseEntity activate(@PathVariable("id") Long roleId) {
        Role updated = roleService.updateStatus(roleId, true);
        return ok(roleConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}/active")
    public ResponseEntity deactivate(@PathVariable("id") Long roleId) {
        Role updated = roleService.updateStatus(roleId, false);
        return ok(roleConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{roleId}/permission/{permissionId}")
    public ResponseEntity addPermissionToRole(@PathVariable("roleId") Long roleId, @PathVariable("permissionId") Long permissionId) {
        Role updated = roleService.addPermissionToRole(roleId, permissionId);
        return ok(roleConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{roleId}/permission/{permissionId}")
    public ResponseEntity removePermissionFromRole(@PathVariable("roleId") Long roleId, @PathVariable("permissionId") Long permissionId) {
        Role updated = roleService.removePermissionFromRole(roleId, permissionId);
        return ok(roleConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{roleId}/category/{categoryId}")
    public ResponseEntity addPermissionsOfCategoryToRole(@PathVariable("roleId") Long roleId, @PathVariable("categoryId") Long categoryId) {
        Role updated = roleService.addPermissionsOfCategoryToRole(roleId, categoryId);
        return ok(roleConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{roleId}/category/{categoryId}")
    public ResponseEntity removePermissionsOfCategoryFromRole(@PathVariable("roleId") Long roleId, @PathVariable("categoryId") Long categoryId) {
        Role updated = roleService.removePermissionsOfCategoryFromRole(roleId, categoryId);
        return ok(roleConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{roleId}/admin/{userId}")
    public ResponseEntity addAdminToRole(@PathVariable("roleId") Long roleId, @PathVariable("userId") Long userId) {
        Role updated = roleService.addAdminToRole(roleId, userId);
        return ok(roleConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{roleId}/admin/{userId}")
    public ResponseEntity removeAdminFromRole(@PathVariable("roleId") Long roleId, @PathVariable("userId") Long userId) {
        Role updated = roleService.removeAdminFromRole(roleId, userId);
        return ok(roleConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{roleId}/member/{userId}")
    public ResponseEntity addMemberToRole(@PathVariable("roleId") Long roleId, @PathVariable("userId") Long userId) {
        Role updated = roleService.addMemberToRole(roleId, userId);
        return ok(roleConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{roleId}/member/{userId}")
    public ResponseEntity removeMemberFromRole(@PathVariable("roleId") Long roleId, @PathVariable("userId") Long userId) {
        Role updated = roleService.removeMemberFromRole(roleId, userId);
        return ok(roleConverter.convert(updated));
    }
}
