import {Routes} from "@angular/router";

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./app/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'raid',
    loadChildren: () => import('./app/raid/raid.module').then(m => m.RaidModule)
  },
  {
    path: 'market',
    loadComponent: () => import('./app/market/market.component').then(m => m.MarketComponent)
  },
  {
    path: 'quests',
    loadComponent: () => import('./app/quests/quests.component').then(m => m.QuestsComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./app/about/about.component').then(m => m.AboutComponent)
  }
];
