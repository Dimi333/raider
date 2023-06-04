import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';

import {HomeComponent} from './pages/home/home.component';


@NgModule({
    imports: [
    CommonModule,
    HomeRoutingModule,
    NgOptimizedImage,
    HomeComponent
]
})
export class HomeModule {
}
