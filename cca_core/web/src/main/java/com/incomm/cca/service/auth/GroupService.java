package com.incomm.cca.service.auth;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.auth.Group;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.domain.auth.PermissionCategory;
import com.incomm.cca.model.domain.auth.Role;
import com.incomm.cca.repository.auth.GroupRepository;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.UserService;
import com.incomm.cca.util.CaseFormatUtil;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private RoleService roleService;
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private PermissionCategoryService permissionCategoryService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserService userService;

    public Group findSystemAdministration() {
        try {
            return groupRepository.findSystemAdministration();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve SYSTEM_ADMINISTRATION group")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Group> findAll() {
        try {
            return groupRepository.findAll();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all groups")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Group> findAllForProfile() {
        try {
            return groupRepository.findAllActive();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all groups for profile")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Group> findAllByUser(Long userId) {
        try {
            return groupRepository.findAllByUser(userId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve groups")
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Group> findAllByPermission(Long permissionId) {
        try {
            return groupRepository.findAllByPermission(permissionId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve groups")
                        .keyValue("permissionId", permissionId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Group findOne(Long id) {
        try {
            return groupRepository.findById(id)
                                  .orElse(null);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve group")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Group findOneWithFetch(Long id) {
        return groupRepository.findOneWithFetch(id);
    }

    public Group findExistingBySystemNameOrDisplayName(Group group) {
        try {
            return groupRepository.findOneBySystemNameOrDisplayName(CaseFormatUtil.upperUnderscore(group.getSystemName()), group.getDisplayName());
        } catch (Exception e) {
            CsCoreLogger.error("Failed to look up existing group")
                        .keyValue("systemName", group.getSystemName())
                        .keyValue("displayName", group.getDisplayName())
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Group findExistingByDisplayName(String displayName) {
        try {
            return groupRepository.findOneByDisplayName(displayName);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to look up existing group")
                        .keyValue("displayName", displayName)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Group addOne(Group group, Long copyGroupId) throws IllegalArgumentException, NotFoundException, SecurityViolationException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            if (StringUtils.isNotBlank(group.getSystemName())) {
                group.setSystemName(CaseFormatUtil.upperUnderscore(group.getSystemName()));
            } else {
                group.setSystemName(CaseFormatUtil.upperUnderscore(group.getDisplayName()));
            }

            Group existingGroup = findExistingBySystemNameOrDisplayName(group);
            if (existingGroup != null) {
                throw new IllegalArgumentException("Group with this system name or display name already exists");
            }
            if (group.getLocked() == null) {
                group.setLocked(false);
            }

            if (copyGroupId != null) {
                //Copy group owners and permission from copy group
                Group copyGroup = findOne(copyGroupId);
                if (copyGroup == null) {
                    throw new NotFoundException("Copy Group not found");
                }

                group.getOwners()
                     .addAll(copyGroup.getOwners());
                group.getPermissions()
                     .addAll(copyGroup.getPermissions());
            } else {
                //Set cca_admin as owner
                group.getOwners()
                     .add(userService.findCCAAdmin());

                //Set current user as owner
                group.getOwners()
                     .add(userService.currentPersistentUser());
            }

            setCreatedFields(group);
            setModifiedFields(group);

            return groupRepository.saveAndFlush(group);
        } catch (IllegalArgumentException | NotFoundException e) {
            CsCoreLogger.warn("Bad request to create group")
                        .json("request", group)
                        .keyValue("copyGroupId", copyGroupId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to create a group")
                        .json("request", group)
                        .keyValue("copyGroupId", copyGroupId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create group")
                        .json("request", group)
                        .keyValue("copyGroupId", copyGroupId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Group update(Long id, Group request) throws IllegalArgumentException, SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Group existingGroup = this.findOne(id);
            if (existingGroup == null) {
                throw new NotFoundException("Group not found");
            }

            Group existingDisplayName = findExistingByDisplayName(request.getDisplayName());
            if (existingDisplayName != null && !existingDisplayName.getId()
                                                                   .equals(id)) {
                throw new IllegalArgumentException("Group with this display name already exists");
            }

            //Only certain fields are allowed to be edited
            existingGroup.setDisplayName(request.getDisplayName());
            existingGroup.setDescription(request.getDescription());

            //If not a locked group, go ahead and update the system name
            if (!existingGroup.getLocked()) {
                existingGroup.setSystemName(CaseFormatUtil.upperUnderscore(existingGroup.getDisplayName()));
            }

            //Locked groups cannot be deactivated
            if (!existingGroup.getLocked() && request.getActive() != null) {
                existingGroup.setActive(request.getActive());
            }

            setModifiedFields(existingGroup);

            return existingGroup;
        } catch (NotFoundException | IllegalArgumentException e) {
            CsCoreLogger.warn("Bad request to update a group")
                        .json("request", request)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to update a group")
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update group")
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public void delete(Long groupId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Group group = this.findOne(groupId);
            if (group == null || group.getLocked()) {
                throw new NotFoundException("Group not found");
            }

            groupRepository.delete(group);
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to delete a group")
                        .keyValue("id", groupId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to delete a group")
                        .keyValue("id", groupId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to delete group")
                        .keyValue("id", groupId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Group updateStatus(Long groupId, boolean status) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Group group = this.findOne(groupId);
            if (group == null) {
                throw new NotFoundException("Group not found");
            }

            if (!group.getLocked()) {
                group.setActive(status);
            }

            //Update status for all roles in this group
            for (Role role : group.getRoles()) {
                if (!role.getLocked()) {
                    role.setActive(status);
                    setModifiedFields(role);
                }
            }

            setModifiedFields(group);
            return group;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to change a group status")
                        .keyValue("id", groupId)
                        .keyValue("status", status)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to change a group status")
                        .keyValue("id", groupId)
                        .keyValue("status", status)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to change group status")
                        .keyValue("id", groupId)
                        .keyValue("status", status)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Group addPermissionToGroup(Long groupId, Long permissionId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Group group = this.findOne(groupId);
            if (group == null) {
                throw new NotFoundException("Group not found");
            }

            Permission permission = permissionService.findOne(permissionId);
            if (permission == null) {
                throw new NotFoundException("Permission not found");
            }

            group.getPermissions()
                 .add(permission);

            setModifiedFields(group);
            return group;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to add a permission to a group")
                        .keyValue("groupId", groupId)
                        .keyValue("permissionId", permissionId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to add a permission to a group")
                        .keyValue("groupId", groupId)
                        .keyValue("permissionId", permissionId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to add a permission to a group")
                        .keyValue("groupId", groupId)
                        .keyValue("permissionId", permissionId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Group removePermissionFromGroup(Long groupId, Long permissionId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Group group = this.findOne(groupId);
            if (group == null) {
                throw new NotFoundException("Group not found");
            }

            Permission removeMe = null;
            for (Permission permission : group.getPermissions()) {
                if (permission.getId()
                              .equals(permissionId)) {
                    removeMe = permission;
                    break;
                }
            }

            group.getPermissions()
                 .remove(removeMe);

            //Remove permission from all associated roles, too
            for (Role role : group.getRoles()) {
                Role fullRole = roleService.findOne(role.getId());
                fullRole.getPermissions()
                        .remove(removeMe);
            }

            setModifiedFields(group);

            return group;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to remove a permission from a group")
                        .keyValue("groupId", groupId)
                        .keyValue("permissionId", permissionId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to remove a permission from a group")
                        .keyValue("groupId", groupId)
                        .keyValue("permissionId", permissionId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to remove a permission from a group")
                        .keyValue("groupId", groupId)
                        .keyValue("permissionId", permissionId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Group addPermissionsOfCategoryToGroup(Long groupId, Long categoryId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Group group = this.findOne(groupId);
            if (group == null) {
                throw new NotFoundException("Group not found");
            }

            PermissionCategory permissionCategory = permissionCategoryService.findOne(categoryId);
            if (permissionCategory == null) {
                throw new NotFoundException("Permission Category not found");
            }

            group.getPermissions()
                 .addAll(permissionCategory.getPermissions());

            setModifiedFields(group);

            return group;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to add permissions of a category to a group")
                        .keyValue("groupId", groupId)
                        .keyValue("categoryId", categoryId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to add permissions of a category to a group")
                        .keyValue("groupId", groupId)
                        .keyValue("categoryId", categoryId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to add permissions of a category to a group")
                        .keyValue("groupId", groupId)
                        .keyValue("categoryId", categoryId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Group removePermissionsOfCategoryFromGroup(Long groupId, Long categoryId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Group group = this.findOne(groupId);
            if (group == null) {
                throw new NotFoundException("Group not found");
            }

            PermissionCategory category = permissionCategoryService.findOne(categoryId);
            if (category == null) {
                throw new NotFoundException("Permission Category not found");
            }

            group.getPermissions()
                 .removeAll(category.getPermissions());

            //Remove permissions from roles, too
            for (Role role : group.getRoles()) {
                Role fullRole = roleService.findOne(role.getId());
                fullRole.getPermissions()
                        .removeAll(category.getPermissions());
            }

            setModifiedFields(group);

            return group;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to remove a category of permissions from a group")
                        .keyValue("groupId", groupId)
                        .keyValue("categoryId", categoryId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to remove a category of permissions from a group")
                        .keyValue("groupId", groupId)
                        .keyValue("categoryId", categoryId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to remove a category of permissions from a group")
                        .keyValue("groupId", groupId)
                        .keyValue("categoryId", categoryId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Group addOwnerToGroup(Long groupId, Long userId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Group group = this.findOne(groupId);
            if (group == null) {
                throw new NotFoundException("Group not found");
            }

            User user = userService.findOne(userId);
            if (user == null) {
                throw new NotFoundException("User not found");
            }

            group.getOwners()
                 .add(user);

            setModifiedFields(group);

            return group;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to add an owner to a group")
                        .keyValue("groupId", groupId)
                        .keyValue("userId", userId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to add an owner to a group")
                        .keyValue("groupId", groupId)
                        .keyValue("userId", userId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to add an owner to a group")
                        .keyValue("groupId", groupId)
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Group removeOwnerFromGroup(Long groupId, Long userId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Group group = this.findOne(groupId);
            if (group == null) {
                throw new NotFoundException("Group not found");
            }

            User removeMe = null;
            for (User user : group.getOwners()) {
                if (user.getId()
                        .equals(userId)) {
                    removeMe = user;
                    break;
                }
            }

            //There must ALWAYS be at least two owners (cca_admin plus one)
            if (group.getOwners()
                     .size() <= 2) {
                throw new IllegalArgumentException("Group must have at least one owner"); //From user's perspective, there will only be one...
            }

            //We cannot remove cca_admin from groups
            if (removeMe != null && removeMe.getUsername()
                                            .equals(UserService.CCA_ADMIN)) {
                throw new IllegalArgumentException("cca_admin cannot be removed as a group owner");
            }

            group.getOwners()
                 .remove(removeMe);
            setModifiedFields(group);

            return group;
        } catch (NotFoundException | IllegalArgumentException e) {
            CsCoreLogger.warn("Bad request to remove an owner from a group")
                        .keyValue("groupId", groupId)
                        .keyValue("userId", userId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to remove an owner from a group")
                        .keyValue("groupId", groupId)
                        .keyValue("userId", userId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to remove an owner from a group")
                        .keyValue("groupId", groupId)
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public void setCreatedFields(AuditableEntity entity) {
        entity.setCreatedBy(userService.currentPersistentUser());
        entity.setCreatedDate(new Date());
    }

    @Transactional
    public void setModifiedFields(AuditableEntity entity) {
        entity.setModifiedBy(userService.currentPersistentUser());
        entity.setModifiedDate(new Date());
    }
}
