import { TestBed, async, inject } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { DeckComponent } from './deck.component';


describe('Component: Deck', () => {
	let fixture, deckComponent, deck, cards, element, de;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CardComponent, DeckComponent ],
			providers: []
		});

		fixture = TestBed.createComponent(DeckComponent);
		deckComponent = fixture.componentInstance; // to access properties and methods
		element = fixture.nativeElement; 	 // to access DOM element
		de 		= fixture.debugElement; 	 // test helper
		deck 	= deckComponent.deck;
	}));

	// specs
	it('should create a Deck', async(() => {
		expect(deck).toBeTruthy();
	}));

	it('should have 52 cards', async(() => {
		const cards = deck.cards;
		expect(cards.length).toEqual(52);
	}));
});
