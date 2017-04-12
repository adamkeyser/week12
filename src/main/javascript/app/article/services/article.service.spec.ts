import {TestBed, inject} from "@angular/core/testing";
import {ArticleService} from "./article.service";
import {HttpModule, Http, Response, ResponseOptions, ConnectionBackend} from "@angular/http";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;
import {Observable} from "rxjs";

describe('ArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ArticleService, Http, ConnectionBackend]
    });
  });

  it('should create service', inject([ArticleService], (service: ArticleService) => {
    expect(service).toBeTruthy();
  }));

  it('should get articles', inject([ArticleService], (service: ArticleService) => {
    let http = TestBed.get(Http);
    let response = new Response(new ResponseOptions());
    let responseJson = spyOn(response, 'json').and.returnValue({results: [{id: 1},{id: 2}]});

    let httpGet = spyOn(http, 'get').and.returnValue(Observable.of(response));
    service.getArticles("foo", 1).subscribe(articles => expect(articles).toEqual([{id: 1},{id: 2}]));

    expect(responseJson).toHaveBeenCalledTimes(1);

    expect(httpGet).toHaveBeenCalledWith("api/articles/foo/1");
    expect(httpGet).toHaveBeenCalledTimes(1);
  }));
});
