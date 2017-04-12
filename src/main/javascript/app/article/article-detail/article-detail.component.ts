import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Article} from "../article";

@Component({
  selector: 'app-article-detail',
  templateUrl: 'article-detail.component.html',
  styleUrls: ['article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,) {
  }

  private article: Article;

  ngOnInit() {
    this.route.data
      .subscribe((data: {article: Article}) => {
        this.article = data.article;
      });
  }

}
