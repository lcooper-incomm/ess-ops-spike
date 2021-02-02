package com.incomm.cca.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.incomm.cca.servlet.NoCacheCssFilter;
import com.incomm.cca.servlet.NoCacheFilter;
import com.incomm.cca.servlet.NoCacheHtmlFilter;
import com.incomm.cca.servlet.NoCacheJsFilter;
import com.incomm.cca.util.ThreadPoolUtil;
import com.incomm.cscore.logging.filter.CsCoreCorrelationIdFilter;
import com.incomm.cscore.logging.filter.CsCoreLoggingFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.Filter;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final String REST_PATH = "/rest/*";

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(REST_PATH)
                .allowedOrigins("*")
                .allowedHeaders("*")
                .allowedMethods(HttpMethod.GET.toString(), HttpMethod.PUT.toString(), HttpMethod.POST.toString(), HttpMethod.DELETE.toString())
                .exposedHeaders("core-correlation-id", "cca-error-messages");
    }

    @Bean
    public ThreadPoolUtil threadPoolUtil() {
        return new ThreadPoolUtil();
    }

    @Bean
    public FilterRegistrationBean correlationIdFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new CsCoreCorrelationIdFilter());
        registration.addUrlPatterns();
        registration.setOrder(1);
        return registration;
    }

    @Bean
    public FilterRegistrationBean loggingFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new CsCoreLoggingFilter());
        registration.addUrlPatterns(REST_PATH);
        registration.setOrder(2);
        return registration;
    }

    @Bean
    public Filter noCacheFilter() {
        return new NoCacheFilter();
    }

    @Bean
    public FilterRegistrationBean noCacheFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(noCacheFilter());
        registration.addUrlPatterns(REST_PATH);
        registration.setAsyncSupported(true);
        return registration;
    }

    @Bean
    public Filter noCacheJsFilter() {
        return new NoCacheJsFilter();
    }

    @Bean
    public FilterRegistrationBean noCacheJsFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(noCacheJsFilter());
        registration.addUrlPatterns("*.js");
        registration.setAsyncSupported(true);
        return registration;
    }

    @Bean
    public Filter noCacheCssFilter() {
        return new NoCacheCssFilter();
    }

    @Bean
    public FilterRegistrationBean noCacheCssFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(noCacheCssFilter());
        registration.addUrlPatterns("*.css");
        registration.setAsyncSupported(true);
        return registration;
    }

    @Bean
    public Filter noCacheHtmlFilter() {
        return new NoCacheHtmlFilter();
    }

    @Bean
    public FilterRegistrationBean noCacheHtmlFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(noCacheHtmlFilter());
        // Sprint boot seems to implicitly return index.html when hitting the context root and therefore bypasses the html filter.
        // So add context root to the html url pattern.
        registration.addUrlPatterns("/", "*.html");
        registration.setAsyncSupported(true);
        return registration;
    }

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return objectMapper;
    }
}
