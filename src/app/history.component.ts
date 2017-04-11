import { Component, Input, state, style, trigger, transition, animate } from '@angular/core';
import { History } from './history';

@Component({
	selector: 'history',
	template: `
		<p [@slideInOut]="history.state" >{{history.description}}</p>
	`,
	styles: [`
		p {
			font-size: 12pt;
		}
	`
	],
	animations: [
		trigger('slideInOut', [
			state('in', style({
				transform: 'translate3d(0,0,0)'
			})),
			state('out', style({
				transform: 'translate3d(100%, 0, 0)'
			})),
			transition('in => out', animate('400ms ease-in-out')),
      		transition('out => in', animate('400ms ease-in-out'))
		])
	]
})

export class HistoryComponent {
	@Input() history = History;

	state = 'in';

	toggle() {
		this.state = this.state === 'out'? 'in' : 'out'
	}
};