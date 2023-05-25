import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';

import {HomeComponent} from './pages/home/home.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    HomeRoutingModule,
    NgOptimizedImage
  ]
})
export class HomeModule {
}
