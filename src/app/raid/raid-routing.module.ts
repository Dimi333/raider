import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RaidComponent} from './pages/raid/raid.component';
import {MapComponent} from "./pages/map/map.component";

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'adventure/:id/:bandId',
    component: RaidComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaidRoutingModule {
}
