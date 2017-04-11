import { Component, Input, state, style, trigger, transition, animate } from '@angular/core';
import { Card } from './card';

@Component({
	selector: 'card',
	template: `
        <div [@flyInOut]="card.state" id="{{card.rank}}_{{card.suit}}" 
        	 (click)="card.onToggle? toggle(card): ''"
        	 class="card"
        	 [class.card-hidden]="card.isHidden">
        	 
        	 <span [class.card-red]="card.suit === 3 || card.suit === 4" 
        	 	   [innerHtml]="card.face"></span>
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
	],
	animations: [
	  trigger('flyInOut', [
	    state('in', style({opacity: 1, transform: 'translateX(0)'})),
	    transition('void => *', [
	      style({
	        opacity: 0,
	        transform: 'translateX(-100%)'
	      }),
	      animate('0.2s ease-in')
	    ]),
	    transition('* => void', [
	      animate('0.2s 10 ease-out', style({
	        opacity: 0,
	        transform: 'translateX(100%)'
	      }))
	    ])
	  ])
	]
})

export class CardComponent {
	@Input() card: Card

	state = 'in'
	toggle(card: Card){
		card.toggle()
	}
}
