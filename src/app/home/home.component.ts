import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MobileObject} from "../services/MobileObject.class";
import {HeroService} from "../services/hero.service";
import {K6} from "../services/utils";
import {MobileComponent} from '../shared/mobile/mobile.component';
import { JsonPipe, NgOptimizedImage } from '@angular/common';
import {FilterByGroupPipe} from "../services/filter-by-group.pipe";
import {FilterByBandPipe} from "../services/filter-by-band.pipe";
import {ListOfHeroesComponent} from "../shared/list-of-heroes/list-of-heroes.component";
import {ListOfSkillsComponent} from "../shared/list-of-skills/list-of-skills.component";

@Component({
  selector: 'app-home',
  template: `
      <div class="canvas">
            <div>
            <button (click)="addBand()">Pridať skupinu +👥</button>
            </div>
            @for (band of heroService.bands; track band.name) {
              <div class="box" style="border: 10px groove darkgoldenrod; background: #261305;">
              {{band.name}}
              <button (click)="addHeroToBand(band)">Pridať hrdinu +👥</button>
              <br class="clearer">

              <app-list-of-heroes [heroes]="heroService.heroes | filterByBand: band.id" (targetFuncEmitter)="targetFunc($event)"></app-list-of-heroes>
              <br class="clearer">
              <br class="clearer">
              </div>
            }

      </div>
      <app-list-of-skills (usingSkill)="useSkill($event)"></app-list-of-skills>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      overflow: auto;
      z-index: 2;
    }
  `],
  standalone: true,
    imports: [MobileComponent, FilterByGroupPipe, FilterByBandPipe, JsonPipe, NgOptimizedImage, ListOfHeroesComponent, ListOfSkillsComponent]
})
export class HomeComponent implements OnDestroy, OnInit {
  target: MobileObject | undefined
  skillWaiting: any
  heroService = inject(HeroService)

  constructor(
  ) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit() {
  }

  heal(mob: MobileObject) {
    mob.HealMe(K6());
  }

  useSkill(skill: string) {
    this.skillWaiting = skill
  }

  targetFunc(mob: MobileObject) {
    if (this.skillWaiting === 'HealingSkill' && mob.Z < mob.MaxZ) {
      mob.HealMe(K6())
    } else if (this.skillWaiting === "LightningSkill") {
      mob.DamageMe(K6() + K6())
    } else {
      this.target = mob
    }
  }

  addHeroToBand(band: {name: string, id: string, heroes: any[]}) {
    let chosenOne = prompt('Zvoľ hrdinu:\n' + this.heroService.heroes.reduce((accumulator, itemInArray, index) => accumulator + (index + 1) + ')' + itemInArray.Name + '\n', ''))

    if (chosenOne) {
      let where = Number.parseInt(chosenOne) - 1

      this.heroService.heroes[where].Band = band.id
      this.heroService.heroes = [...this.heroService.heroes]
    }
  }

  addBand() {
    let bandName = prompt("Pomenuj skupinu");

    if (bandName) {
      this.heroService.bands.push({id: ""+this.heroService.bands.length, name: bandName, heroes: []});
    }
  }
}
