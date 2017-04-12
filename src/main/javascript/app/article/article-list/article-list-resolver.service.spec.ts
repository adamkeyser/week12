import { TestBed, inject } from '@angular/core/testing';

import { ArticleListResolverService } from './article-list-resolver.service';
import {HttpModule} from "@angular/http";
import {ArticleService} from "../services/article.service";
import {ActivatedRouteSnapshot} from "@angular/router";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import createSpyObj = jasmine.createSpyObj;
import {Article} from "../article";
import {Observable} from "rxjs";
import {ArticleList} from "../article-list";

describe('ArticleListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ArticleListResolverService, ArticleService, {provide: ActivatedRouteSnapshot}],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should call get Articles for foo/7', inject([ArticleListResolverService], (service: ArticleListResolverService) => {
    expect(service).toBeTruthy();

    let mockRouter = createSpyObj<ActivatedRouteSnapshot>('mockRouter', ['toString']);
    mockRouter.params = {category: 'foo', time: '7'};

    let articleService = TestBed.get(ArticleService);
    let expectedArticles = [new Article()];
    let expectedArticlesList = new ArticleList("foo", "7", expectedArticles)
    let spy = spyOn(articleService, 'getArticles').and.returnValue(Observable.of(expectedArticles));

    service.resolve(mockRouter, null).subscribe(articleList => expect(articleList).toEqual(expectedArticlesList));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("foo", "7");
  }));
});
