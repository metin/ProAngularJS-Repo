package org.joolzminer.examples.sip.security;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

@Component
public class SameAddressAllowedOriginResolver implements AllowedOriginResolver {
	public String getAllowedOrigin(HttpServletRequest request) {
		return request.getHeader("origin");
	}
}
