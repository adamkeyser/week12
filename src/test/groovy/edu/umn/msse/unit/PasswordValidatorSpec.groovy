package edu.umn.msse.unit

import edu.umn.msse.validator.PasswordValidator
import spock.lang.Specification
import spock.lang.Unroll

@Unroll
class PasswordValidatorSpec extends Specification {

  def "validate password"() {
    setup:
    PasswordValidator validator = new PasswordValidator()

    when:
    def actual = validator.isValid(password, null)

    then:
    actual == expected

    where:
    description                              | password                       | expected
    "null"                                   | null                           | false
    "empty"                                  | ""                             | false
    "short"                                  | "aA%"                          | false
    "within size range - no symbol"          | "12345Aa"                      | false
    "within size range - no lowercase alpha" | "12345A%"                      | false
    "within size range - no uppercase alpha" | "12345a%"                      | false
    "within size range - no number"          | "AAAAAa%"                      | false
    "too long"                               | "AAAAAaa1111111111111111111a%" | false
    "within size range - valid"              | "AAAAAa1%"                     | true

  }
}
