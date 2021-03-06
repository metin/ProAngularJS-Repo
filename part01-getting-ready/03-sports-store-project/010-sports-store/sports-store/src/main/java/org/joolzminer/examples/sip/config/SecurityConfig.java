package org.joolzminer.examples.sip.config;

import org.joolzminer.examples.sip.security.AjaxAuthenticationFailureHandler;
import org.joolzminer.examples.sip.security.AjaxAuthenticationSuccessHandler;
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
	
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new StandardPasswordEncoder();
    }
    
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.formLogin()
				.usernameParameter("j_username")
				.passwordParameter("j_password")				
				.loginPage("/adminapp/admin.html#/login")
				.loginProcessingUrl("/j_spring_security_check")
				.successHandler(ajaxAuthenticationSuccessHandler)
				.failureHandler(ajaxAuthenticationFailureHandler)
//				.failureUrl("/login?failed=true")
//				.defaultSuccessUrl("/main")
				.permitAll()
				.and()
//			.logout()
//				.logoutSuccessUrl("/home")
//				.permitAll()
//				.deleteCookies("JSESSIONID")
//				.and()
//			.rememberMe()
//				.and()
			.csrf()
				.disable()	// for now
			.authorizeRequests()
				.antMatchers(HttpMethod.GET, "/").permitAll()
				.antMatchers(HttpMethod.GET, "/backendapp/products").permitAll()
				.antMatchers(HttpMethod.POST, "/backendapp/products").permitAll()
				.antMatchers(HttpMethod.POST, "/backendapp/products/*").permitAll()
				.antMatchers(HttpMethod.DELETE, "/backendapp/products/*").permitAll()
				.antMatchers(HttpMethod.POST, "/backendapp/orders").permitAll()
				.antMatchers(HttpMethod.GET, "/backendapp/orders").permitAll()
				.antMatchers(HttpMethod.GET, "/admin").permitAll()
//				.antMatchers(HttpMethod.GET,  "/home").permitAll()
//				.antMatchers(HttpMethod.GET,  "/admin").hasRole("ADMIN")
//				.antMatchers(HttpMethod.GET,  "/forums").authenticated()
//				.antMatchers(HttpMethod.GET,  "/forums/*").authenticated()
//				.antMatchers(HttpMethod.GET,  "/forums/*/*").authenticated()
//				.antMatchers(HttpMethod.POST, "/forums/*/messages/new").authenticated()
//				.antMatchers(HttpMethod.GET,  "/forums/*/messages/*").authenticated()
//				.antMatchers(HttpMethod.GET,  "/forums/*/messages/*/*").authenticated()
//				.antMatchers(HttpMethod.POST, "/forums/*/messages/*").authenticated()
//				.antMatchers(HttpMethod.GET,  "/forums/*/messages/*/edit").authenticated()
//				.antMatchers(HttpMethod.GET,  "/forums/*/messages/*/visible").authenticated()
//				.antMatchers(HttpMethod.GET,  "/forums/*/messages/*/delete").authenticated()
//				.antMatchers(HttpMethod.GET,  "/forums/*/messages/*/delete/*").authenticated()
//				.antMatchers(HttpMethod.GET,  "/accounts/*").authenticated()				
				.antMatchers("/**").denyAll();
	}
		
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring()
			.antMatchers("/clientapp/**/**")
			.antMatchers("/adminapp/**/**")
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
