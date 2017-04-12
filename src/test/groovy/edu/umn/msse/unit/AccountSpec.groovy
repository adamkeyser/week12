package edu.umn.msse.unit

import edu.umn.msse.domain.Account
import org.hibernate.validator.HibernateValidator
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean
import spock.lang.Specification

class AccountSpec extends Specification {
  def "validate account"() {
    setup:
    LocalValidatorFactoryBean localValidatorFactoryBean = new LocalValidatorFactoryBean()
    localValidatorFactoryBean.setProviderClass(HibernateValidator)
    localValidatorFactoryBean.afterPropertiesSet()
    Account a = new Account(username: username, password: password, emailAddress: email)

    when:
    def constraintViolations = localValidatorFactoryBean.validate(a)

    then:
    def emailViolationError = constraintViolations.find {
      it.message == "not a well-formed email address"
    }

    def passwordViolationError = constraintViolations.find {
      it.message == "Password does not meet the minimum requirements"
    }

    def userError = constraintViolations.find {
      it.message == "size must be between 2 and 25"
    }

    (emailViolationError != null) == emailError
    (passwordViolationError != null) == passwordError
    (userError != null) == usernameError

    where:
    description        | username | password  | email           | usernameError | passwordError | emailError
    "username invalid" | "a"      | "123Aa%!" | "foo@gmail.com" | true          | false         | false
    "password invalid" | "abc"    | "3Aa%!"   | "foo@gmail.com" | false         | true          | false
    "email invalid"    | "abc"    | "123Aa%!" | "foo"           | false         | false         | true
    "all invalid"      | "a"      | "Aa%!"    | "foo"           | true          | true          | true
    "all valid"        | "aa1"    | "Aa123%!" | "foo@gmail.com" | false         | false         | false
  }
}
