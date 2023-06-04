import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestsComponent} from './pages/quests/quests.component';
import {QuestsRoutingModule} from "./quests-routing.module";


@NgModule({
    imports: [
        CommonModule,
        QuestsRoutingModule,
        QuestsComponent
    ]
})
export class QuestsModule {
}
