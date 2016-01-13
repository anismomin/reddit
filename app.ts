import {Component} from 'angular2/core'
import {bootstrap} from 'angular2/platform/browser'


@Component({
	selector: 'reddit',
	template: `
		<form class="ui large form segment">
			<h3 class="ui header">Add a Link</h3>

		 	<div class="field">
			 	<label for="title">Title:</label>
			 	<input name="title" (focus)="checkevent()" #newtitle>
		 	</div>
		 	<div class="field">
			 	<label for="link">Link:</label>
			 	<input name="link" (focus)="checkevent()"  #newlink>
		 	</div>
		 	<button (click)="addArticle(newtitle, newlink)" class="ui positive right floated button">
			 Submit link
		 	</button>
	 	</form>
	`
})
class HelloWorld {
	
	
	constructor(){
		
	}

	addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
		 console.log(`Adding article title: ${title.value} and link: ${link.value}`);
		
	}

	checkevent(){
		alert('asasd');
	}

}


bootstrap(HelloWorld)