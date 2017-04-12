package edu.umn.msse.controller

import edu.umn.msse.service.ArticleService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ArticleController {
  @Autowired
  ArticleService articleService

  @GetMapping("/articles/{category}/{time}")
  ResponseEntity getArticlesForTimePeriod(@PathVariable String category, @PathVariable Long time) {
    return articleService.getArticles(category, time)
  }

  @GetMapping("/api/articles/{category}/{time}")
  Map getPublicArticlesForTimePeriod(@PathVariable String category, @PathVariable Long time) {
    return articleService.getArticles(category, time).body as Map
  }
}
