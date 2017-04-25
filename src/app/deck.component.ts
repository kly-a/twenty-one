import { Component, Input } from '@angular/core';
import { Deck } from './deck';
import { Card } from './card';

const DECK: Deck = new Deck();

@Component({
	selector: 'deck',
	template: `
		<h1>{{title}}</h1>
		<div class="buttons">
			<a id="shuffleCards" href="javascript:;" (click)="shuffleCards()">Shuffle</a> or 
			<a id="toggleAll" href="javascript:;" (click)="toggleAll()">Toggle</a>
		</div>
		<card *ngFor='let card of deck.cards' [card]="card"></card>
	`,
	styles: [`
		h1 {
			color: #000;
			font-size: 220%;
			text-align: center;
		}
		.buttons {
			margin: 10px 0;
			text-align: center;
		}
	`
	]
})

export class DeckComponent {
	@Input() deck = DECK

	title = "deck of cards"

	shuffleCards() {
		this.deck.shuffle()
	}

	toggleAll() {
		this.deck.toggle()
	}
}