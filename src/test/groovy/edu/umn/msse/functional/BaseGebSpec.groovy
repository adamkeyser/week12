package edu.umn.msse.functional

import geb.spock.GebReportingSpec
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BaseGebSpec extends GebReportingSpec {
  @Value('${local.server.port}')
  int port

  def setup() {
    browser.setBaseUrl("http://localhost:${port}")
  }
}
