package com.incomm.cca.service;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.auth.Group;
import com.incomm.cca.model.domain.auth.Role;
import com.incomm.cca.model.enums.GreencardStatusDescription;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.repository.auth.GroupRepository;
import com.incomm.cca.repository.auth.RoleRepository;
import com.incomm.cca.service.session.SessionTypeService;
import com.incomm.cca.util.GreencardStatusUtil;
import com.incomm.cscore.client.apls.model.shared.EnhancedStatus;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class SecurityService {

    @Autowired
    private UserService userService;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private SessionTypeService sessionTypeService;

    private static final String GC_ADJUST_BALANCE_WHEN_PREFIX = "GC_ADJUST_BALANCE_WHEN";

    public boolean hasPermission(ManagedPermission managedPermission) {
        if (isActive()) {
            if (managedPermission == null) {
                CsCoreLogger.error("Null permission value checked!")
                            .build();

                return false;
            }
            return hasPermission(managedPermission.toString());
        }
        return false;
    }

    public boolean hasPermission(String permissionName) {
        if (isActive()) {
            if (StringUtils.isBlank(permissionName)) {
                CsCoreLogger.error("Null permission value checked!")
                            .build();

                return false;
            }

            return isSystemAdministrator() || userService.currentUser()
                                                         .getSimpleAuthorities()
                                                         .stream()
                                                         .anyMatch(simpleGrantedAuthority -> simpleGrantedAuthority.getAuthority()
                                                                                                                   .equals(permissionName));
        }
        return false;
    }

    public void validateHasPermission(ManagedPermission managedPermission) {
        if (!hasPermission(managedPermission)) {
            throw new SecurityViolationException();
        }
    }

    public void validateHasAnyPermission(ManagedPermission... permissions) {
        boolean hasPermission = false;
        for (ManagedPermission permission : permissions) {
            if (hasPermission(permission)) {
                hasPermission = true;
                break;
            }
        }
        if (!hasPermission) {
            throw new SecurityViolationException();
        }
    }

    public boolean canAdjustBalance(EnhancedStatus status) {
        if (isActive()) {
            //isSystemAdministrator() doesn't immediately apply here, as there must at least BE a permission for adjusting the balance in the given status first

            //Check that we have *A* permission for adjusting the balance when in the given status
            ManagedPermission managedPermission = findAdjustGreencardBalancePermissionWithStatus(status);
            if (managedPermission == null) {
                CsCoreLogger.error("Failed attempt to adjust balance for a status for which we have no permission!")
                            .keyValue("status", status)
                            .build();

                return false;
            }

            //Now, check permissions
            return isSystemAdministrator() || hasPermission(managedPermission);
        }
        return false;
    }

    public boolean isSystemAdministrator() {
        if (isActive()) {
            return userService.currentUser()
                              .getIsSystemAdministrator();
        }
        return false;
    }

    public void validateIsSystemAdministrator() {
        if (!isSystemAdministrator()) {
            throw new SecurityViolationException();
        }
    }

    //Require only the id to ensure we're checking against the database, not a provided model
    public boolean isRoleAdministrator(Long roleId) {
        if (isActive()) {
            if (isSystemAdministrator()) {
                return true;
            }
            if (roleId != null) {
                Role role = roleRepository.findById(roleId)
                                          .orElse(null);
                if (role != null) {
                    if (isGroupAdministrator(role.getGroup()
                                                 .getId())) {
                        return true;
                    }

                    for (User admin : role.getAdmins()) {
                        if (admin.getId()
                                 .equals(userService.currentPersistentUser()
                                                    .getId())) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    //Require only the id to ensure we're checking against the database, not a provided model
    public boolean isGroupAdministrator(Long groupId) {
        if (isActive()) {
            if (isSystemAdministrator()) {
                return true;
            }
            if (groupId != null) {
                Group group = groupRepository.findById(groupId)
                                             .orElse(null);
                if (group != null) {
                    for (User admin : group.getOwners()) {
                        if (admin.getId()
                                 .equals(userService.currentPersistentUser()
                                                    .getId())) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    private boolean isActive() {
        return userService.currentUser()
                          .getActive();
    }

    private ManagedPermission findAdjustGreencardBalancePermissionWithStatus(EnhancedStatus status) {
        GreencardStatusDescription statusDescription = null;

        //Validate and map our status codes to the descriptions we use in our permission names
        try {
            statusDescription = GreencardStatusUtil.getStatusDescription(status.getName());
        } catch (IllegalArgumentException e) {
            //Log it, but don't blow up over it. Control your anger. Anger leads to hate. Hate leads to suffering.
            CsCoreLogger.error("Failed to validate Greencard status code")
                        .json("status", status)
                        .exception(e)
                        .build();

            return null;
        }

        for (ManagedPermission permission : ManagedPermission.values()) {
            //Permission must start with correct prefix
            if (permission.toString()
                          .startsWith(GC_ADJUST_BALANCE_WHEN_PREFIX)) {
                //Permission must contain the provided status
                if (permission.toString()
                              .indexOf(statusDescription.toString()) > 0) {
                    return permission;
                }
            }
        }
        return null;
    }

    public ManagedPermission findPermissionForSessionType(String sessionType) {
        String name = String.format("SESSION_TYPE_%s", sessionType);

        for (ManagedPermission managedPermission : ManagedPermission.values()) {
            if (name.equals(managedPermission.toString())) {
                return managedPermission;
            }
        }

        CsCoreLogger.warn("Failed to find permission for session type")
                    .keyValue("sessionType", sessionType)
                    .build();

        return null;
    }

    public boolean hasCaseSearchSessionTypePermission(String sessionTypeName) {
        ManagedPermission permission = findCaseSearchPermissionForSessionType(sessionTypeName);
        return permission != null && hasPermission(permission);
    }

    private ManagedPermission findCaseSearchPermissionForSessionType(String sessionTypeName) {
        String permissionName = String.format("CASE_SEARCH_SESSION_TYPE_%s", sessionTypeName);

        return Arrays.stream(ManagedPermission.values())
                     .filter(managedPermission -> managedPermission.toString()
                                                                   .equals(permissionName))
                     .findFirst()
                     .orElseGet(() -> {
                         CsCoreLogger.warn("Failed to find case search permission for session type")
                                     .keyValue("caseSessionType", sessionTypeName)
                                     .build();
                         return null;
                     });
    }
}
