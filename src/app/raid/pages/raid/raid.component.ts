import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MobileObject} from "../../../services/MobileObject.class";
import {Battler} from "../../../services/Battler.class";
import {HeroService} from "../../../services/hero.service";
import {JournalService} from "../../../services/journal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from 'rxjs';
import {K6} from "../../../services/utils";
import {FilterByGroupPipe} from '../../../services/filter-by-group.pipe';
import {OrderByIdPipe} from '../../../services/order-by-id.pipe';
import {MobileComponent} from '../../../shared/mobile/mobile.component';
import { AsyncPipe } from '@angular/common';
import {FilterByBandPipe} from "../../../services/filter-by-band.pipe";
import {ListOfSkillsComponent} from "../../../shared/list-of-skills/list-of-skills.component";
import {ListOfHeroesComponent} from "../../../shared/list-of-heroes/list-of-heroes.component";

@Component({
  selector: 'app-raid',
  template: `
      <div class="canvas">
          @if (chosenRaid$ | async) {
            <div>
                <div style="width: 90vw; height: 67vh; display: flex; flex-direction: column; align-items: center; justify-content: center">
                  <app-list-of-heroes [heroes]="displayMobs | filterByGroup:'2' | orderById:'Id'" (targetFuncEmitter)="targetFunc($event)"></app-list-of-heroes>
                  <br class="clearer">
                  <app-list-of-heroes [heroes]="displayMobs | filterByGroup:'1' | orderById:'Id'" (targetFuncEmitter)="targetFunc($event)"></app-list-of-heroes>
                  <br class="clearer">
                  <button [hidden]="battler?.BattleInProgress" (click)="nextBattle()" style="padding: 10px; font-size: 3em">
                      Ďalšia miestnosť
                  </button>
                </div>
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
      background: #1f1f1f url("./../../../../assets/img/backgrounds/les víl.png") no-repeat center center fixed;
    }
  `],
  standalone: true,
  imports: [MobileComponent, AsyncPipe, OrderByIdPipe, FilterByGroupPipe, ListOfSkillsComponent, ListOfHeroesComponent],
  providers: [FilterByBandPipe]
})
export class RaidComponent implements OnDestroy, OnInit {
  mobs: MobileObject[] = []
  displayMobs: MobileObject[] = []
  battler: Battler | null
  heroService = inject(HeroService)
  route = inject(ActivatedRoute)
  router = inject(Router);
  public chosenBandId: string | undefined
  public chosenRaid$: Observable<any>
  public chosenRaid: number | undefined
  public inter: any = null;
  skillWaiting: any
  target: MobileObject | undefined

  constructor() {
    this.chosenRaid$ = this.route.params.pipe(map(qp => {
      let chosenBand = prompt('Vyber skupinu:' + this.heroService.bands.reduce((accumulator, itemInArray, index) => accumulator + (index + 1) + ')' + itemInArray.name + '\n', ''))

      if (chosenBand) {
        this.chosenBandId = this.heroService.bands[+chosenBand - 1].id
      } else {
        this.router.navigateByUrl('raid');
      }

      this.chosenRaid = +qp['id'];
      this.battle();
      return qp['id']
    }))
    this.battler = null;
    this.battler = new Battler(600, 100)

  }

  ngOnDestroy(): void {
    JournalService.resetLog()
    this.battler?.subscription?.unsubscribe()
    clearInterval(this.inter)
  }

  useSkill(skill: string) {
    if (skill === 'HealingSkill') {
      this.skillWaiting = 'heal'
    }
  }

  battle() {
    if (!this.chosenRaid) return
    // if (!this.chosenBandId) return
    this.mobs = this.mobs.filter(mob => mob.IsAlive)
    this.mobs.push(...this.heroService.heroes.filter(hero => hero.Band === this.chosenBandId))
    let count = K6()

    for (let i = 0; i < count; i++) {
      this.mobs.push(this.heroService.getEnemy(this.chosenRaid))
    }

    JournalService.resetLog()
    this.displayMobs = Array.from(this.mobs)
    this.battler?.Battle(this.mobs)

    // this.inter = setInterval(() => !this.battler?.BattleInProgress ? this.nextBattle() : null, 1000);
  }

  targetFunc(mob: MobileObject) {
    if (this.skillWaiting === 'heal' && mob.Z < mob.MaxZ) {
      mob.HealMe(K6())
    } else {
      this.target = mob
    }
  }

  nextBattle() {
    if (!this.chosenRaid) return
    if (this.battler?.BattleInProgress) return
    JournalService.resetLog()
    this.mobs = this.mobs.filter(mob => mob.IsAlive)
    let count = K6()

    for (let i = 0; i < count; i++) {
      this.mobs.push(this.heroService.getEnemy(this.chosenRaid))
    }

    this.displayMobs = Array.from(this.mobs)
    this.battler?.Battle(this.mobs)
  }

  protected readonly JournalService = JournalService

  ngOnInit(): void {

  }
}
