package com.incomm.cca.service;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.Partner;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.domain.auth.PermissionCategory;
import com.incomm.cca.repository.PartnerRepository;
import com.incomm.cca.service.auth.PermissionCategoryService;
import com.incomm.cca.service.auth.PermissionService;
import com.incomm.cca.util.CaseFormatUtil;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PartnerService {

    @Autowired
    private PartnerRepository partnerRepository;
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private PermissionCategoryService permissionCategoryService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserService userService;

    public List<Partner> findAll() {
        try {
            return partnerRepository.findAll();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve partners")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Partner findOne(Long id) {
        try {
            return partnerRepository.findById(id)
                                    .orElse(null);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve partner by id")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Partner findOneByNameAndPlatform(String name, String platform) {
        return this.partnerRepository.findOneByNameAndPlatformIgnoreCase(name, platform);
    }

    public Partner findOneByTypeAndPlatform(String type, String platform) {
        return this.partnerRepository.findOneByTypeAndPlatformIgnoreCase(type, platform);
    }

    public Partner findPartnerByDnis(String dnis) {
        if (StringUtils.isBlank(dnis)) {
            CsCoreLogger.warn("No DNIS provided for partner lookup")
                        .build();
            return null;
        }

        //Strip all spaces and special characters
        String cleanDnis = dnis.replaceAll("[^0-9]", "");

        Partner partner = partnerRepository.findOneByDnis(cleanDnis);
        if (partner == null) {
            CsCoreLogger.warn("No partner found for provided DNIS")
                        .keyValue("dnis", dnis)
                        .build();
        }

        return partner;
    }

    @Transactional
    public Partner create(Partner partner) throws IllegalArgumentException, NotFoundException, SecurityViolationException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Partner existingName = this.findOneByNameAndPlatform(partner.getName(), partner.getPlatform());
            if (existingName != null) {
                throw new IllegalArgumentException("Partner already exists with that name and platform");
            }

            Permission permission = new Permission();
            updatePermission(permission, partner);

            partner.setPermission(permissionService.createPermission(permission));

            return partnerRepository.saveAndFlush(partner);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad request to create a partner")
                        .json("request", partner)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to create a partner")
                        .json("request", partner)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create partner")
                        .json("request", partner)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private void updatePermission(Permission permission, Partner partner) {
        PermissionCategory category = permissionCategoryService.findOneBySystemName("PARTNER PERMISSION");
        permission.setSystemName(CaseFormatUtil.upperUnderscore("partner_permission_" + partner.getName()));
        permission.setDisplayName("Partner " + partner.getName() + " permission");
        permission.setCategory(category);
        permission.setActive(true);
    }

    @Transactional
    public void delete(Long id) throws NotFoundException, SecurityViolationException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Partner partner = this.findOne(id);
            if (partner == null) {
                throw new NotFoundException("Partner not found");
            }

            partnerRepository.delete(partner);

            CsCoreLogger.info("Deleted partner")
                        .keyValue("id", id)
                        .build();
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to delete a partner")
                        .keyValue("id", id)
                        .build();
            throw e;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to delete a partner")
                        .keyValue("id", id)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to delete partner")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Partner update(Partner partner) {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            Partner existing = this.findOne(partner.getId());
            if (existing == null) {
                throw new NotFoundException("Partner not found");
            }

            Partner existingName = partnerRepository.findOneByNameAndPlatformIgnoreCase(partner.getName(), partner.getPlatform());
            if (existingName != null && !existingName.getId()
                                                     .equals(existing.getId())) {
                throw new IllegalArgumentException("Partner with this name already exists");
            }

            //Update fields
            existing.setName(partner.getName());
            existing.setIvrDnis(partner.getIvrDnis());

            updatePermission(existing.getPermission(), partner);

            return existing;
        } catch (NotFoundException | IllegalArgumentException e) {
            CsCoreLogger.warn("Bad request to update a partner")
                        .json("request", partner)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to update a partner")
                        .json("request", partner)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update a partner")
                        .json("request", partner)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Partner> getAllGranted() {
        try {
            if (BooleanUtils.isTrue(userService.currentUser()
                                               .getIsSystemAdministrator())) {
                return partnerRepository.findAll();
            } else {
                return partnerRepository.findAllGrantedToUser(userService.currentPersistentUser()
                                                                         .getId());
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve granted partners for user")
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
