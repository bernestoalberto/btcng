import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {ChartsModule} from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NiceHashComponent } from './nicehash/nice-hash.component';
import { HashService} from './nicehash/hash.service';
const routes: Routes = [
  {path : '', redirectTo: '/home' , pathMatch: 'full'},
  {path : 'nicehash', component: NiceHashComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    // CoinBaseComponent,
    NiceHashComponent,
    HashService,
    // MarketComponent,
    // HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
