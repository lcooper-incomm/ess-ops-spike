package com.incomm.cca.spring;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incomm.cca.model.view.response.GenericMessageView;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AjaxAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        request.getSession()
               .setMaxInactiveInterval(60 * 60); //60 minutes

        if (AjaxUtils.isAjaxRequest(request)) {
            response.setStatus(HttpServletResponse.SC_OK);
            GenericMessageView view = new GenericMessageView();
            view.setMessage("Authenticated");
            response.getWriter()
                    .write(objectMapper.writeValueAsString(view));
        } else {
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }
}
