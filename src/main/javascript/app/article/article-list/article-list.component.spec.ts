import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ArticleListComponent} from "./article-list.component";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpModule} from "@angular/http";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import createSpyObj = jasmine.createSpyObj;

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;

  beforeEach(async(() => {
    let mockActivatedRoute = createSpyObj<ActivatedRoute>('mockActivatedRoute', ['toString']);
    let mockRouter = createSpyObj<Router>('mockRouter', ['toString']);
    let mockData = createSpyObj<Data>('mockData', ['toString']);

    let mockArticle1 = {id: 1, title: 'title', byline: 'byline', abstract: 'abstract', media: [{caption: 'caption1', 'media-metadata': [{url: "foo1"}, {url: "foo2"}, {url: "foo3"}]}]};
    let mockArticle2 = {id: 2, title: 'title2', byline: 'byline2', abstract: 'abstract2', media: [{caption: 'caption2', 'media-metadata': [{url: "foo1"}, {url: "foo2"}]}]};

    mockActivatedRoute.data = Observable.of({articleList: {category: "foo", time: "bar", articles: [mockArticle1, mockArticle2]}});

    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ArticleListComponent],
      providers: [{provide: ActivatedRoute, useValue: mockActivatedRoute}, {provide: Router, useValue: mockRouter}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have article 1', () => {
    const compiled = fixture.debugElement.nativeElement;
    let image = compiled.querySelector("div[id=_1] img");
    expect(image).toBeDefined();
    expect(image.attributes.getNamedItem("src").value).toEqual("foo3");
    expect(image.attributes.getNamedItem("alt").value).toEqual("caption1");

    expect(compiled.querySelector("div[id=_1]").querySelector("h3").textContent).toEqual('title');
    expect(compiled.querySelector("div[id=_1]").querySelector("h4").textContent).toEqual('byline');
    expect(compiled.querySelector("div[id=_1]").querySelector("p").textContent).toEqual('abstract');

  });

  it('should have article 2', () => {
    const compiled = fixture.debugElement.nativeElement;
    let image = compiled.querySelector("div[id=_2] img");
    expect(image).toBeDefined();
    expect(image.attributes.getNamedItem("src").value).toEqual("foo2");
    expect(image.attributes.getNamedItem("alt").value).toEqual("caption2");

    expect(compiled.querySelector("div[id=_2]").querySelector("h3").textContent).toEqual('title2');
    expect(compiled.querySelector("div[id=_2]").querySelector("h4").textContent).toEqual('byline2');
    expect(compiled.querySelector("div[id=_2]").querySelector("p").textContent).toEqual('abstract2');
  });
});
