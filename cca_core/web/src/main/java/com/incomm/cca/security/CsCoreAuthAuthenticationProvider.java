package com.incomm.cca.security;

import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.auth.Group;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.repository.UserRepository;
import com.incomm.cca.repository.auth.GroupRepository;
import com.incomm.cca.repository.auth.PermissionRepository;
import com.incomm.cca.service.AriiaCoreUserService;
import com.incomm.cscore.auth.authentication.AuthenticationRequest;
import com.incomm.cscore.auth.authentication.AuthenticationResponse;
import com.incomm.cscore.client.auth.CsCoreAuthClient;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class CsCoreAuthAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private AriiaCoreUserService ariiaCoreUserService;
    @Autowired
    private CsCoreAuthClient authClient;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private PermissionRepository permissionRepository;

    @Override
    public Authentication authenticate(final Authentication authentication) throws AuthenticationException {
        AuthenticationRequest request = createAuthenticationRequest(authentication);
        AuthenticationResponse response = authenticateWithCsCore(request);

        if (response != null && response.getAuthenticated()) {
            LDAPUserDetails result = new LDAPUserDetails(response.getProfile());
            User user = fetchAndUpdateLoginDate(result.getUsername());
            ariiaCoreUserService.addOrUpdateOne(user);
            appendCCAPermissions(result, user);
            return new CCAAuthentication(result, user);
        } else {
            CsCoreLogger.error("Authentication request failed")
                        .build();

            throw new BadCredentialsException("Not authenticated");
        }
    }

    private AuthenticationResponse authenticateWithCsCore(AuthenticationRequest request) {
        Response<AuthenticationResponse> response = authClient.authenticate(request, true);
        AuthenticationResponse authenticationResponse = response.getBody();

        CsCoreLogger.info("Authentication Response")
                    .json("response", authenticationResponse)
                    .build();
        return authenticationResponse;
    }

    @Override
    public boolean supports(final Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    private AuthenticationRequest createAuthenticationRequest(Authentication authentication) {
        AuthenticationRequest request = new AuthenticationRequest();
        request.setUsername(authentication.getName());
        request.setPassword(authentication.getCredentials()
                                          .toString());
        return request;
    }

    /**
     * If we have a user profile in the database, find all the user's permissions and add them
     */
    private void appendCCAPermissions(LDAPUserDetails ldapUserDetails, User user) {
        if (StringUtils.isNotBlank(ldapUserDetails.getUsername())) {
            if (user != null) {
                ldapUserDetails.setActive(user.getActive());
						
						/*
						Permissions lookup depends on whether the user is a system admin or not.
						If they are, return all permissions. Else, return only the permissions
						assigned to their roles.
						 */
                List<Group> groups = groupRepository.findAllByUser(user.getId());
                for (Group group : groups) {
                    if (group.getSystemName()
                             .equals(Group.SYSTEM_ADMINISTRATION)) {
                        ldapUserDetails.setIsSystemAdministrator(true);
                        user.setSystemAdministrator(true);
                        break;
                    }
                }

                List<Permission> permissions;
                if (ldapUserDetails.getIsSystemAdministrator()) {
                    permissions = permissionRepository.findAllByActiveTrue();
                } else {
                    permissions = permissionRepository.findAllFromRolesForUser(user.getId());
                }

                for (Permission permission : permissions) {
                    ldapUserDetails.getSimpleAuthorities()
                                   .add(new SimpleGrantedAuthority(permission.getSystemName()));
                }
            }
        }
    }

    protected User fetchAndUpdateLoginDate(String username) {
        User user = userRepository.findOneByUsername(username);
        if (user != null) {
            user.setLastLoginDate(new Date());
            userRepository.saveAndFlush(user);
        }
        return user;
    }
}
