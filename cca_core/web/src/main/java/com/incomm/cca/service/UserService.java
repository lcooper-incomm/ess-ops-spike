package com.incomm.cca.service;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.PropertySystemName;
import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.Partner;
import com.incomm.cca.model.domain.Property;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.auth.Role;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cca.repository.UserRepository;
import com.incomm.cca.security.LDAPUserDetails;
import com.incomm.cca.service.auth.RoleService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    @Autowired
    private PartnerService partnerService;
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserRepository userRepository;
    public static final String CCA_ADMIN = "cca_admin";
    public static final String SYSTEM_DEFAULT_USER = "system_default_user";
    private static final String QUERY_IS_SYSTEM_ADMINISTRATOR = "" +
            "SELECT g.id " +
            "FROM cca_group_owner cgo " +
            "  JOIN cca_group g ON g.id = cgo.group_id " +
            "WHERE cgo.user_id = :userId " +
            "      AND g.system_name = 'SYSTEM_ADMINISTRATION';";

    public List<User> findAll() {
        try {
            return userRepository.findAllOrderByUsername();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all users")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<User> findAllByIsMigratedFalse() {
        return userRepository.findAllByIsMigratedFalseOrderByIdDesc();
    }

    public User findOne(Long id) {
        return userRepository.findById(id)
                             .orElse(null);
    }

    public User findCCAAdmin() {
        return userRepository.findOneByUsername(CCA_ADMIN);
    }

    private User findSystemDefaultUser() {
        try {
            return userRepository.findOneByUsername(SYSTEM_DEFAULT_USER);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve system default user")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<User> findGroupOwners(Long groupId) {
        try {
            return userRepository.findAllByGroup(groupId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve group owners")
                        .keyValue("groupId", groupId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<User> findRoleAdmins(Long roleId) {
        try {
            return userRepository.findAllRoleAdmins(roleId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve role admins")
                        .keyValue("roleId", roleId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<User> findRoleMembers(Long roleId) {
        try {
            return userRepository.findAllRoleMembers(roleId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve role members")
                        .keyValue("roleId", roleId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<User> search(String value) {
        try {
            return userRepository.search(value.toLowerCase());
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve users where username starts with")
                        .keyValue("value", value)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public boolean isSystemAdministrator(Long userId) {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("userId", userId);

            try {
                return jdbcTemplate.queryForObject(QUERY_IS_SYSTEM_ADMINISTRATOR, params, Long.class) != null;
            } catch (EmptyResultDataAccessException e) {
                return false;
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to determine if user is system administrator")
                        .keyValue("userId", userId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    /**
     * Used throughout the app to get basic user information from Active Directory
     */
    public LDAPUserDetails currentUser() {
        SecurityContext context = SecurityContextHolder.getContext();
        if (context != null) {
            Authentication authentication = context.getAuthentication();
            if (authentication != null) {
                return (LDAPUserDetails) authentication.getDetails();
            }
        }

        throw new IllegalStateException();
    }

    @Transactional
    public User updateCurrentUser(LDAPUserDetails userDetails) {
        User user = currentPersistentUser();
        if (user.needsUpdating(userDetails)) {
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setEmail(userDetails.getEmail());
            user.setCompany(userDetails.getCompany());
            user.setDepartment(userDetails.getDepartment());
            user.setEmployeeId(userDetails.getEmployeeId());
            user.setTitle(userDetails.getTitle());
            user.setDisplayName(userDetails.getDisplayName());
            user.setMobile(userDetails.getMobile());
            user.setPhone(userDetails.getPhone());

            userRepository.save(user);
        }

        return user;
    }

    /**
     * Used by Hazelcast/Atmosphere integration to get user details
     */
    public LDAPUserDetails currentUser(UsernamePasswordAuthenticationToken authToken) {
        return (LDAPUserDetails) authToken.getDetails();
    }

    public User currentPersistentUser() {
        SecurityContext context = SecurityContextHolder.getContext();
        if (context != null) {
            Authentication authentication = context.getAuthentication();
            if (authentication != null) {
                User cachedUser = (User) authentication.getPrincipal();
                return this.findOne(cachedUser.getId());
            }
        }

        throw new IllegalStateException();
    }

    public User findOneByUsername(String username) {
        return userRepository.findOneByUsername(username.toLowerCase());
    }

    public AplsPlatform getDefaultPlatform() {
        AplsPlatform platform = AplsPlatform.INCOMM;
        try {
            platform = AplsPlatform.convert(currentPersistentUser().getPrefDefaultDataSource());
        } catch (IllegalStateException e) {
            //Fail silently
        }
        return platform;
    }

    @Transactional
    public User getOrCreatePersistentUser(LDAPUserDetails userDetails) {
        String username = userDetails.getUsername()
                                     .toLowerCase();
        User user = findOneByUsername(username);
        if (user == null) {
            user = newPersistentUser(userDetails);
            attemptActivation(user.getId());

            return findOneByUsername(username);
        } else {
            return updateCurrentUser(userDetails);
        }
    }

    @Transactional
    protected User newPersistentUser(LDAPUserDetails userDetails) {
        User user = new User(userDetails);
        setCreatedFields(user);
        setModifiedFields(user);

        setDefaultPreferences(user);

        return userRepository.saveAndFlush(user);
    }

    @Transactional
    protected void attemptActivation(Long id) {
        //CCA-2298 If user has AD security group matching one of our role names, add them to that role and activate them
        List<Role> roles = new ArrayList<>();

        LDAPUserDetails contextUser = currentUser();
        for (GrantedAuthority authority : contextUser.getAuthorities()) {
            Role role = roleService.findExistingByDisplayName(authority.getAuthority());
            if (role != null && role.getActive()) {
                roles.add(role);
            }
        }

        //If user was added to at least one role, activate them automatically
        if (!roles.isEmpty()) {
            //CCA-2298 Add user to CCA BASIC USER if they were added to any role at all
            Property property = propertyService.findOneBySystemName(PropertySystemName.NEW_USER_DEFAULT_ROLE_ID);
            if (property != null && StringUtils.isNotBlank(property.getValue())) {
                Long roleId = Long.parseLong(property.getValue());
                Role role = roleService.findOne(roleId);
                if (role != null && role.getActive()) {
                    roles.add(role);
                }
            }

            //Add roles to user
            String query = "INSERT INTO cca_role_member VALUES (:roleId, :userId)";
            for (Role roleToAssign : roles) {
                Map<String, Object> params = new HashMap<>();
                params.put("roleId", roleToAssign.getId());
                params.put("userId", id);

                jdbcTemplate.update(query, params); //Because Hibernate is NOT cooperating
            }

            //Activate user
            String activateQuery = "UPDATE cca_user SET active = 1 WHERE id = :userId";
            Map<String, Object> params = new HashMap<>();
            params.put("userId", id);
            jdbcTemplate.update(activateQuery, params);
        }
    }

    private void setDefaultPreferences(User user) {
        user.setPrefShowBillableOnly(false);
        user.setPrefDefaultDataSource(AplsPlatform.INCOMM.toString());

        User systemDefaultUser = findSystemDefaultUser();
        user.setPrefDefaultSearchTypeId(systemDefaultUser.getPrefDefaultSearchTypeId());
        user.setPrefDockMode(systemDefaultUser.getPrefDockMode());
        user.setPrefSummaryMode(systemDefaultUser.getPrefSummaryMode());
        user.setPrefDefaultSessionType(systemDefaultUser.getPrefDefaultSessionType());
        user.setPrefDontShowWhatsNew(systemDefaultUser.getPrefDontShowWhatsNew());
    }

    @Transactional
    public User createUser(User user) throws IllegalArgumentException, SecurityViolationException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            if (StringUtils.isBlank(user.getUsername())) {
                throw new IllegalArgumentException("Username must be provided");
            }

            User existingUser = userRepository.findOneByUsername(user.getUsername()
                                                                     .toLowerCase());
            if (existingUser != null) {
                throw new IllegalArgumentException("User with this username already exists");
            }

            //Set default preferences if necessary
            User systemDefaultUser = findSystemDefaultUser();
            if (StringUtils.isBlank(user.getPrefDefaultDataSource())) {
                user.setPrefDefaultDataSource(systemDefaultUser.getPrefDefaultDataSource());
            }
            if (user.getPrefDefaultSearchTypeId() == null) {
                user.setPrefDefaultSearchTypeId(systemDefaultUser.getPrefDefaultSearchTypeId());
            }
            if (user.getPrefShowBillableOnly() == null) {
                user.setPrefShowBillableOnly(systemDefaultUser.getPrefShowBillableOnly());
            }
            if (StringUtils.isBlank(user.getPrefDefaultSessionType())) {
                user.setPrefDefaultSessionType(systemDefaultUser.getPrefDefaultSessionType());
            }
            if (StringUtils.isBlank(user.getPrefDockMode())) {
                user.setPrefDockMode(systemDefaultUser.getPrefDockMode());
            }
            if (StringUtils.isBlank(user.getPrefSummaryMode())) {
                user.setPrefSummaryMode(systemDefaultUser.getPrefSummaryMode());
            }
            if (StringUtils.isBlank(user.getPrefDefaultLandingPage())) {
                user.setPrefDefaultLandingPage(systemDefaultUser.getPrefDefaultLandingPage());
            }

            setCreatedFields(user);
            setModifiedFields(user);

            return userRepository.saveAndFlush(user);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad request to create user")
                        .json("request", user)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to create a user")
                        .json("request", user)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create user")
                        .json("request", user)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public User updateUser(UserView request) throws IllegalArgumentException, NotFoundException, SecurityViolationException {
        try {
            if (!request.getId()
                        .equals(currentPersistentUser().getId()) && !securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            User existingUser = this.findOne(request.getId());
            if (existingUser == null) {
                throw new NotFoundException("User not found");
            }

            User existingUsername = userRepository.findOneByUsername(request.getUsername());
            if (existingUsername != null && !existingUsername.getId()
                                                             .equals(request.getId())) {
                throw new IllegalArgumentException("User with this username already exists");
            }

            //Only certain fields are allowed to be edited
            existingUser.setFirstName(request.getFirstName());
            existingUser.setLastName(request.getLastName());
            existingUser.setEmail(request.getEmail());

            //Prevent setting these to null
            if (request.getPrefDefaultDataSource() != null) {
                AplsPlatform aplsPlatform = AplsPlatform.convert(request.getPrefDefaultDataSource());
                if (aplsPlatform != AplsPlatform.INCOMM && aplsPlatform != AplsPlatform.SEJ) {
                    throw new IllegalArgumentException("prefDefaultDataSource can only be one of 'INCOMM' or 'SEJ'");
                }
                existingUser.setPrefDefaultDataSource(request.getPrefDefaultDataSource());
            }
            if (request.getPrefDefaultSearchTypeId() != null) {
                existingUser.setPrefDefaultSearchTypeId(request.getPrefDefaultSearchTypeId());
            }
            if (request.getPrefShowBillableOnly() != null) {
                existingUser.setPrefShowBillableOnly(request.getPrefShowBillableOnly());
            }
            if (StringUtils.isNotBlank(request.getPrefDockMode())) {
                existingUser.setPrefDockMode(request.getPrefDockMode());
            }
            if (StringUtils.isNotBlank(request.getPrefSummaryMode())) {
                existingUser.setPrefSummaryMode(request.getPrefSummaryMode());
            }
            if (StringUtils.isNotBlank(request.getPrefDefaultLandingPage())) {
                existingUser.setPrefDefaultLandingPage(request.getPrefDefaultLandingPage());
            }

            existingUser.setPrefDontShowWhatsNew(request.getPrefDontShowWhatsNew());
            existingUser.setPrefDefaultBolPartner(request.getPrefDefaultBolPartner());

            if (request.getPrefDefaultPartner() != null && (existingUser.getPrefDefaultPartner() == null || !existingUser.getPrefDefaultPartner()
                                                                                                                         .getId()
                                                                                                                         .equals(request.getPrefDefaultPartner()
                                                                                                                                        .getId()))) {
                Partner newPartner = this.partnerService.findOne(request.getPrefDefaultPartner()
                                                                        .getId());
                existingUser.setPrefDefaultPartner(newPartner);
            } else if (request.getPrefDefaultPartner() == null) {
                existingUser.setPrefDefaultPartner(null);
            }

            if (request.getPrefDefaultCclPartner() != null && (existingUser.getPrefDefaultCclPartner() == null || !existingUser.getPrefDefaultCclPartner()
                                                                                                                               .getId()
                                                                                                                               .equals(request.getPrefDefaultCclPartner()
                                                                                                                                              .getId()))) {
                Partner newPartner = this.partnerService.findOne(request.getPrefDefaultCclPartner()
                                                                        .getId());
                existingUser.setPrefDefaultCclPartner(newPartner);
            } else if (request.getPrefDefaultCclPartner() == null) {
                existingUser.setPrefDefaultCclPartner(null);
            }
            if (request.getPrefDefaultSessionType() != null) {
                existingUser.setPrefDefaultSessionType(request.getPrefDefaultSessionType());
            }

            setModifiedFields(existingUser);

            return existingUser;
        } catch (NotFoundException | IllegalArgumentException e) {
            CsCoreLogger.warn("Bad request to update a user")
                        .json("request", request)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to update a user")
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update user")
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public User updateStatus(Long userId, boolean status) throws SecurityViolationException, NotFoundException {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            User user = this.findOne(userId);
            if (user == null) {
                throw new NotFoundException("User not found");
            }

            //cca_admin cannot be deactivated TODO add locked column to table?
            if (!user.getUsername()
                     .equals(CCA_ADMIN)) {
                user.setActive(status);
            }

            setModifiedFields(user);

            return user;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad request to change user status")
                        .keyValue("userId", userId)
                        .keyValue("status", status)
                        .keyValue("cause", e.getMessage())
                        .build();

            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.error("Unauthorized attempt to change user status")
                        .keyValue("userId", userId)
                        .keyValue("status", status)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to change group status")
                        .keyValue("userId", userId)
                        .keyValue("status", status)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    protected void setCreatedFields(AuditableEntity entity) {
        User user = currentPersistentUser();
        if (user == null) {
            user = findCCAAdmin();
        }

        entity.setCreatedBy(user);
        entity.setCreatedDate(new Date());
    }

    @Transactional
    protected void setModifiedFields(AuditableEntity entity) {
        User user = currentPersistentUser();
        if (user == null) {
            user = findCCAAdmin();
        }

        entity.setModifiedBy(user);
        entity.setModifiedDate(new Date());
    }
}
