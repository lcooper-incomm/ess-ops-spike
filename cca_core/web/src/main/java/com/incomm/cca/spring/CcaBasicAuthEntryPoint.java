package com.incomm.cca.spring;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CcaBasicAuthEntryPoint extends BasicAuthenticationEntryPoint {

    @Override
    public void commence(final HttpServletRequest request, final HttpServletResponse response, final AuthenticationException authException) throws IOException, ServletException {
        if (request.getRequestURI()
                   .contains("/rest")) {
            if (!AjaxUtils.isAjaxRequest(request)) {
                response.setHeader("WWW-Authenticate", "Basic ");
            }
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
        } else {
            super.commence(request, response, authException);
        }
    }
}