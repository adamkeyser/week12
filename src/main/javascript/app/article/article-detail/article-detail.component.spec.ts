import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ArticleDetailComponent} from "./article-detail.component";
import {HttpModule} from "@angular/http";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ActivatedRoute, Data} from "@angular/router";
import {Observable} from "rxjs";
import createSpyObj = jasmine.createSpyObj;

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;

  beforeEach(async(() => {
    let mockActivatedRoute = createSpyObj<ActivatedRoute>('mockActivatedRoute', ['toString']);
    mockActivatedRoute.data = Observable.of({article: {title: 'title', byline: 'byline', abstract: 'abstract', media: [{'media-metadata': [{url: "foo"}, {url: "foo"}, {url: "foo"}]}]}});

    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ArticleDetailComponent],
      providers: [{provide: ActivatedRoute, useValue: mockActivatedRoute}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title h1', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('title');
  });

  it('should have byline h2', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('byline');
  });


  it('should have blockquote h3 abstract', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('abstract');
  });

});
