import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {UserListComponent} from "./user-list/user-list.component";
import {UserResolver} from "./resolves/user.resolver";
import {UserService} from "./services/user.service";
import {UserRegisterComponent} from "./user-register/user-register.component";

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    resolve: {
      users: UserResolver
    }
  },
  {
    path: 'users/add',
    component: UserRegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserService, UserResolver]
})
export class UserRoutingModule {
}
