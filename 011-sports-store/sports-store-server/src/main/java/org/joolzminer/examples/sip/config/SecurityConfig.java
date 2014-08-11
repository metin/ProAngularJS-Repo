package org.joolzminer.examples.sip.config;

import org.joolzminer.examples.sip.security.AjaxAuthenticationFailureHandler;
import org.joolzminer.examples.sip.security.AjaxAuthenticationSuccessHandler;
import org.joolzminer.examples.sip.security.AjaxLogoutSuccessHandler;
import org.joolzminer.examples.sip.security.Http401UnauthorizedEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private AjaxAuthenticationSuccessHandler ajaxAuthenticationSuccessHandler;
	
	@Autowired
	private AjaxAuthenticationFailureHandler ajaxAuthenticationFailureHandler;
	
	@Autowired
	private Http401UnauthorizedEntryPoint http401UnauthorizedEntryPoint;
	
	@Autowired
	private AjaxLogoutSuccessHandler ajaxLogoutSuccessHandler;
	
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new StandardPasswordEncoder();
    }
    
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.exceptionHandling()
				.authenticationEntryPoint(http401UnauthorizedEntryPoint)
				.and()
			.formLogin()
				.usernameParameter("j_username")
				.passwordParameter("j_password")				
				.loginProcessingUrl("/j_spring_security_check")
				.successHandler(ajaxAuthenticationSuccessHandler)
				.failureHandler(ajaxAuthenticationFailureHandler)
				.permitAll()
				.and()
			.logout()
				.logoutUrl("/logout")
				.logoutSuccessHandler(ajaxLogoutSuccessHandler)
				.deleteCookies("JSESSIONID")
				.permitAll()
				.and()
			.csrf()
				.disable()	// for now
			.authorizeRequests()
				.antMatchers(HttpMethod.GET, 		"/").permitAll()
				
				.antMatchers(HttpMethod.OPTIONS, 	"/backendapp/products").permitAll()
				.antMatchers(HttpMethod.GET, 		"/backendapp/products").permitAll()				
				.antMatchers(HttpMethod.POST, 		"/backendapp/products").hasRole("ADMIN")
				.antMatchers(HttpMethod.OPTIONS, 	"/backendapp/products/*").permitAll()
				.antMatchers(HttpMethod.POST, 		"/backendapp/products/*").hasRole("ADMIN")
				.antMatchers(HttpMethod.DELETE, 	"/backendapp/products/*").hasRole("ADMIN")
				
				.antMatchers(HttpMethod.OPTIONS, 	"/backendapp/orders").permitAll()
				.antMatchers(HttpMethod.POST, 		"/backendapp/orders").permitAll()
				.antMatchers(HttpMethod.GET, 		"/backendapp/orders").authenticated()				
				.antMatchers("/**").denyAll();
	}
		
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring()
			.antMatchers("/static/**")
			.antMatchers("/favicon.ico");
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth)	throws Exception {
		auth
			.userDetailsService(userDetailsService);
		// No registration form yet
		//			.passwordEncoder(passwordEncoder());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
    @EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true)
    private static class GlobalSecurityConfiguration extends GlobalMethodSecurityConfiguration {
    }
}
