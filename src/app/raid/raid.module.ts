import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RaidRoutingModule} from './raid-routing.module';
import {RaidComponent} from './pages/raid/raid.component';
import {SharedModule} from "../shared/shared.module";
import {OrderByIdPipe} from "../services/order-by-id.pipe";
import {FilterByPipe} from "../services/filter-by.pipe";
import { MapComponent } from './pages/map/map.component';

@NgModule({
  declarations: [
    RaidComponent,
    OrderByIdPipe,
    FilterByPipe,
    MapComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RaidRoutingModule,
  ]
})
export class RaidModule {
}
