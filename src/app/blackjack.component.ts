import { Component } from '@angular/core'
import { Blackjack } from './blackjack'
import 'ng2-sweetalert2'
declare var swal: any

const GAME: Blackjack = new Blackjack();

@Component({
	selector: 'blackjack',
	template: `
	    <button id="tutorial_btn" (click)="tutorial()">How to play</button>
	    <button id="deal_btn" (click)="dealCards()">Deal cards</button>
	    <button id="newGame_btn" (click)="nextRound()" disabled>Next round</button>

		<div class="container">
	        <div class="one">
	            <div class="dealer score">Dealer: {{dealerWin}}</div>
	            <div id="actions" class="messages">
	                <history *ngFor='let h of gameHistory' [history]="h"></history>
	            </div>
	            <div class="player score">You: {{playerWin}}</div>
	        </div>
	        
	        <div class="two">
	            <div class="dealer">
	                <card *ngFor='let card of dealer.hand' [card]="card"></card>
	            </div>
	            <div class="player">
	                <card *ngFor='let card of player.hand' [card]="card"></card>
	            </div>
	        </div>
	    </div>

	    <button id="settle_btn" (click)="settle()" disabled>Settle</button>
    	<button id="hit_btn" (click)="hit()" disabled>Hit</button>
    	<button id="stand_btn" (click)="stand()" disabled>Stand</button>    
    `,
    styles: [`
		.container {
		    width: 100%;
		    margin: 10px auto;
		    padding: 10px;
		    height: 500px;
		    background: lightgray;
		    border-radius: 3px;
		}
		.one {
		    width: 20%;
		    height: 500px;
		    background: lightgray;
			float: left;
		    position: relative;
		    border-radius: 3px;
		}
		.two {
		    margin-left: 20%;
		    height: 500px;
		    background: #194D1E;
			position: relative;
			text-align: center;
			border-radius: 3px;
		}
		.player {
			position: absolute;
			bottom: 0;
		}
		.dealer {
			position: absolute; 
			top: 0;
		}
		.score {
			color: #F4EDED;
			background-color: #A35F5D;
			font-size: 120%;
			font-weight: bold;
			width: 90%;
			padding: 10px 0;
			border-radius: 3px;
		}
		.messages {
			position: absolute;
			top: 10%;
			padding: 5px;
			text-align: left;
			font-size: 12pt;
			color: #A35F5D
		}
		button {
			background-color: #F9F7F7;
			color: #A35F5D;
			border: 1px solid #A35F5D;
			font-weight: bold;
			font-size: 110%;
			border-radius: 2px;
		}

		button:disabled{
			border: 1px solid lightgray;
			color: lightgray;
		}

		button:hover:enabled {
			background-color: #A35F5D;
			color: #F9F7F7;
		}

		button:focus {
			outline: none;
		}
    `],
})

export class BlackjackComponent {
  game  = GAME;
  deck  = GAME.deck;
  player = GAME.player;
  dealer = GAME.dealer;

  playerWin = 0;
  dealerWin = 0;

  gameHistory = GAME.state.history;

  tutorial(): void {
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
              `You have 3 decisions: <b>Hit</b> or <b>Stand</b> or <b>Settle</b><br>
              <br><b>Hit</b>: Take another card from the dealer.
              <br><b>Stand</b>: Take no more cards.
              <br><b>Settle</b>: Settle the bets and end the current round.
              `,
          }).then(function() {
            swal({
              title: 'Card Values',
              html:
              `K, Q & J's are valued as 10
              <br>Ace is valued as 1
              `,
            })
          })
        })
    });
  }

  dealCards(): void {
    this.game.shuffle()
    this.game.dealTwoCards()
    this.updateLogPanel()

    document.getElementById('deal_btn').setAttribute('disabled', 'disabled')
    document.getElementById('hit_btn').removeAttribute('disabled')
    document.getElementById('stand_btn').removeAttribute('disabled')
    document.getElementById('settle_btn').removeAttribute('disabled')
  }

  nextRound() {
    this.game = new Blackjack(); // start a new game
    this.deck = this.game.deck;
    this.player = this.game.player;
    this.dealer = this.game.dealer;
    this.gameHistory = this.game.state.history;

    document.getElementById('deal_btn').removeAttribute('disabled');
    document.getElementById('newGame_btn').setAttribute('disabled', 'disabled');
  }

  settle() {
    const status = this.game.settle()
    if (!status) return
    switch (status.flag) {
      case 'Draw':
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

  updateScore(player) {
    if (player) player.isDealer ? this.dealerWin++ : this.playerWin++;
    this.resetButtons()
  }

  resetButtons() {
  	this.showHand()
    document.getElementById('newGame_btn').removeAttribute('disabled')
    document.getElementById('hit_btn').setAttribute('disabled', 'disabled')
    document.getElementById('deal_btn').setAttribute('disabled', 'disabled')
    document.getElementById('stand_btn').setAttribute('disabled', 'disabled')
    document.getElementById('settle_btn').setAttribute('disabled', 'disabled')
  }

  showHand(): void {
    this.dealer.hand.filter(function(card) {
      card.setVisible()
    })  
  }

  updateLogPanel() {
    const list = document.getElementById('actions')
    const g    = document.getElementsByTagName('history')
    if (g.length === 2) {
      return
    } else if (g.length > 5) g[0].remove()
    
    setTimeout(() => this.updateLogPanel(), 2000)
  }
}
