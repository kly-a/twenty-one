import { TestBed, async } from '@angular/core/testing';

import { HistoryComponent } from './history.component';

describe('Component: History', () => {
	let fixture, history, element, de;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ HistoryComponent ]
		});

		fixture = TestBed.createComponent(HistoryComponent);
		history = fixture.componentInstance; // to access properties and methods
		element = fixture.nativeElement; 	 // to access DOM element
		de = fixture.debugElement; 			 // test helper
	}));

	// specs
	it('should render `Blackjack precursor was twenty-one`', async(() => {
		history.history.description = 'Blackjack precursor was twenty-one';
		fixture.detectChanges(); // trigger change detection
		fixture.whenStable().then(() => {
			expect(element.querySelector('p').innerText).toBe('Blackjack precursor was twenty-one');
		});
	}));
})