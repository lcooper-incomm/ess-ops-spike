package com.incomm.cca.servlet;

import com.incomm.cca.togglz.TogglzFeature;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class NoCacheHtmlFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        if (TogglzFeature.ADD_CACHE_CONTROL_HTML.isActive()) {
            httpServletResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            httpServletResponse.setIntHeader("Expires", 0);
            httpServletResponse.setHeader("Pragma", "no-cache");
        }

        chain.doFilter(request, httpServletResponse);
    }

    @Override
    public void destroy() {
    }
}
