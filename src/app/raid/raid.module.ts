import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {RaidRoutingModule} from './raid-routing.module';
import {RaidComponent} from './pages/raid/raid.component';

import {OrderByIdPipe} from "../services/order-by-id.pipe";
import {FilterByGroupPipe} from "../services/filter-by-group.pipe";
import { MapComponent } from './pages/map/map.component';

@NgModule({
    imports: [
    CommonModule,
    RaidRoutingModule,
    RaidComponent,
    OrderByIdPipe,
    FilterByGroupPipe,
    MapComponent,
]
})
export class RaidModule {
}
