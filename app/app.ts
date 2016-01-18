import {Component} from 'angular2/core'
import {bootstrap} from 'angular2/platform/browser'
import {Article} from './article'
import {ArticleComponent} from './article-component'


@Component({
	selector: 'reddit',
	template: `
		<form class="ui large form segment">
			<h3 class="ui header">Add a Link</h3>
		 	<div class="field">
			 	<label for="title">Title:</label>
			 	<input name="title" #newtitle>
		 	</div>
		 	<div class="field">
			 	<label for="link">Link:</label>
			 	<input name="link"  #newlink>
		 	</div>
		 	<button (click)="addArticle(newtitle, newlink)" class="ui positive right floated button">
			 Submit link
		 	</button>
	 	</form>
	 	<div class="ui grid posts">
			<reddit-article *ngFor="#article of sortedArticles()" [article]="article" >
			</reddit-article>
		</div>
	`,
	directives: [ArticleComponent]
})
class RedditApp {
	
	articles: Article[];

	constructor() {
		this.articles = [
			new Article('anismomin', 'http://github.com/anismomin', 500),
			new Article('facebook', 'http://facebook.com/anismomin', 400),
			new Article('angular', 'http://angular.io', 700),
		];

	}

	addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
		this.articles.push(new Article(title.value, link.value, 0));
		title.value = '';
		link.value = '';
		let str = `Adding article title: ${title.value} and <br> link: ${link.value}`;
		console.log(str);	
	}

	sortedArticles(): Article[] {
		return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
	}
	
}

bootstrap(RedditApp)