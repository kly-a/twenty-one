import { Card } from './card'

export class Deck {
	cards: Card[]

	constructor() {
		this.cards = [];
		for (let suit = 1; suit <= 4; suit++) { 
			for (let rank = 1; rank <= 13; rank++) {
				this.cards.push(new Card(rank, suit))
			}
		}
	}

	// shuffle deck of cards
	shuffle(): void {
	  	for (let i = 0; i < this.cards.length; i++) {
	  		let card = this.cards[i];
	  		card.swap(this.cards[Math.floor(Math.random() * this.cards.length)])
		}
	}

	// toggle hide or display all cards
	toggle(): void {
		for (let i = 0; i < this.cards.length; i++) {
      		this.cards[i].isHidden = !this.cards[i].isHidden
      		this.cards[i].onToggle = true
    	}
	}

	// get a card from the deck
	getCard(): Card {
		if (!this.cards.length) return
		const index = Math.floor(Math.random() * this.cards.length)
		const card = this.cards[index]
		this.cards.splice(index, 1) // remove from deck
		return card
	}
}