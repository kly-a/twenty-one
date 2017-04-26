import { Component } from '@angular/core';
import { Blackjack } from './blackjack';

const GAME: Blackjack = new Blackjack();

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>

    <section>
        <blackjack></blackjack>
    </section>

    <section>
        <p><strong>NOTE:</strong> {{note}}</p>
        <p>&copy; 2017 kly-a@github.com | Made with Angular2 &hearts;</p>
    </section>
  `,
  styles: [`
    h1 {
      color: #A35F5D;
      font-size: 250%;
      text-align: center;
    }

    section {
      text-align: center;
      padding-bottom: 10px;
    }

    p {
      color: #A35F5D;
    }
  `
  ],
})

export class AppComponent {
  title = 'twenty-one';
  note  = `This is a simplified version of the poker game Blackjack. 
           Professional game involves more rules, variants and often involves real money bets. 
           This version is intended for learning purposes only.`;
}
