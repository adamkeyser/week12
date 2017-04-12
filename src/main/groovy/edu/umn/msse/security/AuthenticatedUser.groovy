package edu.umn.msse.security

import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority


class AuthenticatedUser implements Authentication {

  private String name
  private boolean authenticated = true

  AuthenticatedUser(String name) {
    this.name = name
  }

  @Override
  Collection<? extends GrantedAuthority> getAuthorities() {
    return null
  }

  @Override
  Object getCredentials() {
    return null
  }

  @Override
  Object getDetails() {
    return null
  }

  @Override
  Object getPrincipal() {
    return null
  }

  @Override
  boolean isAuthenticated() {
    return this.authenticated
  }

  @Override
  void setAuthenticated(boolean b) throws IllegalArgumentException {
    this.authenticated = b
  }

  @Override
  String getName() {
    return this.name
  }
}
