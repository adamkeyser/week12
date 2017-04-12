package edu.umn.msse.validator


import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext
import java.util.regex.Matcher
import java.util.regex.Pattern

class PasswordValidator implements ConstraintValidator<Password, String> {

  private Pattern pattern
  private Matcher matcher

  private static final String PASSWORD_PATTERN = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})'

  PasswordValidator() {
    pattern = Pattern.compile(PASSWORD_PATTERN)
  }

  @Override
  void initialize(Password constraintAnnotation) {

  }

  @Override
  boolean isValid(String value, ConstraintValidatorContext context) {
    if(!value){
      return false
    }

    matcher = pattern.matcher(value)
    return matcher.matches()
  }
}

