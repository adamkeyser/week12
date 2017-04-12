import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ArticleDetailComponent} from "./article-detail/article-detail.component";
import {ArticleDetailResolverService} from "./article-detail/article-detail-resolver.service";
import {ArticleListComponent} from "./article-list/article-list.component";
import {ArticleListResolverService} from "./article-list/article-list-resolver.service";


const routes: Routes = [
  {
    path: 'articles/:category/:time/:id',
    component: ArticleDetailComponent,
    resolve: {
      article: ArticleDetailResolverService
    }
  },
  {
    path: 'articles/:category/:time',
    component: ArticleListComponent,
    resolve: {
      articleList: ArticleListResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ArticleDetailResolverService, ArticleListResolverService]
})
export class ArticleRoutingModule {
}
