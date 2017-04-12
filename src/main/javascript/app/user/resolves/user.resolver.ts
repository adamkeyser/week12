import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../services/user.service";

@Injectable()
export class UserResolver implements Resolve<any>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id = route.params["id"];
    if (id) {
      return this.userService.getById(id);
    }
    return this.userService.getAll();
  }

  constructor(private userService: UserService) { }

}
