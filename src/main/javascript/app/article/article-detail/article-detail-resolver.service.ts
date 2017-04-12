import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ArticleService} from "../services/article.service";
import {Article} from "../article";

@Injectable()
export class ArticleDetailResolverService implements Resolve<Article>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
    let id = route.params['id'];
    let category = route.params['category'];
    let time = route.params['time'];
    return this.articleService.getArticle(category, time, id).first()
  }

  constructor(private articleService: ArticleService) { }

}
