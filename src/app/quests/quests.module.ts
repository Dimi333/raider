import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestsComponent} from './pages/quests/quests.component';
import {QuestsRoutingModule} from "./quests-routing.module";


@NgModule({
  declarations: [
    QuestsComponent
  ],
  imports: [
    CommonModule,
    QuestsRoutingModule
  ]
})
export class QuestsModule {
}
