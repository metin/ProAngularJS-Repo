package org.joolzminer.examples.sip.security;

import javax.servlet.http.HttpServletRequest;

public interface AllowedOriginResolver {
	String getAllowedOrigin(HttpServletRequest request);
}
