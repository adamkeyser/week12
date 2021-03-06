package edu.umn.msse.security

import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.GenericFilterBean

import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest


class JWTAuthenticationFilter extends GenericFilterBean{

  @Override
  void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
    Authentication authentication = new TokenAuthenticationService().parseAndValidateToken((HttpServletRequest)request)

    SecurityContextHolder.getContext().setAuthentication(authentication)
    filterChain.doFilter(request,response)
  }
}

