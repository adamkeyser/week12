import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ArticleListComponent} from "./article-list/article-list.component";
import {ArticleDetailComponent} from "./article-detail/article-detail.component";
import {ArticleService} from "./services/article.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ArticleRoutingModule} from "./article-routing.module";

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    CommonModule,
    NgbModule.forRoot(),
    ArticleRoutingModule
  ],
  declarations: [ArticleListComponent, ArticleDetailComponent],
  providers: [ArticleService]
})
export class ArticleModule {
}
