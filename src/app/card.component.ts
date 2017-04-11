import { Component, Input } from '@angular/core';
import { Card } from './card';

@Component({
	selector: 'card',
	template: `
        <div id="{{card.rank}}_{{card.suit}}" 
        	 (click)="card.onToggle? toggle(card): ''"
        	 class="card"
        	 [class.card-hidden]="card.isHidden">

        	<span *ngIf="card.suit === 'Clubs'">
        	 	{{card.face}} &clubs;
			</span>
	        <span *ngIf="card.suit === 'Spades'">
				{{card.face}} &spades;
			</span>
	        <span class="card-red" *ngIf="card.suit === 'Diamonds'">
				{{card.face}} &diams;
			</span>
	        <span class="card-red" *ngIf="card.suit === 'Hearts'">
				{{card.face}} &hearts;
			</span>
		</div>
	`,
	styles: [`
		.card {
			width: 50px;
			height: 75px;
			background-color: white;
			border: 3px solid white;
			border-radius: 3px;
			margin: 5px;
			display: inline-block;
			font-size: 16px;
			padding: 2px 4px;
			box-shadow: 0 0 1px #888888;
			cursor: pointer;
		}
		.card-hidden {
			background-color: #AB201B;
			color: #AB201B !important;
		}
		.card-red {
			color: #AB201B;
		}
	`
	]
})

export class CardComponent {
	@Input() card: Card

	toggle(card: Card){
		card.toggle()
	}
}
