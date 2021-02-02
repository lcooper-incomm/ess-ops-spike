package com.incomm.cca.service.auth;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.auth.Group;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.domain.auth.PermissionCategory;
import com.incomm.cca.model.domain.auth.Role;
import com.incomm.cca.repository.auth.RoleRepository;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.UserService;
import com.incomm.cca.util.CaseFormatUtil;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private GroupService groupService;
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private PermissionCategoryService permissionCategoryService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserService userService;

    public Role findOne(Long id) {
        try {
            return roleRepository.findById(id)
                                 .orElse(null);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve role")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Role> findAll() {
        try {
            return roleRepository.findAll();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all roles")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Role> findAllByGroup(Long groupId) {
        try {
            return roleRepository.findAllByGroup(groupId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all roles")
                        .keyValue("groupId", groupId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Role> findAllByRoleAdmin(Long userId) {
        try {
            Set<Role> roles = new HashSet<>();
            if (isSystemAdministrator(userId)) {
                roles.addAll(roleRepository.findAll());
            } else {
                roles.addAll(roleRepository.findAllByGroupOwner(userId));
                roles.addAll(roleRepository.findAllByRoleAdmin(userId));
            }

            return new ArrayList<>(roles);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all roles for admin")
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private boolean isSystemAdministrator(Long userId) {
        boolean isSystemAdministrator = false;
        List<Group> groups = groupService.findAllByUser(userId);
        for (Group group : groups) {
            if (group.getSystemName()
                     .equals(Group.SYSTEM_ADMINISTRATION)) {
                isSystemAdministrator = true;
                break;
            }
        }
        return isSystemAdministrator;
    }

    public List<Role> findAllByRoleMember(Long userId) {
        try {
            return roleRepository.findAllByRoleMember(userId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all roles for member")
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Role> findAllByPermission(Long permissionId) {
        try {
            return roleRepository.findAllByPermission(permissionId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all roles")
                        .keyValue("permissionId", permissionId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Role> findAllAssignableByPermissionForRoleAdmin(Long permissionId, Long userId) {
        try {
            return roleRepository.findAllAssignableByPermissionForRoleAdmin(permissionId, userId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all assignable roles")
                        .keyValue("permissionId", permissionId)
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Role> findAllByPermissionForRoleAdmin(Long permissionId, Long userId) {
        try {
            return roleRepository.findAllByPermissionForRoleAdmin(permissionId, userId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all roles")
                        .keyValue("permissionId", permissionId)
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Role findExistingBySystemNameOrDisplayName(Role role) {
        try {
            return roleRepository.findOneBySystemNameOrDisplayName(CaseFormatUtil.upperUnderscore(role.getSystemName()), role.getDisplayName());
        } catch (Exception e) {
            CsCoreLogger.error("Failed to look up existing role")
                        .keyValue("systemName", role.getSystemName())
                        .keyValue("displayName", role.getDisplayName())
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Role findExistingByDisplayName(String displayName) {
        try {
            return roleRepository.findOneByDisplayName(displayName);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to look up existing role")
                        .keyValue("displayName", displayName)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Role create(Role role, Long copyRoleId) {
        try {
            if (role.getGroup() == null || role.getGroup()
                                               .getId() == null) {
                throw new IllegalArgumentException("Role must be assigned to a group");
            }
            if (!securityService.isGroupAdministrator(role.getGroup()
                                                          .getId())) {
                throw new SecurityViolationException();
            }

            if (StringUtils.isNotBlank(role.getSystemName())) {
                role.setSystemName(CaseFormatUtil.upperUnderscore(role.getSystemName()));
            } else {
                role.setSystemName(CaseFormatUtil.upperUnderscore(role.getDisplayName()));
            }

            Role existingRole = findExistingBySystemNameOrDisplayName(role);
            if (existingRole != null) {
                throw new IllegalArgumentException("Role with this system name or display name already exists");
            }
            if (role.getLocked() == null) {
                role.setLocked(false);
            }

            //Get attached Group to persist
            Group group = groupService.findOne(role.getGroup()
                                                   .getId());
            if (group == null) {
                throw new NotFoundException("Group not found");
            }
            role.setGroup(group);

            if (copyRoleId != null) {
                //Copy permissions from copy role
                Role copyRole = findOne(copyRoleId);
                if (copyRole == null) {
                    throw new IllegalArgumentException("Copy Role not found");
                }

                //Only copy roles from the copyRole that are also assigned to the new role's group
                List<Permission> permissionsToCopy = new ArrayList<>();
                Group fullGroup = groupService.findOne(group.getId());
                for (Permission permission : copyRole.getPermissions()) {
                    if (fullGroup.getPermissions()
                                 .contains(permission)) {
                        permissionsToCopy.add(permission);
                    }
                }
                role.getPermissions()
                    .addAll(permissionsToCopy);
            }

            //Set cca_admin as admin
            role.getAdmins()
                .add(userService.findCCAAdmin());

            //Set current user as admin
            role.getAdmins()
                .add(userService.currentPersistentUser());

            setCreatedFields(role);
            setModifiedFields(role);

            return roleRepository.save(role);
        } catch (IllegalArgumentException | NotFoundException e) {
            CsCoreLogger.warn("Bad request to create a role")
                        .json("request", role)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to create a role")
                        .json("request", role)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create role")
                        .json("request", role)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Role update(Role role) throws IllegalArgumentException, SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isRoleAdministrator(role.getId())) {
                throw new SecurityViolationException();
            }

            if (role.getGroup() == null || role.getGroup()
                                               .getId() == null) {
                throw new IllegalArgumentException("Role must be assigned to a group");
            }

            Role existingRole = this.findOne(role.getId());
            if (existingRole == null) {
                throw new NotFoundException("Role not found");
            }

            Role existingDisplayName = findExistingByDisplayName(role.getDisplayName());
            if (existingDisplayName != null && !existingDisplayName.getId()
                                                                   .equals(role.getId())) {
                throw new IllegalArgumentException("Role with this display name already exists");
            }

            //Only certain fields are allowed to be edited
            existingRole.setDisplayName(role.getDisplayName());
            existingRole.setDescription(role.getDescription());

            //Locked groups cannot be deactivated, and cannot have their group changed
            if (!existingRole.getLocked()) {
                //Update active status if not null
                if (role.getActive() != null) {
                    existingRole.setActive(role.getActive());
                }

                //Update group
                if (!role.getGroup()
                         .getId()
                         .equals(existingRole.getGroup()
                                             .getId())) {
                    if (!securityService.isGroupAdministrator(existingRole.getGroup()
                                                                          .getId())) {
                        throw new SecurityViolationException();
                    }

                    Group group = groupService.findOne(role.getGroup()
                                                           .getId());
                    if (group == null) {
                        throw new NotFoundException("Group not found");
                    }
                    existingRole.setGroup(group);
                    existingRole.setAdmins(group.getOwners());
                    setModifiedFields(group);
                }
            }

            setModifiedFields(existingRole);

            return existingRole;
        } catch (NotFoundException | IllegalArgumentException e) {
            CsCoreLogger.warn("Bad request to update a role")
                        .json("request", role)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to update a role")
                        .json("request", role)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update role")
                        .json("request", role)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public void delete(Long roleId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isRoleAdministrator(roleId)) {
                throw new SecurityViolationException();
            }

            Role role = this.findOne(roleId);
            if (role == null || role.getLocked()) {
                throw new NotFoundException("Role not found");
            }

            roleRepository.delete(role);
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to delete a role")
                        .keyValue("id", roleId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to delete a role")
                        .keyValue("id", roleId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to delete role")
                        .keyValue("id", roleId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Role updateStatus(Long roleId, boolean status) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isRoleAdministrator(roleId)) {
                throw new SecurityViolationException();
            }

            Role role = this.findOne(roleId);
            if (role == null) {
                throw new NotFoundException("Role not found");
            }

            if (!role.getLocked()) {
                role.setActive(status);
            }

            setModifiedFields(role);

            return role;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to change a role status")
                        .keyValue("id", roleId)
                        .keyValue("status", status)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to change a role status")
                        .keyValue("id", roleId)
                        .keyValue("status", status)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to change role status")
                        .keyValue("id", roleId)
                        .keyValue("status", status)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Role updateRoleGroup(Long roleId, Long groupId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isRoleAdministrator(roleId)) {
                throw new SecurityViolationException();
            }

            Role role = this.findOne(roleId);
            if (role == null) {
                throw new NotFoundException("Role not found");
            }
            if (!securityService.isGroupAdministrator(role.getGroup()
                                                          .getId())) {
                throw new SecurityViolationException();
            }

            Group group = groupService.findOne(groupId);
            if (group == null) {
                throw new NotFoundException("Group not found");
            }

            role.setGroup(group);

            //Remove permissions from Role that don't exist in new Group
            List<Permission> missingPermissions = new ArrayList<>();
            Group fullGroup = groupService.findOne(groupId);
            for (Permission permission : role.getPermissions()) {
                if (!fullGroup.getPermissions()
                              .contains(permission)) {
                    missingPermissions.add(permission);
                }
            }
            role.getPermissions()
                .removeAll(missingPermissions);

            setModifiedFields(role);
            setModifiedFields(group);

            return role;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to change a role's group")
                        .keyValue("roleId", roleId)
                        .keyValue("groupId", groupId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to change a role's group")
                        .keyValue("roleId", roleId)
                        .keyValue("groupId", groupId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to change role's group")
                        .keyValue("roleId", roleId)
                        .keyValue("groupId", groupId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Role addPermissionToRole(Long roleId, Long permissionId) throws IllegalArgumentException, SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isRoleAdministrator(roleId)) {
                throw new SecurityViolationException();
            }

            Role role = this.findOne(roleId);
            if (role == null) {
                throw new NotFoundException("Role not found");
            }

            Permission permission = permissionService.findOne(permissionId);
            if (permission == null) {
                throw new NotFoundException("Permission not found");
            }

            Group group = groupService.findOne(role.getGroup()
                                                   .getId());
            if (!group.getPermissions()
                      .contains(permission)) {
                throw new IllegalArgumentException("Permission must first be assigned to the group before it can be assigned to a role within the group");
            }

            role.getPermissions()
                .add(permission);

            setModifiedFields(role);

            return role;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to a permission to a role")
                        .keyValue("roleId", roleId)
                        .keyValue("permissionId", permissionId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to add a permission to a role")
                        .keyValue("roleId", roleId)
                        .keyValue("permissionId", permissionId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to add a permission to a role")
                        .keyValue("roleId", roleId)
                        .keyValue("permissionId", permissionId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Role removePermissionFromRole(Long roleId, Long permissionId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isRoleAdministrator(roleId)) {
                throw new SecurityViolationException();
            }

            Role role = this.findOne(roleId);
            if (role == null) {
                throw new NotFoundException("Role not found");
            }

            Permission removeMe = null;
            for (Permission permission : role.getPermissions()) {
                if (permission.getId()
                              .equals(permissionId)) {
                    removeMe = permission;
                    break;
                }
            }

            role.getPermissions()
                .remove(removeMe);

            setModifiedFields(role);

            return role;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to remove a permission from a role")
                        .keyValue("roleId", roleId)
                        .keyValue("permissionId", permissionId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to remove a permission from a role")
                        .keyValue("roleId", roleId)
                        .keyValue("permissionId", permissionId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to remove a permission from a role")
                        .keyValue("roleId", roleId)
                        .keyValue("permissionId", permissionId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Role addPermissionsOfCategoryToRole(Long roleId, Long categoryId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Role role = this.findOne(roleId);
            if (role == null) {
                throw new NotFoundException("Role not found");
            }

            PermissionCategory permissionCategory = permissionCategoryService.findOne(categoryId);
            if (permissionCategory == null) {
                throw new NotFoundException("Permission Category not found");
            }

            //Only add permissions of category that belong to role's group
            List<Permission> permissionsToAdd = new ArrayList<>();
            Group fullGroup = groupService.findOne(role.getGroup()
                                                       .getId());
            for (Permission permission : permissionCategory.getPermissions()) {
                if (fullGroup.getPermissions()
                             .contains(permission)) {
                    permissionsToAdd.add(permission);
                }
            }
            role.getPermissions()
                .addAll(permissionsToAdd);

            setModifiedFields(role);

            return role;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to add permissions of a category to a role")
                        .keyValue("roleId", roleId)
                        .keyValue("categoryId", categoryId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to add permissions of a category to a role")
                        .keyValue("roleId", roleId)
                        .keyValue("categoryId", categoryId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to add permissions of a category to a role")
                        .keyValue("roleId", roleId)
                        .keyValue("categoryId", categoryId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Role removePermissionsOfCategoryFromRole(Long roleId, Long categoryId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Role role = this.findOne(roleId);
            if (role == null) {
                throw new NotFoundException("Role not found");
            }

            PermissionCategory category = permissionCategoryService.findOne(categoryId);
            if (category == null) {
                throw new NotFoundException("Permission Category not found");
            }

            role.getPermissions()
                .removeAll(category.getPermissions());

            setModifiedFields(role);

            return role;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to remove a category of permissions from a role")
                        .keyValue("roleId", roleId)
                        .keyValue("categoryId", categoryId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to remove a category of permissions from a role")
                        .keyValue("roleId", roleId)
                        .keyValue("categoryId", categoryId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to remove a permission from a role")
                        .keyValue("roleId", roleId)
                        .keyValue("categoryId", categoryId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Role addAdminToRole(Long roleId, Long userId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isRoleAdministrator(roleId)) {
                throw new SecurityViolationException();
            }

            Role role = this.findOne(roleId);
            if (role == null) {
                throw new NotFoundException("Role not found");
            }

            User user = userService.findOne(userId);
            if (user == null) {
                throw new NotFoundException("User not found");
            }

            role.getAdmins()
                .add(user);

            setModifiedFields(role);

            return role;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to add an admin to a role")
                        .keyValue("roleId", roleId)
                        .keyValue("userId", userId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to add an admin to a role")
                        .keyValue("roleId", roleId)
                        .keyValue("userId", userId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to add an admin to a role")
                        .keyValue("roleId", roleId)
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Role removeAdminFromRole(Long roleId, Long userId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isRoleAdministrator(roleId)) {
                throw new SecurityViolationException();
            }

            Role role = this.findOne(roleId);
            if (role == null) {
                throw new NotFoundException("Role not found");
            }

            User removeMe = null;
            for (User user : role.getAdmins()) {
                if (user.getId()
                        .equals(userId)) {
                    removeMe = user;
                    break;
                }
            }

            //We cannot remove cca_admin from roles
            if (removeMe != null && removeMe.getUsername()
                                            .equals(UserService.CCA_ADMIN)) {
                throw new IllegalArgumentException("cca_admin cannot be removed as a role admin");
            }

            role.getAdmins()
                .remove(removeMe);
            setModifiedFields(role);

            return role;
        } catch (NotFoundException | IllegalArgumentException e) {
            CsCoreLogger.warn("Bad request to remove an admin from a role")
                        .keyValue("roleId", roleId)
                        .keyValue("userId", userId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to remove an admin from a role")
                        .keyValue("roleId", roleId)
                        .keyValue("userId", userId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to remove an admin from a role")
                        .keyValue("roleId", roleId)
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Role addMemberToRole(Long roleId, Long userId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isRoleAdministrator(roleId)) {
                throw new SecurityViolationException();
            }

            Role role = this.findOne(roleId);
            if (role == null) {
                throw new NotFoundException("Role not found");
            }

            User user = userService.findOne(userId);
            if (user == null) {
                throw new NotFoundException("User not found");
            }

            role.getMembers()
                .add(user);

            setModifiedFields(role);

            return role;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to add a member to a role")
                        .keyValue("roleId", roleId)
                        .keyValue("userId", userId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to add a member to a role")
                        .keyValue("roleId", roleId)
                        .keyValue("userId", userId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to add a member to a role")
                        .keyValue("roleId", roleId)
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Role removeMemberFromRole(Long roleId, Long userId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isRoleAdministrator(roleId)) {
                throw new SecurityViolationException();
            }

            Role role = this.findOne(roleId);
            if (role == null) {
                throw new NotFoundException("Role not found");
            }

            User removeMe = null;
            for (User user : role.getMembers()) {
                if (user.getId()
                        .equals(userId)) {
                    removeMe = user;
                    break;
                }
            }

            role.getMembers()
                .remove(removeMe);

            setModifiedFields(role);

            return role;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to remove a member from a role")
                        .keyValue("roleId", roleId)
                        .keyValue("userId", userId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to remove a member from a role")
                        .keyValue("roleId", roleId)
                        .keyValue("userId", userId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to remove a member from a role")
                        .keyValue("roleId", roleId)
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    protected void setCreatedFields(AuditableEntity entity) {
        entity.setCreatedBy(userService.currentPersistentUser());
        entity.setCreatedDate(new Date());
    }

    @Transactional
    protected void setModifiedFields(AuditableEntity entity) {
        entity.setModifiedBy(userService.currentPersistentUser());
        entity.setModifiedDate(new Date());
    }
}
