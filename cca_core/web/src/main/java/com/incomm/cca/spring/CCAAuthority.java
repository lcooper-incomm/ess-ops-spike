package com.incomm.cca.spring;

import org.springframework.security.core.GrantedAuthority;

public enum CCAAuthority implements GrantedAuthority {
    SLCEngineering;

    @Override
    public String getAuthority() {
        return name();
    }
}
