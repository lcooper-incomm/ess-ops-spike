package com.incomm.cca.service;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.Team;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.domain.auth.PermissionCategory;
import com.incomm.cca.repository.TeamRepository;
import com.incomm.cca.service.auth.PermissionCategoryService;
import com.incomm.cca.service.auth.PermissionService;
import com.incomm.cca.util.CaseFormatUtil;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
public class TeamService extends CcaAbstractCrudService<Team, Long> {

    @Autowired
    private PermissionService permissionService;
    @Autowired
    private PermissionCategoryService permissionCategoryService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private UserService userService;

    public List<Team> findAllByMembersId(Long id) {
        return teamRepository.findAllByMembersId(id);
    }

    public Team findOneBySystemName(String systemName) {
        return teamRepository.findOneBySystemName(systemName);
    }

    @Override
    protected String getModelName() {
        return Team.class.getSimpleName();
    }

    @Override
    protected void validateAddPermission() throws SecurityViolationException {
        securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void validateDeletePermission() throws SecurityViolationException {
        securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void validateFindPermission() throws SecurityViolationException {
        //No permission to enforce
    }

    @Override
    protected void validateUpdatePermission() throws SecurityViolationException {
        securityService.validateIsSystemAdministrator();
    }

    @Override
    @Transactional
    public Team addOne(Team request) {
        try {
            validateAddPermission();

            if (request instanceof AuditableEntity) {
                User currentUser = userService.currentPersistentUser();
                ((AuditableEntity) request).setCreatedBy(currentUser);
                ((AuditableEntity) request).setModifiedBy(currentUser);
            }

            request.setCasePermission(createCaseTeamPermission(request));

            List<User> users = new ArrayList<>();
            for (User user : request.getMembers()) {
                users.add(userService.findOne(user.getId()));
            }
            request.setMembers(new HashSet<>(users));

            return super.addOne(request);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn(String.format("Bad attempt to create %s", getModelName()))
                        .keyValue("cause", e.getMessage())
                        .json("request", request)
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn(String.format("Unauthorized attempt to create %s", getModelName()))
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.warn(String.format("Failed to create %s", getModelName()))
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Override
    protected void controlledUpdateOne(Team source, Team target) {
        target.setDisplayName(source.getDisplayName());
        target.setSystemName(CaseFormatUtil.upperUnderscore(source.getDisplayName()));
        target.setDescription(source.getDescription());

        List<User> removeMe = new ArrayList<>();
        for (User existingMember : target.getMembers()) {
            User requestMember = source.getMembers()
                                       .stream()
                                       .filter(member -> member.getId()
                                                               .equals(existingMember.getId()))
                                       .findFirst()
                                       .orElse(null);
            if (requestMember == null) {
                removeMe.add(existingMember);
            }
        }
        target.getMembers()
              .removeAll(removeMe);

        for (User requestMember : source.getMembers()) {
            User existingMember = target.getMembers()
                                        .stream()
                                        .filter(member -> member.getId()
                                                                .equals(requestMember.getId()))
                                        .findFirst()
                                        .orElse(null);
            if (existingMember == null) {
                target.getMembers()
                      .add(userService.findOne(requestMember.getId()));
            }
        }
    }

    @Override
    protected void validateUnique(final Team team) throws IllegalArgumentException {
        Team existing = findOneBySystemName(team.getSystemName());
        if (existing != null && !team.getId()
                                     .equals(existing.getId())) {
            throw new IllegalArgumentException("Team already exists with this name");
        }
    }

    @Transactional
    protected Permission createCaseTeamPermission(Team team) {
        try {
            Permission permission = new Permission();
            permission.setActive(true);
            permission.setDescription("Permission to use this team for searching and assigning cases");
            permission.setDisplayName(String.format("Case Team - %s", team.getDisplayName()));

            PermissionCategory permissionCategory = permissionCategoryService.findOneBySystemName("CASE_TEAMS");
            if (permissionCategory == null) {
                permissionCategory = permissionCategoryService.findUncategorized();
            }
            permission.setCategory(permissionCategory);

            return permissionService.createPermission(permission);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create case team permission")
                        .keyValue("teamName", team.getSystemName())
                        .exception(e)
                        .build();

            throw e;
        }
    }
}
