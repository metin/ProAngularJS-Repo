package org.joolzminer.examples.sip.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
//		registry.addViewController("/home").setViewName("home");
		registry.addViewController("/").setViewName("redirect:/clientapp/index.html");
		registry.addViewController("/admin").setViewName("redirect:/adminapp/admin.html");
//		registry.addViewController("/login").setViewName("login");
//		registry.addViewController("/admin").setViewName("admin");
	}	
}
