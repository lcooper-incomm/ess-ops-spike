package com.incomm.cca.security;

import com.incomm.cca.model.domain.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class CCAAuthentication implements Authentication {

    private LDAPUserDetails ldapUserDetails;
    private User user;

    public CCAAuthentication(LDAPUserDetails ldapUserDetails, User user) {
        this.ldapUserDetails = ldapUserDetails;
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return ldapUserDetails.getAuthorities();
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return ldapUserDetails;
    }

    @Override
    public Object getPrincipal() {
        return user;
    }

    @Override
    public boolean isAuthenticated() {
        return true;
    }

    @Override
    public void setAuthenticated(boolean b) throws IllegalArgumentException {

    }

    @Override
    public String getName() {
        return ldapUserDetails.getUsername();
    }
}
