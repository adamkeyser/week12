package edu.umn.msse.security

import com.fasterxml.jackson.databind.ObjectMapper
import edu.umn.msse.domain.AccountCredentials
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter
import org.springframework.security.web.util.matcher.AntPathRequestMatcher

import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

  private TokenAuthenticationService tokenAuthenticationService

  JWTLoginFilter(String url, AuthenticationManager authenticationManager) {
    super(new AntPathRequestMatcher(url))
    setAuthenticationManager(authenticationManager)
    tokenAuthenticationService = new TokenAuthenticationService()
  }

  @Override
  Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
      throws AuthenticationException, IOException, ServletException {
    AccountCredentials credentials = new ObjectMapper().readValue(httpServletRequest.getInputStream(), AccountCredentials.class)
    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(credentials.username, credentials.password)
    return getAuthenticationManager().authenticate(token)
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication)
      throws IOException, ServletException {
    String name = authentication.name
    tokenAuthenticationService.createAndAddTokenToResponse(response, name)
  }
}
