import { Deck } from './deck';
import { Card } from './card';
import { History } from './history';

export class Game {
	deck: Deck
	player: Player
	dealer: Player
	state: {
		history: History[],
	};

	constructor() {
		this.deck 	= new Deck()
		this.player = new Player()
		this.dealer = new Player()
		this.dealer.setDealer()
		this.state = {
			history: []
		}
	}

	dealTwoCards() {
		if (!this.deck.cards.length) return

		// deal player's cards
		for (let i = 0; i < 2; i++) {
			this.player.hand.push(this.deck.getCard())
		}
		this.player.calculateCardValues();

		// deal dealer's cards	
		const card = this.deck.getCard()
		card.setHidden() // set one card face down
		this.dealer.hand.push(card)
		this.dealer.hand.push(this.deck.getCard())
		this.dealer.calculateCardValues();
		
		this.setHistory('Game starts. Your turn')
	}
	
	dealCard() {
		if (!this.deck.cards.length) return

		this.player.hand.push(this.deck.getCard())
		this.setHistory('You dealt a card')

		this.player.calculateCardValues()
		switch (this.player.status) {
	      case 'Blackjack':
	        this.setHistory('Blackjack! You win')
	        break;
	      case 'Bust':
	        this.setHistory('Bust. Dealer wins')
	        break;
	      default:
	        break;
	    }
	}

	dealDealerCard() {
		if (!this.deck.cards.length) return

		if (this.dealer.cardValues >= 17 && this.dealer.cardValues <= 21) {
			this.setHistory('Dealer stands.. your turn')
			return
		}
		this.dealer.hand.push(this.deck.getCard())
		this.setHistory('Dealer dealt a card')

		this.dealer.calculateCardValues()
		switch (this.dealer.status) {
	      case 'Blackjack':
	        this.setHistory('Blackjack! Dealer wins')
	        break;
	      case 'Bust':
	        this.setHistory('Bust. Player win')
	        break;
	      default:
	        break;
	    }

		setTimeout(() => this.dealDealerCard(), 1000)
	}

	getCardValues(player: Player): number {
		if (player.isDealer) return this.dealer.cardValues
		else return this.player.cardValues
	}

	setHistory(string) {
		const history = new History(string)
		this.state.history.push(history)
	}

	settle() {
		this.setHistory('Settling bets..')
		const p = this.player.cardValues
		const d = this.dealer.cardValues

		if (p === d) {
			this.setHistory('Game draw!')
			return {
				flag: 'Draw',
				description: 'Game draw!'
			}
		} else if (p > d) {
			this.setHistory('You win')
			return {
				flag: 'PlayerWins',
				description: 'You win'
			}
		} else if (p < d) {
			this.setHistory('Dealer wins')
			return {
				flag: 'DealerWins',
				description: 'Dealer wins'
			}
		}
	}
}

export class Player {
	hand;
	cardValues: number
	isDealer: boolean
	status: any

	constructor() {
		this.hand = []
		this.cardValues = 0
		this.isDealer = false
	}

	setDealer() {
		this.isDealer = true
	}

	calculateCardValues() {
		const firstTwoCards = this.hand.length === 1 ? true : false
		
		let v = 0
		for (let i = 0; i < this.hand.length; i++) {
			let card = this.hand[i]
			v += card.value
		}
		this.cardValues = v

		if (firstTwoCards && v === 21) {
			this.status = 'Blackjack'
		}
		if (v > 21) {
			this.status = 'Bust'
		}
	}
}
