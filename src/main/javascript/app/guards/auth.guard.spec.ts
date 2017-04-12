import {TestBed, async, inject} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {ActivatedRouteSnapshot, ActivatedRoute, Router, Data} from "@angular/router";
import createSpyObj = jasmine.createSpyObj;

describe('AuthGuard', () => {
  let mockActivatedRoute = createSpyObj<ActivatedRoute>('mockActivatedRoute', ['toString']);
  let mockRouter = createSpyObj<Router>('mockRouter', ['toString']);
  let mockData = createSpyObj<Data>('mockData', ['toString']);
  beforeEach(() => {
    TestBed.configureTestingModule({

    providers: [AuthGuard, {provide: ActivatedRoute, useValue: mockActivatedRoute}, {provide: Router, useValue: mockRouter}]
  })
    ;
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});


