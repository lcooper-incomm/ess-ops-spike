package com.incomm.cca.config;

import org.atmosphere.cpr.AtmosphereServlet;
import org.atmosphere.cpr.ContainerInitializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import java.util.Collections;

@Configuration
public class AtmosphereConfig {

    @Value("${atmosphere.max-idle-time-ms:3600000}")
    private Long maxIdleTime;

    @Bean
    public EmbeddedAtmosphereInitilializer atmosphereInitilializer() {
        return new EmbeddedAtmosphereInitilializer();
    }

    @Bean
    public ServletRegistrationBean atmosphereServlet() {
        ServletRegistrationBean registration = new ServletRegistrationBean(
                new AtmosphereServlet(), "/websocket/*");

        registration.addInitParameter("org.atmosphere.websocket.maxIdleTime", Long.toString(maxIdleTime));
        registration.addInitParameter("org.atmosphere.interceptor.HeartbeatInterceptor.clientHeartbeatFrequencyInSeconds", "60");

        registration.setLoadOnStartup(1);
        registration.setAsyncSupported(true);
        registration.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return registration;
    }

    private static class EmbeddedAtmosphereInitilializer extends ContainerInitializer implements ServletContextInitializer {

        @Override
        public void onStartup(ServletContext servletContext) throws ServletException {
            onStartup(Collections.emptySet(), servletContext);
        }
    }
}
