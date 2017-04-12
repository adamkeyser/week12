import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import {HttpModule} from "@angular/http";
import {NO_ERRORS_SCHEMA, DebugElement} from "@angular/core";
import {ActivatedRoute, Router, Data} from "@angular/router";
import {Observable} from "rxjs";
import createSpyObj = jasmine.createSpyObj;
import {LabelCasePipe} from "../pipes/label-case.pipe";

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    let mockActivatedRoute = createSpyObj<ActivatedRoute>('mockActivatedRoute', ['toString']);
    let mockRouter = createSpyObj<Router>('mockRouter', ['toString']);
    let mockData = createSpyObj<Data>('mockData', ['toString']);

    mockActivatedRoute.data = Observable.of({users: [{id: 1, firstName: "first", lastName: "last"}, {id: 2, firstName: "ted"}]});

    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ UserListComponent, LabelCasePipe ],
      providers: [{provide: ActivatedRoute, useValue: mockActivatedRoute}, {provide: Router, useValue: mockRouter}, LabelCasePipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 users', () => {
    expect(component.users.length).toBe(2);
  });

  it('should have piped the name properly', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("table").querySelector("tr[id='1']").querySelector("td[id='UserName1']").textContent).toEqual('First, Last');
    expect(compiled.querySelector("table").querySelector("tr[id='2']").querySelector("td[id='UserName2']").textContent).toEqual("Ted");
  });


});
TestBed.configureTestingModule({


});


