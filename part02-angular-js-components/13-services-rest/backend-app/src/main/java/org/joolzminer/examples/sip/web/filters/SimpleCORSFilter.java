package org.joolzminer.examples.sip.web.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.joolzminer.examples.sip.security.AllowedOriginResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SimpleCORSFilter implements Filter {

	@Autowired
	private AllowedOriginResolver allowedOriginResolver;
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		
		String allowedOrigin = allowedOriginResolver.getAllowedOrigin(httpServletRequest);
		
		if (allowedOrigin != null) {
			httpServletResponse.setHeader("Access-Control-Allow-Origin", allowedOrigin);
			httpServletResponse.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
			httpServletResponse.setHeader("Access-Control-Max-Age", "3600");
			httpServletResponse.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
			if (!allowedOrigin.equals('*')) {
				httpServletResponse.setHeader("Access-Control-Allow-Credentials", "true");
			}
		}
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
	}
}
