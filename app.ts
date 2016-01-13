import {Component} from 'angular2/core'
import {bootstrap} from 'angular2/platform/browser'

class Article {

	votes: number;
	title: string;
	link: string;

	constructor(title: string, link: string, votes?: number) {
		this.title = title;
		this.link = link;
		this.votes = votes || 0;

	}

	voteUp(): void {
		this.votes += 1;

	}

	voteDown() {
		this.votes -= 1;

	}

	domain(): string {
		try {
			const link: string = this.link.split('//')[1];
			return link.split('/')[0];

		} catch (err) {
			return null;

		}

	}


}

@Component({
	selector: 'reddit-article',
	inputs: ['article'],
	host: {
		class: 'row'
	},
	template: `
		 <div class="four wide column center aligned votes">
			 <div class="ui statistic">
				 <div class="value">
				 {{ article.votes }}
				 </div>
			 	<div class="label">Points</div>
			 </div>
		 </div>
		 <div class="twelve wide column">
			 <a class="ui large header" href="{{ article.link }}">{{ article.title }}</a>
			 <div class="meta">({{ article.domain() }})</div>
			 <ul class="ui big horizontal list voters">
			 	<li class="item">
			 		<a href (click)="voteUp()">
			 			<i class="arrow up icon"></i> upvote
					</a>
			 	</li>
			 	<li class="item">
			 		<a href (click)="voteDown()">
			 			<i class="arrow down icon"></i> downvote
			 		</a>
			 	</li>
			 </ul>
		 </div>
			 `
})
class ArticleComponent {
	
	article: Article;

	constructor() {
		this.article = new Article('Angular 2', 'http://angular.io');
	}

	VoteUp(): boolean {
		this.article.voteUp();
		return false;
	}

	VoteDown(): boolean {
		this.article.voteDown();
		return false;
	}

}

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
			<reddit-article *ngFor="#article of articles" [article]="article" >
			</reddit-article>
		</div>
	`,
	directives: [ArticleComponent]
})
class RedditApp {
	
	articles: Article[];

	constructor() {
		this.articles = [
			new Article('angular 1', 'http://angular.io', 2),
			new Article('angular 2', 'http://angular.io', 23),
			new Article('angular 3', 'http://angular.io', 5),
		];

	}

	addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
		this.articles.push(new Article(title.value, link.value, 0));
		title.value = '';
		link.value = '';
		let str = `Adding article title: ${title.value} and <br> link: ${link.value}`;
		console.log(str);
		
	}

	checkevent(){
		alert('asasd');
	}

	
}

bootstrap(RedditApp)