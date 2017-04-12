import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ArticleList} from "../article-list";
import {ArticleService} from "../services/article.service";

@Injectable()
export class ArticleListResolverService implements Resolve<ArticleList> {
  constructor(private articleService: ArticleService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticleList> {
    let category = route.params["category"];
    let time = route.params["time"];
    return this.articleService.getArticles(category, time).map(articles => new ArticleList(category, time, articles))

  }

}
