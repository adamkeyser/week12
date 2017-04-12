import { Component, OnInit, OnChanges } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  model: any = {};
  model2: any = {};

  constructor(private userService: UserService,private router: Router) {
  }

  ngOnInit() {
  }

  saveUser() {
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/users']);
        });
  }

  doSomething(newValue) {

    console.error(newValue)
  }

}
