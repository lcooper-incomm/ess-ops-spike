package com.incomm.cca.controller;

import com.incomm.cca.model.converter.GroupConverter;
import com.incomm.cca.model.converter.PermissionConverter;
import com.incomm.cca.model.converter.RoleConverter;
import com.incomm.cca.model.converter.TeamConverter;
import com.incomm.cca.model.converter.UserConverter;
import com.incomm.cca.model.domain.Team;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.auth.Group;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.domain.auth.Role;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cca.model.view.auth.legacy.DailyAdjustmentActivityView;
import com.incomm.cca.security.LDAPUserDetails;
import com.incomm.cca.service.BalanceAdjustmentLimitService;
import com.incomm.cca.service.TeamService;
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
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/user")
public class UserController extends RestResponseHandler {

    @Autowired
    private BalanceAdjustmentLimitService balanceAdjustmentLimitService;
    @Autowired
    private UserConverter userConverter;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleConverter roleConverter;
    @Autowired
    private RoleService roleService;
    @Autowired
    private PermissionConverter permissionConverter;
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private GroupConverter groupConverter;
    @Autowired
    private GroupService groupService;
    @Autowired
    private TeamConverter teamConverter;
    @Autowired
    private TeamService teamService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity findAll() {
        List<User> users = userService.findAll();
        return ok(userConverter.convert(users.stream()
                                             .filter(user -> !user.getUsername()
                                                                  .equalsIgnoreCase("cca_admin"))
                                             .collect(Collectors.toList())));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity createUser(@RequestBody User user) {
        User updated = userService.createUser(user);
        return ok(userConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity updateUser(@RequestBody UserView user) {
        User updated = userService.updateUser(user);
        return ok(userConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}/active")
    public ResponseEntity activate(@PathVariable("id") Long userId) {
        User updated = userService.updateStatus(userId, true);
        return ok(userConverter.convertSimple(updated));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}/active")
    public ResponseEntity deactivate(@PathVariable("id") Long userId) {
        User updated = userService.updateStatus(userId, false);
        return ok(userConverter.convertSimple(updated));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/current")
    public ResponseEntity currentUser() {
        LDAPUserDetails details = userService.currentUser();
        User user = userService.getOrCreatePersistentUser(details);

        if (!user.getActive()) {
            return forbidden();
        }

        user.setSystemAdministrator(userService.isSystemAdministrator(user.getId()));

        return ok(userConverter.convertCurrentUser(user));
    }

    @RequestMapping(value = "/{id}/team", method = RequestMethod.GET)
    public ResponseEntity findAllTeams(@PathVariable("id") Long id) {
        List<Team> domainModels = teamService.findAllByMembersId(id);
        return ok(teamConverter.convert(domainModels));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/group")
    public ResponseEntity findAllGroups(@PathVariable("id") Long id) {
        List<Group> groups = groupService.findAllByUser(id);
        return ok(groupConverter.convert(groups));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/role/admin")
    public ResponseEntity findAllAdminOfRoles(@PathVariable("id") Long id) {
        List<Role> roles = roleService.findAllByRoleAdmin(id);
        return ok(roleConverter.convert(roles));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/role/member")
    public ResponseEntity findAllMemberOfRoles(@PathVariable("id") Long id) {
        List<Role> roles = roleService.findAllByRoleMember(id);
        return ok(roleConverter.convert(roles));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/permission")
    public ResponseEntity findAllPermissions(@PathVariable("id") Long id) {
        Set<Permission> permissions = permissionService.findAllPermissionsForUser(id);
        return ok(permissionConverter.convert(permissions));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/balanceAdjustmentActivity")
    public ResponseEntity getUserAdjustmentLimits() {
        DailyAdjustmentActivityView daa = balanceAdjustmentLimitService.getDailyActivityForCurrentUser();
        return ok(daa);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search")
    public ResponseEntity search(@RequestParam("q") String value) {
        List<User> users = userService.search(value);
        return ok(userConverter.convert(users.stream()
                                             .filter(user -> !user.getUsername()
                                                                  .equalsIgnoreCase("cca_admin"))
                                             .collect(Collectors.toList())));
    }
}
