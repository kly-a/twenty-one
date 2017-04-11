import { TestBed, async, inject } from '@angular/core/testing';

import { CardComponent } from './card.component';

class MockCardService {
	public rank: any = 2;
	public suit: any = 'Spades';
}

describe('Component: Card', () => {
	let fixture, card, element, de, service;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CardComponent ],
			providers: [ MockCardService ]
		});

		fixture = TestBed.createComponent(CardComponent);
		card 	= fixture.componentInstance; // to access properties and methods
		element = fixture.nativeElement; 	 // to access DOM element
		de 		= fixture.debugElement; 	 // test helper
		service = fixture.debugElement.injector.get(MockCardService);
	}));

	// specs
	it('should create a Card', async(() => {
		expect(card).toBeTruthy();
	}));

	it('should be 2 of Spades', inject([MockCardService], service => {
		expect(service.rank).toBe(2);
		expect(service.suit).toBe('Spades');
	}));

	// it('should be 4 of Hearts', inject([MockCardService], service => {
	// 	card.rank = 4;
	// 	card.suit = 'Hearts';
	// 	fixture.detectChanges();

	// 	expect(service.rank).toBe(4);
	// 	expect(service.suit).toBe('Hearts');
	// }));
});
