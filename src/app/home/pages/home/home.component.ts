import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MobileObject} from "../../../services/MobileObject.class";
import {HeroService} from "../../../services/hero.service";
import {K6, Occupation, Race} from "../../../services/utils";
import {MobileComponent} from '../../../shared/mobile/mobile.component';
import {formatCurrency, JsonPipe, NgFor, NgIf, NgOptimizedImage} from '@angular/common';
import {FilterByGroupPipe} from "../../../services/filter-by-group.pipe";
import {FilterByBandPipe} from "../../../services/filter-by-band.pipe";

export function userTrackBy(index: number, user: MobileObject) {
  return user.Id;
}

export const uuidv4 = () => {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

@Component({
  selector: 'app-home',
  template: `
      <div class="canvas" style="width: 95vw">
          <div class="box" style="border: 10px groove darkgoldenrod; background: #261305; "
               *ngFor="let band of heroService.bands">
              {{band.name}}
              <button (click)="addHeroToBand(band)">Pridať hrdinu +👥</button>
              <br class="clearer">

              <app-mobile (click)="targetFunc(mob)"
                          *ngFor="let mob of heroService.heroes|filterByBand:band.id; trackBy: userTrackBy;"
                          [mob]="mob"
                          (useSkill)="useSkill(mob, $event)"></app-mobile>
              <br class="clearer">
              <br class="clearer">
          </div>
          <div>
              <app-mobile (click)="targetFunc(mob)" *ngFor="let mob of heroService.heroes; trackBy: userTrackBy;"
                          [mob]="mob"
                          (useSkill)="useSkill(mob, $event)">
              </app-mobile>
              <br class="clearer">
          </div>
      </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      overflow: auto;
      background: #1f1f1f url("./../../../../assets/img/backgrounds/ToraskovaPevnost.png") no-repeat center center fixed;
    }
  `],
  standalone: true,
  imports: [NgFor, MobileComponent, FilterByGroupPipe, FilterByBandPipe, JsonPipe, NgIf, NgOptimizedImage]
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

  protected readonly userTrackBy = userTrackBy

  heal(mob: MobileObject) {
    mob.HealMe(K6());
  }

  useSkill(mob: MobileObject, skill: string) {
    if (skill === 'heal') {
      this.skillWaiting = 'heal'
    }
  }

  targetFunc(mob: MobileObject) {
    if (this.skillWaiting === 'heal' && mob.Z < mob.MaxZ) {
      mob.HealMe(K6())
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
}
