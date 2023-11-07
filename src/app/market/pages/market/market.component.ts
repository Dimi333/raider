import {Component} from '@angular/core';
import {HeroService} from "../../../services/hero.service";
import {MobileObject} from "../../../services/MobileObject.class";
import {MobileComponent} from '../../../shared/mobile/mobile.component';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-market',
  template: `
    <div class="canvas">
      <app-mobile *ngFor="let hero of showCase; let i = index" [mob]="hero" (click)="buyHero(hero, i)"></app-mobile>
      <br class="clearer">
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      overflow: auto;
      background: #1f1f1f url("./../../../../assets/img/backgrounds/Daln.png") no-repeat center center fixed;
    }
  `],
  standalone: true,
  imports: [NgFor, MobileComponent]
})
export class MarketComponent {
  showCase: MobileObject[] = []

  constructor(private hs: HeroService) {
    for (let i = 0; i < 10; i++) {
      this.showCase.push(this.hs.getHero())
    }
  }

  addHero() {
    this.hs.addHeroToHeroes()
  }

  buyHero(hero: MobileObject, index: number) {
    this.showCase.splice(index, 1)
    this.hs.heroes.push(hero)
  }

  refreshMarket() {
    this.showCase = [];

    for (let i = 0; i < 10; i++) {
      this.showCase.push(this.hs.getHero())
    }
  }
}
