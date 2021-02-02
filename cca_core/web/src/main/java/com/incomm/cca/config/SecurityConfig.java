package com.incomm.cca.config;

import com.incomm.cca.security.CsCoreAuthAuthenticationProvider;
import com.incomm.cca.spring.AjaxAuthenticationFailureHandler;
import com.incomm.cca.spring.AjaxAuthenticationSuccessHandler;
import com.incomm.cca.spring.CcaBasicAuthEntryPoint;
import com.incomm.cca.spring.CcaFormLoginEntryPoint;
import com.incomm.cca.spring.CustomLogoutSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.event.LoggerListener;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private static final String REST_I3 = "/rest/i3/**";
	private static final String REST_IVR = "/rest/ivr/**";

	@Configuration
	@Order(1)
	public class BasicAuthConfig extends WebSecurityConfigurerAdapter {

		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http
					.headers()
					.cacheControl()
				.disable()
				.and()
				.csrf()
				.disable()
				.antMatcher(
					"/rest/**"
				)
				.authorizeRequests()
				.anyRequest()
				.authenticated()
				.and()
				.exceptionHandling()
				.authenticationEntryPoint( new CcaBasicAuthEntryPoint() )
				.and()
				.httpBasic();
		}
		
		@Override
		public void configure( WebSecurity web ) throws Exception {
			web.ignoring()
			   .antMatchers(
					   REST_I3,
					   REST_IVR,
					   "/error",
					   "/error-page.html",
					   "/manager/**",
					   "/images/**"
			   );
		}
	}
	
	@Configuration
	public class FormLoginConfig extends WebSecurityConfigurerAdapter {
		
		@Override
		protected void configure( HttpSecurity http ) throws Exception {
			http
				.headers()
				.cacheControl()
				.disable()
				.and()
				.headers()
				.frameOptions()
				.sameOrigin()
				.and()
				.csrf()
				.disable()
				.authorizeRequests()
				.antMatchers(
						"/",
						"/lib/**",
						"/fonts/**",
						"/**/*.js",
						"/**/*.css",
						"/**/*.html",
						"/**/*.map",
						"/favicon.ico",
						REST_I3,
						REST_IVR,
						"/assets/**"
				)
				.permitAll()
				.antMatchers(
					"/togglz"
				)
				.hasAuthority( "SLCEngineering" )
				.anyRequest()
				.authenticated()
				.and()
				.formLogin()
				.loginProcessingUrl( "/authenticate" )
				.successHandler( ajaxAuthenticationSuccessHandler() )
				.failureHandler( ajaxAuthenticationFailureHandler() )
				.and()
				.logout()
				.logoutUrl( "/logout" )
				.deleteCookies( "JSESSIONID" )
				.logoutSuccessHandler( ajaxLogoutSuccessHandler() )
				.permitAll()
				.and()
				.exceptionHandling()
				.authenticationEntryPoint( ajaxAuthenticationEntryPoint() )
				.and()
				.sessionManagement()
				.enableSessionUrlRewriting( false )
				.maximumSessions( 2 )
				.sessionRegistry( sessionRegistry() );
		}
		
		@Override
		public void configure( WebSecurity web ) throws Exception {
			web.ignoring()
			   .antMatchers(
					   REST_I3,
					   REST_IVR,
					   "/error",
					   "/error-page.html",
					   "/wdc/*",
					   "/manager/**",
					   "/images/**"
			   );
		}
	}
	
	@Configuration
	protected static class AuthenticationConfiguration extends GlobalAuthenticationConfigurerAdapter {
		
		@Autowired
		private CsCoreAuthAuthenticationProvider csCoreAuthAuthenticationProvider;
		
		@Override
		public void init( AuthenticationManagerBuilder auth ) throws Exception {
			auth
				.authenticationProvider( csCoreAuthAuthenticationProvider );
		}
	}
	
	@Bean
	public LoggerListener loggerListener() {
		return new LoggerListener();
	}
	
	@Bean
	public SessionRegistry sessionRegistry() {
		return new SessionRegistryImpl();
	}
	
	@Bean
	public LoginUrlAuthenticationEntryPoint ajaxAuthenticationEntryPoint() {
		return new CcaFormLoginEntryPoint( "/" );
	}
	
	@Bean
	public SimpleUrlAuthenticationSuccessHandler ajaxAuthenticationSuccessHandler() {
		return new AjaxAuthenticationSuccessHandler();
	}
	
	@Bean
	public SimpleUrlAuthenticationFailureHandler ajaxAuthenticationFailureHandler() {
		return new AjaxAuthenticationFailureHandler();
	}
	
	@Bean
	public LogoutSuccessHandler ajaxLogoutSuccessHandler() {
		return new CustomLogoutSuccessHandler();
	}
}
