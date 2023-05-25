import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'raid',
    loadChildren: () => import('./raid/raid.module').then(m => m.RaidModule)
  },
  {
    path: 'market',
    loadChildren: () => import('./market/market.module').then(m => m.MarketModule)
  },
  {
    path: 'quests',
    loadChildren: () => import('./quests/quests.module').then(m => m.QuestsModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
