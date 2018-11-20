import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CoinbaseComponent } from './coinbase/coinbase.component';
import { NicehashComponent } from './nicehash/nicehash.component';
import { MarketComponent } from './market/market.component';

import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    CoinbaseComponent,
    NicehashComponent,
    MarketComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
