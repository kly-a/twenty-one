import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BlackjackComponent } from './blackjack.component';
import { CardComponent } from './card.component';
import { DeckComponent } from './deck.component';
import { HistoryComponent } from './history.component';

@NgModule({
  declarations: [
    AppComponent,
    BlackjackComponent,
    CardComponent,
    DeckComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
