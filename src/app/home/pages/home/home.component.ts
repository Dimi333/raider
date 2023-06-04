import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MobileObject} from "../../../services/MobileObject.class";
import {HeroService} from "../../../services/hero.service";
import {K6, Occupation, Race} from "../../../services/utils";
import {MobileComponent} from '../../../shared/mobile/mobile.component';
import {formatCurrency, JsonPipe, NgFor, NgIf} from '@angular/common';
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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [NgFor, MobileComponent, FilterByGroupPipe, FilterByBandPipe, JsonPipe, NgIf]
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

  save() {
    localStorage.setItem('save', JSON.stringify(this.heroService.heroes))
    localStorage.setItem('money', JSON.stringify(this.heroService.money))
    localStorage.setItem('bands', JSON.stringify(this.heroService.bands))
  }

  load() {
    const data = localStorage.getItem('save');
    const data2 = localStorage.getItem('money');
    const data3 = localStorage.getItem('bands');
    if (data) {
      const dat = JSON.parse(data)
      const heroes: MobileObject[] = []
      dat.forEach((d: {
        id: string;
        name: string;
        race: Race;
        occupation: Occupation;
        image: string;
        item: string;
        item2: string;
        level: number;
        uc: number;
        oc: number;
        z: number;
        maxz: number;
        str: number;
        dex: number;
        con: number;
        int: number;
        char: number;
        mana: number;
        group: number;
        xp: number;
        age: number;
        skill: string;
        band: string;
      }) => heroes.push(this.heroService.createHero(d)))

      this.heroService.heroes = heroes
    }

    if (data2) {
      this.heroService.money = +data2
    }

    if (data3) {
      this.heroService.bands = JSON.parse(data3)
    }
  }

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

  createBand() {
    let name = prompt('Zadaj meno skupiny')

    if (name) {
      this.heroService.bands.push({id: uuidv4(), name, heroes: []})
    }
  }

  addHeroToBand(band: {name: string, id: string, heroes: any[]}) {
    let chosenOne = prompt('Zvoľ hrdinu:\n' + this.heroService.heroes.reduce((accumulator, itemInArray, index) => accumulator + (index + 1) + ')' + itemInArray.Name + '\n', ''))

    if (chosenOne) {
      let where = Number.parseInt(chosenOne) - 1

      this.heroService.heroes[where].Band = band.id
    }
  }
}
