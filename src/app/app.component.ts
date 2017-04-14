import { Component } from '@angular/core';
import { Game } from './blackjack';
import 'ng2-sweetalert2';
declare var swal: any;

const GAME: Game = new Game();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'twenty-one';

  game  = GAME;
  deck  = GAME.deck;
  player = GAME.player;
  dealer = GAME.dealer;

  playerWin = 0;
  dealerWin = 0;

  gameHistory = GAME.state.history;

  note = `This is a simplified version of the poker game Blackjack. 
          Professional game involves more rules, variants and often involves real money bets.
          This version is intended for learning purposes only.`;

  tutorial() {
    swal({
      title: 'twenty-one',
      text: 'twenty-one also known as Blackjack, is a comparing card game between a player and a dealer'
    }).then(function() {
      swal({
        title: 'Objectives',
        html: 
          `The objectives of this game are simple:<br>
          <br>1. Get <b>21 points</b> on your cards.
          <br>2. Get <b>final points higher</b> than the dealer<br><i>without exceeding 21 points</i>.
        `
      }).then(function() {
          swal({
            title: 'Decisions',
            html: 
              `You have two decisions: <b>Hit</b> or <b>Stand</b><br>
              <br><b>Hit</b>: Take another card from the dealer.
              <br><b>Stand</b>: Take no more cards.
              `,
          }).then(function() {
            swal({
              title: 'Settle',
              html:
              `When the dealer chose to <b>Stand</b> and you also chose to <b>Stand</b>, click <b>Settle</b> to settle the bets and finish the round.`,
            })
          })
        })
    });
  }

  dealCards(): void {
    this.deck.shuffle()
    this.game.dealTwoCards()
    document.getElementById('deal_btn').setAttribute('disabled', 'disabled')
    document.getElementById('hit_btn').removeAttribute('disabled')
    document.getElementById('stand_btn').removeAttribute('disabled')
    document.getElementById('settle_btn').removeAttribute('disabled')
    this.runTimer()
  }

  runTimer() {
    const list = document.getElementById('actions')
    const g    = document.getElementsByTagName('history')
    if (g.length === 2) {
      return
    } else if (g.length > 5) g[0].remove()
    
    setTimeout(() => this.runTimer(), 2000)
  }

  hit(): void {
    this.game.dealCard()
    switch (this.player.status) {
      case 'Blackjack':
        swal('Blackjack! You win')
        this.updateScore(this.player)
        break;
      case 'Bust':
        this.updateScore(this.dealer)
        swal('Bust. Dealer wins')
        break;
      default:
        break;
    }
  }

  stand(): void {
    this.game.setHistory('You stand.. Dealer\'s turn')
    this.playDealer()
  }

  playDealer() {
    this.game.dealDealerCard()
    switch (this.dealer.status) {
      case 'Blackjack':
        swal('Blackjack! Dealer wins')
        this.updateScore(this.dealer)
        break;
      case 'Bust':
        this.updateScore(this.player)
        swal('Bust. You win')
        break;
      default:
        break;
    }
  }

  settle() {
    const status = this.game.settle()
    if (!status) return
    switch (status.flag) {
      case 'Draw':
        this.showHand()
        this.resetButtons()
        break
      case 'PlayerWins':
        this.updateScore(this.player)
        break
      case 'DealerWins':
        this.updateScore(this.dealer)
        break   
      default:
        break
    }
    swal(status.description);
  }

  updateScore(player) {
    this.showHand() // show dealer's hand
    if (player) player.isDealer ? this.dealerWin++ : this.playerWin++;
    this.resetButtons()
  }

  resetButtons() {
    document.getElementById('newGame_btn').removeAttribute('disabled')
    document.getElementById('hit_btn').setAttribute('disabled', 'disabled')
    document.getElementById('deal_btn').setAttribute('disabled', 'disabled')
    document.getElementById('stand_btn').setAttribute('disabled', 'disabled')
    document.getElementById('settle_btn').setAttribute('disabled', 'disabled')
  }

  // show dealer's hand
  showHand(): void {
    this.dealer.hand.filter(function(card) {
      card.setVisible()
    })  
  }

  nextRound() {
    this.game = new Game(); // start a new game
    this.deck = this.game.deck;
    this.player = this.game.player;
    this.dealer = this.game.dealer;
    this.gameHistory = this.game.state.history;

    document.getElementById('deal_btn').removeAttribute('disabled');
    document.getElementById('newGame_btn').setAttribute('disabled', 'disabled');
  }
}
