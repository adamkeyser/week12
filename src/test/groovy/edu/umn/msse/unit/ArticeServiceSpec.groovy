package edu.umn.msse.unit

import edu.umn.msse.service.ArticleService
import org.springframework.http.ResponseEntity
import org.springframework.web.client.RestTemplate
import spock.lang.Specification


class ArticeServiceSpec extends Specification {

  def "get articles"(){
    setup:
    def mockRestTemplate = Mock(RestTemplate)
    def articleService = new ArticleService(restTemplate: mockRestTemplate)
    def mockResponse = Mock(ResponseEntity)

    when:
    def actualResponseEntity = articleService.getArticles("food",1)

    then:
    mockRestTemplate.getForEntity("https://api.nytimes.com/svc/mostpopular/v2/mostviewed/food/1.json?api-key=adfc213719154d82b5fe3ce6a4bfd6bb&offset=0", Map) >> mockResponse
    actualResponseEntity == mockResponse

  }
}
