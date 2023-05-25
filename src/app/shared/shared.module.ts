import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MobileComponent} from './mobile/mobile.component';

@NgModule({
  declarations: [
    MobileComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  exports: [
    MobileComponent
  ]
})
export class SharedModule {
}
