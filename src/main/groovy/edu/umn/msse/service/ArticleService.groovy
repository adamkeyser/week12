package edu.umn.msse.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.HttpClientErrorException
import org.springframework.web.client.RestTemplate

@Service
class ArticleService {
  @Autowired
  RestTemplate restTemplate

  ResponseEntity getArticles(String category, Long time) {
    try {
      restTemplate.getForEntity("https://api.nytimes.com/svc/mostpopular/v2/mostviewed/${category}/${time}.json?api-key=adfc213719154d82b5fe3ce6a4bfd6bb&offset=0", Map)
    } catch (HttpClientErrorException ex) {
      return new ResponseEntity([error: ex.message], ex.statusCode)
    }
  }
}
