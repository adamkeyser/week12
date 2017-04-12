import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {UserService} from "./services/user.service";
import { UserListComponent } from './user-list/user-list.component';
import {UserRoutingModule} from "./user-routing.module";
import {LabelCasePipe} from "./pipes/label-case.pipe";
import { UserRegisterComponent } from './user-register/user-register.component';

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    CommonModule,
    NgbModule.forRoot(),
    UserRoutingModule
  ],
  declarations: [UserListComponent, LabelCasePipe, UserRegisterComponent],
  providers: [UserService]
})
export class UserModule {
}
