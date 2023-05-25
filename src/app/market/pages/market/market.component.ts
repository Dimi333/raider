import {Component} from '@angular/core';
import {HeroService} from "../../../services/hero.service";
import {MobileObject} from "../../../services/MobileObject.class";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
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
}
