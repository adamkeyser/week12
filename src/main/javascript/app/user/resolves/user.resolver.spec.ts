import { TestBed, inject } from '@angular/core/testing';

import { UserResolver } from './user.resolver';
import {HttpModule} from "@angular/http";
import {UserService} from "../services/user.service";
import {ActivatedRouteSnapshot} from "@angular/router";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('UserResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [UserResolver, UserService, {provide: ActivatedRouteSnapshot}],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should ...', inject([UserResolver], (service: UserResolver) => {
    expect(service).toBeTruthy();
  }));
});


