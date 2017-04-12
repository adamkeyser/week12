import {Component, OnInit} from "@angular/core";
import {Article} from "../article";
import {Router, ActivatedRoute} from "@angular/router";
import {ArticleList} from "../article-list";


@Component({
  selector: 'app-article-list',
  templateUrl: 'article-list.component.html',
  styleUrls: ['article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  private articles: Article[];

  private categories: string[];
  private selectedCategory: string;

  private times: string[];
  private selectedTime: string;

  private errorMessage: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.categories = ["arts", "automobiles", "blogs", "books", "education", "food", "health", "magazine", "movies", "science", "technology", "world", "your money"];
    this.times = ["1", "7", "30"];
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: {articleList: ArticleList}) => {
      console.error("In subscribe!")
        this.selectedCategory = data.articleList.category;
        this.selectedTime = data.articleList.time;
        this.articles = data.articleList.articles;
      });
  }

  getArticleImageUrl(article: Article) {
      let media = article["media"][0];
      let mediaMetadata = media['media-metadata'];
      let imageCount = mediaMetadata.length;
      return mediaMetadata[imageCount - 1].url;
  }

  getArticleId(article: Article){
    return "_" + article.id;
  }

  onSelect(article: Article) {
    this.router.navigate(['/articles', this.selectedCategory, this.selectedTime, article.id]);
  }

  onTimeChange(timeValue: string) {
    this.selectedTime = timeValue;
    this.router.navigate(['/articles',this.selectedCategory, this.selectedTime])
  }

  onCategoryChange(categoryValue) {
    this.selectedCategory = categoryValue;
    this.router.navigate(['/articles',this.selectedCategory, this.selectedTime])
  }


}
