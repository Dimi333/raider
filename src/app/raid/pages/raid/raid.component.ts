import {Component, inject, OnDestroy} from '@angular/core';
import {MobileObject} from "../../../services/MobileObject.class";
import {Battler} from "../../../services/Battler.class";
import {HeroService} from "../../../services/hero.service";
import {JournalService} from "../../../services/journal.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from 'rxjs';
import {K6} from "../../../services/utils";

@Component({
  selector: 'app-raid',
  templateUrl: './raid.component.html',
  styleUrls: ['./raid.component.scss']
})
export class RaidComponent implements OnDestroy {
  mobs: MobileObject[] = []
  displayMobs: MobileObject[] = []
  battler: Battler | null
  heroService = inject(HeroService)
  route = inject(ActivatedRoute)
  public chosenRaid$: Observable<any>;
  public chosenRaid: number | undefined

  constructor() {
    this.chosenRaid$ = this.route.params.pipe(map(qp => {
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
  }

  battle() {
    if (!this.chosenRaid) return
    this.mobs = this.mobs.filter(mob => mob.IsAlive)
    this.mobs.push(...this.heroService.heroes)
    let count = K6()

    for (let i = 0; i < count; i++) {
      this.mobs.push(this.heroService.getEnemy(this.chosenRaid))
    }

    JournalService.resetLog()
    this.displayMobs = Array.from(this.mobs)
    this.battler?.Battle(this.mobs)
  }

  nextBattle() {
    if (!this.chosenRaid) return
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
}
