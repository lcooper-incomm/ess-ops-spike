package com.incomm.cca.service.auth;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.domain.auth.PermissionCategory;
import com.incomm.cca.repository.auth.PermissionCategoryRepository;
import com.incomm.cca.repository.auth.PermissionRepository;
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
import java.util.List;

@Service
public class PermissionCategoryService {

    @Autowired
    private PermissionCategoryRepository permissionCategoryRepository;
    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserService userService;

    @Transactional
    public PermissionCategory addOne(PermissionCategory category) throws IllegalArgumentException, SecurityViolationException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            PermissionCategory existingCategory = findOneBySystemNameOrDisplayName(category.getSystemName(), category.getDisplayName());
            if (existingCategory != null) {
                throw new IllegalArgumentException("Permission Category with this system name or display name already exists");
            }
            if (category.getLocked() == null) {
                category.setLocked(false);
            }

            if (StringUtils.isNotBlank(category.getSystemName())) {
                category.setSystemName(CaseFormatUtil.upperUnderscore(category.getSystemName()));
            } else {
                category.setSystemName(CaseFormatUtil.upperUnderscore(category.getDisplayName()));
            }

            setCreatedFields(category);
            setModifiedFields(category);

            return permissionCategoryRepository.saveAndFlush(category);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad request to create a permission category")
                        .json("request", category)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to create a permission category")
                        .json("request", category)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create a permission category")
                        .json("request", category)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public void deleteOne(Long id) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            PermissionCategory category = findOne(id);
            if (category == null) {
                throw new NotFoundException();
            }

            if (!category.getLocked()) {
                PermissionCategory uncategorized = findUncategorized();
                for (Permission permission : category.getPermissions()) {
                    permission.setCategory(uncategorized);
                }
                permissionCategoryRepository.delete(category);
            }
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to delete a permission category")
                        .keyValue("id", id)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to delete a permission category")
                        .keyValue("id", id)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to delete a permission category")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<PermissionCategory> findAll() {
        return permissionCategoryRepository.findAllWithFetch();
    }

    public PermissionCategory findOne(Long id) {
        try {
            return permissionCategoryRepository.findById(id)
                                               .orElse(null);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve permission category")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public PermissionCategory findOneByDisplayName(String displayName) {
        try {
            return permissionCategoryRepository.findOneByDisplayName(displayName);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to look up existing permission category")
                        .keyValue("displayName", displayName)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public PermissionCategory findOneBySystemName(String systemName) {
        try {
            return permissionCategoryRepository.findOneBySystemName(systemName);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to look up existing permission category")
                        .keyValue("systemName", systemName)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public PermissionCategory findOneBySystemNameOrDisplayName(String systemName, String displayName) {
        try {
            return permissionCategoryRepository.findOneBySystemNameOrDisplayName(CaseFormatUtil.upperUnderscore(systemName), displayName);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to look up existing permission category")
                        .keyValue("systemName", systemName)
                        .keyValue("displayName", displayName)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public PermissionCategory findUncategorized() {
        try {
            return permissionCategoryRepository.findUncategorized();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve permission category")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public PermissionCategory updateOne(PermissionCategory request) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            PermissionCategory existingCategory = findOne(request.getId());
            if (existingCategory == null) {
                throw new NotFoundException("Permission Category not found");
            }

            PermissionCategory existingDisplayName = findOneByDisplayName(request.getDisplayName());
            if (existingDisplayName != null && !existingDisplayName.getId()
                                                                   .equals(existingCategory.getId())) {
                throw new IllegalArgumentException("Permission Category with this display name already exists");
            }

            //Only certain fields are allowed to be edited
            existingCategory.setDisplayName(request.getDisplayName());
            existingCategory.setDescription(request.getDescription());
            existingCategory.setLocked(request.getLocked());

            //Remove permissions not found in request
            List<Permission> removeMe = new ArrayList<>();
            for (Permission existingPermission : existingCategory.getPermissions()) {
                Permission requestPermission = request.getPermissions()
                                                      .stream()
                                                      .filter(permission -> permission.getId()
                                                                                      .equals(existingPermission.getId()))
                                                      .findFirst()
                                                      .orElse(null);
                if (requestPermission == null) {
                    removeMe.add(existingPermission);
                }
            }

            if (!removeMe.isEmpty()) {
                PermissionCategory unassignedCategory = permissionCategoryRepository.findUncategorized();
                for (Permission permissionToBeRemoved : removeMe) {
                    existingCategory.getPermissions()
                                    .remove(permissionToBeRemoved);
                    permissionToBeRemoved.setCategory(unassignedCategory);
                    unassignedCategory.getPermissions()
                                      .add(permissionToBeRemoved);
                }
            }

            //Add permissions found in request
            for (Permission requestPermission : request.getPermissions()) {
                Permission existingPermission = existingCategory.getPermissions()
                                                                .stream()
                                                                .filter(permission -> permission.getId()
                                                                                                .equals(requestPermission))
                                                                .findFirst()
                                                                .orElse(null);
                if (existingPermission == null) {
                    Permission masterPermission = permissionRepository.findById(requestPermission.getId())
                                                                      .orElse(null);
                    existingCategory.getPermissions()
                                    .add(masterPermission);
                    masterPermission.setCategory(existingCategory);
                }
            }

            setModifiedFields(request);
            return existingCategory;
        } catch (NotFoundException | IllegalArgumentException e) {
            CsCoreLogger.warn("Bad request to update a permission category")
                        .json("request", request)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to update a permission category")
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update a permission category")
                        .json("request", request)
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
