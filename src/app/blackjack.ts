import { Deck } from './deck';
import { Card } from './card';
import { History } from './history';

export class Game {
	deck: Deck
	player: Player
	dealer: Player
	state: {
		history: History[],
		isReady: boolean
	};

	constructor() {
		this.deck 	= new Deck()
		this.player = new Player()
		this.dealer = new Player()
		this.dealer.setDealer()
		this.state = {
			history: [],
			isReady: false
		}
	}

	dealTwoCards() {
		if (!this.deck.cards.length) return

		// deal player's cards
		this.player.hand.push(this.deck.getCard())
		this.player.hand.push(this.deck.getCard())
		this.setCardValues(this.player);

		// deal dealer's cards
		const card = this.deck.getCard()
		card.isHidden = true; 	// set one card face down
		this.dealer.hand.push(card);
		this.dealer.hand.push(this.deck.getCard())
		this.setCardValues(this.dealer);
		this.setHistory('Game starts. Your turn')
		this.state.isReady = true;
	}
	
	dealCard(): void {
		if (!this.deck.cards.length) return
		const card = this.deck.getCard()
		this.player.hand.push(card)
		this.setCardValues(this.player)
		this.setHistory('You dealt a card')
	}

	dealDealerCard() {
		if (!this.deck.cards.length) return
		while(this.getCardValues(this.dealer) < 17) {
			// setTimeout(function() {
			// 	const card = this.deck.getCard();
			// 	this.dealer.hand.push(card);
			// }, 3000);
			const card = this.deck.getCard()
			this.dealer.hand.push(card)
			this.setCardValues(this.dealer)
			this.setHistory('Dealer dealt a card')
		}
		this.setHistory('Dealer stand.. your turn')
	}

	setCardValues(player: Player): void {
		let v = 0
		for (let i = 0; i < player.hand.length; i++) {
			let card = player.hand[i]
			v += card.value
		}
		player.cardValues = v
	}

	getCardValues(player: Player): number {
		if (player.isDealer) return this.dealer.cardValues
		else return this.player.cardValues
	}

	checkCurrentCardValues() {
		const p = this.player.cardValues
		const d = this.dealer.cardValues

		if (p === 21) {
			this.setHistory('21! You win')
			return {
				flag: 0,
				description: '21! You win'
			};
		}
		if (p > 21) {
			this.setHistory('Bust! Dealer wins')
			return {
				flag: 1,
				description: 'Bust! Dealer wins'
			};
		}
		if (d === 21) {
			this.setHistory('21! Dealer wins')
			return {
				flag: 2,
				description: '21! Dealer wins'
			}
		}
		if (d > 21) {
			this.setHistory('Bust! You win')
			return {
				flag: 3,
				description: 'Bust! You win'
			}
		}
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
				flag: 0,
				description: 'Game draw!'
			}
		} else if (p > d) {
			this.setHistory('You win')
			return {
				flag: 1,
				description: 'You win'
			}
		} else if (p < d) {
			this.setHistory('Dealer wins')
			return {
				flag: 2,
				description: 'Dealer wins'
			}
		}
	}
}

export class Player {
	hand;
	cardValues: number
	isDealer: boolean

	constructor() {
		this.hand = []
		this.cardValues = 0
		this.isDealer = false
	}

	setDealer() {
		this.isDealer = true
	}
}
