import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Article} from "../article";
import {Observable} from "rxjs";

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ArticleService {

  private articlesUrl = 'api/articles/';

  constructor(private http: Http) {
  }

  getArticles(category: string, time: number): Observable<Article[]> {
    let queryUrl = this.articlesUrl + category + '/' + time;
    return this.http
      .get(queryUrl)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getArticle(category: string, time: number, id: number): Observable<Article> {
    let queryUrl = this.articlesUrl + category + '/' + time;
    return this.http
      .get(queryUrl)
      .map(this.extractData)
      .map(articles => this.findArticle(articles, id))

  }

  private  findArticle(articles: Article[], id: number): Article{
    return articles.find(article => article.id == id)
  }

  private extractData(res: Response) {
    let body = res.json().results;
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
