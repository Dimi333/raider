import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarketComponent} from './pages/market/market.component';
import {MarketRoutingModule} from "./market-routing.module";


@NgModule({
    imports: [
    CommonModule,
    MarketRoutingModule,
    MarketComponent
]
})
export class MarketModule {
}
