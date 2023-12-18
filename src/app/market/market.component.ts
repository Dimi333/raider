import {Component} from '@angular/core';
import {HeroService} from "../services/hero.service";
import {MobileObject} from "../services/MobileObject.class";
import {MobileComponent} from '../shared/mobile/mobile.component';


@Component({
  selector: 'app-market',
  template: `
      <div class="canvas">
          <div class="box">
              @for (hero of showCase;track hero;let i = $index) {
                  <app-mobile [mob]="hero" (click)="buyHero(hero, i)"></app-mobile>
              }
              <br class="clearer">
              <button (click)="refreshMarket()">Obnoviť ♻</button>
          </div>
      </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      overflow: auto;
      background: #1f1f1f url("./../../assets/img/backgrounds/Daln.png") no-repeat center center fixed;
    }
  `],
  standalone: true,
  imports: [MobileComponent]
})
export class MarketComponent {
  showCase: MobileObject[] = []

  constructor(private hs: HeroService) {
    for (let i = 0; i < 6; i++) {
      this.showCase.push(this.hs.getHero())
    }
  }

  addHero() {
    this.hs.addHeroToHeroes()
  }

  buyHero(hero: MobileObject, index: number) {
    if (this.hs.money >= hero.Price) {
      this.showCase.splice(index, 1)
      hero.Band = this.hs.bands[0].id
      this.hs.bands[0].heroes.push(hero)
      this.hs.heroes.push(hero)
      this.hs.money -= hero.Price
    }
  }

  refreshMarket() {
    this.showCase = [];

    for (let i = 0; i < 6; i++) {
      this.showCase.push(this.hs.getHero())
    }
  }
}
