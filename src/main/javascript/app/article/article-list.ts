import {Article} from "./article";
export class ArticleList {
  category: string;
  time: string;
  articles: Article[];

  constructor(category: string, time: string, articles: Article[]){
    this.category = category;
    this.time = time;
    this.articles = articles;
  }
}
