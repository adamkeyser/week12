import {TestBed, inject} from "@angular/core/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ArticleDetailResolverService} from "./article-detail-resolver.service";
import {ArticleService} from "../services/article.service";
import {HttpModule} from "@angular/http";
import {ActivatedRouteSnapshot} from "@angular/router";
import createSpy = jasmine.createSpy;
import createSpyObj = jasmine.createSpyObj;
import any = jasmine.any;
import {Observable} from "rxjs";
import {Article} from "../article";

describe('ArticleDetailResolverService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ArticleDetailResolverService, ArticleService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should call get Article for foo/7/1', inject([ArticleDetailResolverService], (service: ArticleDetailResolverService) => {
    expect(service).toBeTruthy();

    let mockRouter = createSpyObj<ActivatedRouteSnapshot>('mockRouter', ['toString']);
    mockRouter.params = {id: '1', category: 'foo', time: '7'};

    let articleService = TestBed.get(ArticleService);
    let expectedArticle = new Article();
    let spy = spyOn(articleService, 'getArticle').and.returnValue(Observable.of(expectedArticle));

    service.resolve(mockRouter, null).subscribe(article => expect(article).toEqual(expectedArticle));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("foo", "7", "1");
  }));
});
