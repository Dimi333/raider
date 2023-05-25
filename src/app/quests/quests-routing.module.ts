import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {QuestsComponent} from "./pages/quests/quests.component";

const routes: Routes = [
  {
    path: '',
    component: QuestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestsRoutingModule {
}
