import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AboutComponent} from "./about/about.component";
import {ArticleModule} from "./article/article.module";
import {AuthenticationService} from "./services/authentication.service";
import {AlertService} from "./services/alert.service";
import {AuthGuard} from "./guards/auth.guard";
import {UserModule} from "./user/user.module";
import { BirthdayValidatorDirective } from './validators/birthday-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BirthdayValidatorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ArticleModule,
    UserModule
  ],
  providers: [AuthGuard, AlertService,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
