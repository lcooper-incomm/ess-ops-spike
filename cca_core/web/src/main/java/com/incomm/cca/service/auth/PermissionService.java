package com.incomm.cca.service.auth;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.auth.Group;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.domain.auth.PermissionCategory;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.repository.auth.PermissionRepository;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.UserService;
import com.incomm.cca.util.CaseFormatUtil;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private PermissionCategoryService permissionCategoryService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserService userService;
    @Autowired
    private GroupService groupService;

    public Permission findOne(Long id) {
        try {
            return permissionRepository.findById(id)
                                       .orElse(null);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve permission")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private Permission findOneByDisplayName(String displayName) {
        return permissionRepository.findOneByDisplayName(displayName);
    }

    public Permission findHighestBalanceAdjustmentPermission() {
        try {
            if (userService.currentUser()
                           .getIsSystemAdministrator()) {
                return permissionRepository.findOneBySystemName(ManagedPermission.ADJUST_BALANCE_LEVEL_5.toString());
            } else {
                return permissionRepository.findHighestBalanceAdjustmentPermissionForUser(userService.currentPersistentUser()
                                                                                                     .getId());
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve highest balance adjustment permission for user")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Permission> findAllPermissions() {
        try {
            return permissionRepository.findAll();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all permissions")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Permission> findAllPermissionsByCategory(Long categoryId) {
        try {
            return permissionRepository.findAllByCategoryId(categoryId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve permissions")
                        .keyValue("categoryId", categoryId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Set<Permission> findAllPermissionsForUser(Long userId) {
        try {
			/*
			At the moment, this is only called for the current user. If this changes,
			the following isSystemAdministrator() check will not work as expected, and
			will need to be changed.
			 */

            Set<Permission> permissions = new HashSet<>();
            if (securityService.isSystemAdministrator()) {
                permissions.addAll(permissionRepository.findAllByActiveTrue());
            } else {
                permissions.addAll(permissionRepository.findAllFromRolesForUser(userId));
            }
            return permissions;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve permissions")
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Permission> findAllPermissionsByGroup(Long groupId) {
        try {
            return permissionRepository.findAllByGroup(groupId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve permissions")
                        .keyValue("groupId", groupId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Permission> findAllPermissionsByRole(Long roleId) {
        try {
            return permissionRepository.findAllByRole(roleId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve permissions")
                        .keyValue("roleId", roleId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private Permission findExistingPermissionBySystemNameOrDisplayName(String systemName, String displayName) {
        try {
            return permissionRepository.findOneBySystemNameOrDisplayName(CaseFormatUtil.upperUnderscore(systemName), displayName);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to look up existing permission")
                        .keyValue("systemName", systemName)
                        .keyValue("displayName", displayName)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Permission createPermission(Permission permission) throws IllegalArgumentException {
        try {
            //Security is not checked here because at this time permissions cannot be created via REST endpoint

            if (StringUtils.isNotBlank(permission.getSystemName())) {
                permission.setSystemName(CaseFormatUtil.upperUnderscore(permission.getSystemName()));
            } else {
                permission.setSystemName(CaseFormatUtil.upperUnderscore(permission.getDisplayName()));
            }

            Permission existingPermission = findExistingPermissionBySystemNameOrDisplayName(permission.getSystemName(), permission.getDisplayName());
            if (existingPermission != null) {
                throw new IllegalArgumentException("Permission with this system name or display name already exists");
            }

            //If this is exposed to REST endpoints for any reason, this needs to change to use currentPersistentUser instead
            User user = userService.findCCAAdmin();
            permission.setCreatedBy(user);
            permission.setCreatedDate(new Date());
            permission.setModifiedBy(user);
            permission.setModifiedDate(new Date());

            Group systemAdministration = groupService.findSystemAdministration();
            systemAdministration.getPermissions()
                                .add(permission);

            return permissionRepository.saveAndFlush(permission);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad request to create a permission")
                        .json("request", permission)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create a permission")
                        .json("request", permission)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Permission updatePermission(Permission permission) throws IllegalArgumentException, SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Permission existingPermission = findOne(permission.getId());
            if (existingPermission == null) {
                throw new NotFoundException("Permission not found");
            }

            Permission existingDisplayName = findOneByDisplayName(permission.getDisplayName());
            if (existingDisplayName != null && !existingDisplayName.getId()
                                                                   .equals(permission.getId())) {
                throw new IllegalArgumentException("Permission with this display name already exists");
            }

            //Only certain fields are allowed to be edited
            existingPermission.setDisplayName(permission.getDisplayName());
            existingPermission.setDescription(permission.getDescription());

            //Ignore null values when setting active status (must be true or false)
            if (permission.getActive() != null) {
                existingPermission.setActive(permission.getActive());
            }

            if (permission.getCategory() != null && !permission.getCategory()
                                                               .getId()
                                                               .equals(existingPermission.getCategory()
                                                                                         .getId())) {
                PermissionCategory category = permissionCategoryService.findOne(permission.getCategory()
                                                                                          .getId());
                if (category == null) {
                    throw new NotFoundException("Permission Category not found");
                }
                existingPermission.setCategory(category);
                setModifiedFields(category);
            } else if (permission.getCategory() == null) {
                PermissionCategory uncategorized = permissionCategoryService.findUncategorized();
                existingPermission.setCategory(uncategorized);
                setModifiedFields(uncategorized);
            }

            setModifiedFields(permission);

            return existingPermission;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to update a permission")
                        .json("request", permission)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to update a permission")
                        .json("request", permission)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update a permission")
                        .json("request", permission)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Permission updateStatus(Long permissionId, boolean status) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Permission permission = findOne(permissionId);
            if (permission == null) {
                throw new NotFoundException("Permission not found");
            }

            permission.setActive(status);

            setModifiedFields(permission);

            return permission;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to update a permission status")
                        .keyValue("id", permissionId)
                        .keyValue("status", status)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to update a permission status")
                        .keyValue("id", permissionId)
                        .keyValue("status", status)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update a permission status")
                        .keyValue("id", permissionId)
                        .keyValue("status", status)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Permission setCategory(Long permissionId, Long categoryId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Permission permission = findOne(permissionId);
            if (permission == null) {
                throw new NotFoundException("Permission not found");
            }

            PermissionCategory category = permissionCategoryService.findOne(categoryId);
            if (category == null) {
                throw new NotFoundException("Permission Category not found");
            }

            permission.setCategory(category);

            setModifiedFields(permission);
            setModifiedFields(category);

            return permission;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to update a permission's permission category")
                        .keyValue("permissionId", permissionId)
                        .keyValue("categoryId", categoryId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to update a permission's permission category")
                        .keyValue("permissionId", permissionId)
                        .keyValue("categoryId", categoryId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update a permission's permission category")
                        .keyValue("permissionId", permissionId)
                        .keyValue("categoryId", categoryId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Permission setCategoryToUncategorized(Long permissionId) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Permission permission = findOne(permissionId);
            if (permission == null) {
                throw new NotFoundException("Permission not found");
            }

            PermissionCategory category = permissionCategoryService.findUncategorized();
            if (category == null) {
                throw new NotFoundException("Permission Category not found");
            }

            permission.setCategory(category);

            setModifiedFields(permission);
            setModifiedFields(category);

            return permission;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to update a permission's permission category")
                        .keyValue("id", permissionId)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to update a permission's permission category")
                        .keyValue("id", permissionId)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update a permission's permission category")
                        .keyValue("id", permissionId)
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
