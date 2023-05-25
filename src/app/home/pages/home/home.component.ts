import {Component, OnDestroy, OnInit} from '@angular/core';
import {MobileObject} from "../../../services/MobileObject.class";
import {HeroService} from "../../../services/hero.service";
import {K6, Occupation, Race} from "../../../services/utils";

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
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy, OnInit {
  target: MobileObject | undefined
  skillWaiting: any

  constructor(
    public hs: HeroService
  ) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit() {
  }

  protected readonly userTrackBy = userTrackBy

  save() {
    localStorage.setItem('save', JSON.stringify(this.hs.heroes))
    localStorage.setItem('money', JSON.stringify(this.hs.money))
  }

  load() {
    const data = localStorage.getItem('save');
    const data2 = localStorage.getItem('money');
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
      }) => heroes.push(this.hs.createHero(d)))

      this.hs.heroes = heroes
    }

    if (data2) {
      this.hs.money = +data2
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
      this.skillWaiting = ''
      mob.HealMe(K6())
    } else {
      this.target = mob
    }
  }
}
