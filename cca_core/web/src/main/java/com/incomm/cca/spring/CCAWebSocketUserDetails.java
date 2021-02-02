package com.incomm.cca.spring;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class CCAWebSocketUserDetails extends UsernamePasswordAuthenticationToken {

    public CCAWebSocketUserDetails(Object principal, Object credentials) {
        super(principal, credentials);
    }

    public CCAWebSocketUserDetails(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(principal, credentials, authorities);
    }

    public Collection<GrantedAuthority> getAuthorities() {
        return super.getAuthorities();
    }
}
