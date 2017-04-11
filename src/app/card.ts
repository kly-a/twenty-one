export class Card {
	rank: any
	suit: any
	face: string
	value: number
	isHidden: boolean
	onToggle: boolean

	constructor(rank, suit) {
		this.rank = rank
		this.suit = suit
		this.isHidden = false
		this.onToggle = false
		this.setFaceAndValue()
	}

	// setter 
	setFaceAndValue(): void {
		switch (this.rank) {
			case 11:
				this.value = 10
				this.face  = 'J'
				break
			case 12:
				this.value = 10
				this.face  = 'Q'
				break
			case 13:
				this.value = 10
				this.face  = 'K'
				break
			case 1:
				this.value = 1
				this.face  = 'A'
				break
			default:
				this.value = this.rank
				this.face  = this.rank
				break
		}

		switch (this.suit) {
			case 1:
				this.face += ` &clubs;`
				break;
			case 2:
				this.face += ` &spades;`
				break;
			case 3:
				this.face += ` &diams;`
				break;
			case 4:
				this.face += ` &hearts;`
				break
			default:
				break
		}
	}

	setCard(card: Card): void {
		this.rank = card.rank
		this.suit = card.suit
		this.face = card.face
		this.value = card.value
		this.isHidden = card.isHidden
	}

	setHidden(): void {
		this.face = `&nbsp;`;
		this.isHidden = true;
	}

	setVisible(): void {
		this.setFaceAndValue();
		this.isHidden = false;
	}

	setToggle(): void {
		this.onToggle = true // enabled toggle card on click
	}
	
	// swaps cards
	swap(card: Card): void {
		const tempCard = new Card(card.rank, card.suit)
		tempCard.setCard(card)
		card.setCard(this)
		this.setCard(tempCard)
	}

	// toggle hide or display a card
	toggle(): void {
		this.isHidden = !this.isHidden
	}
}
