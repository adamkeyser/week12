package edu.umn.msse.domain

import edu.umn.msse.validator.Password
import groovy.transform.EqualsAndHashCode
import org.hibernate.validator.constraints.Email
import org.hibernate.validator.constraints.NotEmpty

import javax.validation.constraints.Size

@EqualsAndHashCode
class Account {

  @Size(min = 2, max = 25)
  String username

  @Password
  String password

  @Email
  String emailAddress
}
