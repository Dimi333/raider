import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarketComponent} from './pages/market/market.component';
import {MarketRoutingModule} from "./market-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    MarketComponent
  ],
  imports: [
    CommonModule,
    MarketRoutingModule,
    SharedModule
  ]
})
export class MarketModule {
}
