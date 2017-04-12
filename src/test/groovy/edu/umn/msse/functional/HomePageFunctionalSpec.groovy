package edu.umn.msse.functional

import edu.umn.msse.pages.HomePage
import geb.spock.GebReportingSpec
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest


class HomePageFunctionalSpec extends BaseGebSpec {
  def "home page"(){
    when:
    HomePage homePage = to(HomePage)

    then:
    homePage.homePageHeader == 'NYT Viewer'
  }
}

