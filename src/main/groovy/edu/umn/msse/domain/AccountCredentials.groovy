package edu.umn.msse.domain

import edu.umn.msse.validator.Password

import javax.validation.constraints.Size


class AccountCredentials {
  @Size(min = 2, max=25)
  String username

  @Password
  String password
}
