package edu.umn.msse.functional

import edu.umn.msse.domain.AccountCredentials
import org.hamcrest.core.StringContains
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.client.MockRestServiceServer
import org.springframework.web.client.RestTemplate
import spock.lang.Ignore
import spock.lang.Specification

import static org.springframework.test.web.client.match.MockRestRequestMatchers.method
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo
import static org.springframework.test.web.client.response.MockRestResponseCreators.withBadRequest
import static org.springframework.test.web.client.response.MockRestResponseCreators.withServerError
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess

@ContextConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Ignore
class ArticleFunctionalSpec extends Specification {

  @Autowired
  RestTemplate restTemplate

  @Autowired
  TestRestTemplate testRestTemplate

  MockRestServiceServer mockServer

  def "not authorized"() {
    setup:
    mockServer = MockRestServiceServer.createServer(restTemplate)

    when:
    def responseEntity = testRestTemplate.exchange("/articles/food/1", HttpMethod.GET, new HttpEntity<>(), Map)

    then:
    mockServer.verify()
    responseEntity.statusCode == HttpStatus.FORBIDDEN
  }

  def "get articles"() {
    setup:
    mockServer = MockRestServiceServer.createServer(restTemplate)

    mockServer.expect(requestTo(new StringContains("/svc/mostpopular/v2/mostviewed/food/1.json"))).andExpect(method(HttpMethod.GET))
              .andRespond(withSuccess("{}", MediaType.APPLICATION_JSON_UTF8))
    when:
    def responseEntity = testRestTemplate.exchange("/articles/food/1", HttpMethod.GET, getAuthorizedHttpEntity(), Map)

    then:
    mockServer.verify()
    responseEntity.body == [:]
    responseEntity.statusCode == HttpStatus.OK
  }

  protected HttpEntity getAuthorizedHttpEntity() {
    def loginResponse = testRestTemplate.postForEntity("/login", new AccountCredentials(username: "msse-admin", password: "password"), String)
    def authorizationHeader = loginResponse.headers.get("Authorization")
    def token = authorizationHeader.first().split(' ')[1]
    HttpHeaders headers = new HttpHeaders()
    headers.add("Authorization", token)
    return new HttpEntity<>(headers)
  }

  def "get articles - server errors out"() {
    setup:
    mockServer = MockRestServiceServer.createServer(restTemplate)

    mockServer.expect(requestTo(new StringContains("/svc/mostpopular/v2/mostviewed/food/1.json"))).andExpect(method(HttpMethod.GET))
              .andRespond(withServerError())

    when:
    def responseEntity = testRestTemplate.exchange("/articles/food/1", HttpMethod.GET, getAuthorizedHttpEntity(), Map)

    then:
    mockServer.verify()

    responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR
  }

  def "get articles - bad request"() {
    setup:
    mockServer = MockRestServiceServer.createServer(restTemplate)

    mockServer.expect(requestTo(new StringContains("/svc/mostpopular/v2/mostviewed/food/1.json"))).andExpect(method(HttpMethod.GET))
              .andRespond(withBadRequest())

    when:
    def responseEntity = testRestTemplate.exchange("/articles/food/1", HttpMethod.GET, getAuthorizedHttpEntity(), Map)

    then:
    mockServer.verify()

    responseEntity.statusCode == HttpStatus.BAD_REQUEST
  }


}
