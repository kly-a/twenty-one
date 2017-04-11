import { Component, Input, state, style, trigger, transition, animate } from '@angular/core';
import { History } from './history';

@Component({
	selector: 'history',
	template: `
		<p [@flyInOut]="history.state" >{{history.description}}</p>
	`,
	styles: [`
		p {
			font-size: 12pt;
		}
	`
	],
	animations: [
	  trigger('flyInOut', [
	    state('in', style({opacity: 1, transform: 'translateY(0)'})),
	    transition('void => *', [
	      style({
	        opacity: 0,
	        transform: 'translateY(-100%)'
	      }),
	      animate('0.2s ease-in')
	    ]),
	    transition('* => void', [
	      animate('0.2s 10 ease-out', style({
	        opacity: 0,
	        transform: 'translateY(100%)'
	      }))
	    ])
	  ])
	]
})

export class HistoryComponent {
	@Input() history = History;

	state = 'in';
};