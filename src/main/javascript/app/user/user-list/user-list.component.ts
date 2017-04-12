import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Observable, Subscriber} from "rxjs";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-admin-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any = [];

  time = new Observable<string>((observer: Subscriber<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: {users: any}) => {
        this.users = data.users;
      });
  }

  deleteUser(user: any) {
    this.userService.delete(user.id).subscribe(
    data => {
      let index: number = this.users.indexOf(user, 0);
      if (index > -1) {
        this.users.splice(index, 1);
      }
    }
    )
  }
}
