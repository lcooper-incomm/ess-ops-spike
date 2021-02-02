package com.incomm.cca.spring;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AjaxAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        if (AjaxUtils.isAjaxRequest(request)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Failed authentication");
        } else {
            super.onAuthenticationFailure(request, response, exception);
        }
    }
}
