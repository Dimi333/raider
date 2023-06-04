import {JournalService} from "./journal.service";
import {MobileObject} from "./MobileObject.class";
import {interval, Subscription} from "rxjs";
import {tap} from "rxjs/operators";
import {HeroService} from "./hero.service";
import {inject} from "@angular/core";

export class Battler {
  public BattleInProgress = false
  private mobs: MobileObject[] = []
  private _roundTime: number
  public subscription: Subscription | undefined
  private _maxRounds
  private _LootMoney: number = 0
  private hs: HeroService = inject(HeroService)

  constructor(roundTime: number, maxRounds: number) {
    this._roundTime = roundTime;
    this._maxRounds = maxRounds;
  }

  public Battle(mobs: MobileObject[]): void {
    this.BattleInProgress = true;
    this.mobs = mobs;
    JournalService.log('Začiatok súboja');
    JournalService.log('➿➿➿➿➿➿➿➿➿')
    let round = 0;

    this.subscription = interval(this._roundTime).pipe(
      tap(() => {
        round++;
        JournalService.log('⏳' + round + '. kolo')

        let team1 = this.mobs.filter(mob => mob.Group === 1).length;
        let team2 = this.mobs.filter(mob => mob.Group === 2).length;
        if (team1 > 0 && team2 > 0) {
          this.mobs.forEach(mob => mob.RollInitiative());
          this.mobs.forEach(mob => mob.RollAttack());
          this.mobs.forEach(mob => mob.RollDefence());

          let sortedByInitiativeDesc = this.mobs.sort((a, b) => a.Initiative - b.Initiative).reverse()
          sortedByInitiativeDesc.forEach(mob => {
            let nextTarget = sortedByInitiativeDesc.filter(innerMob => innerMob.Id !== mob.Id && mob.Group !== innerMob.Group && innerMob.IsAlive && mob.IsAlive)[0];
            if (nextTarget)
              mob.AttackOn(nextTarget);
          });
        }

        team1 = this.mobs.filter(mob => mob.Group === 1 && mob.IsAlive).length;
        team2 = this.mobs.filter(mob => mob.Group === 2 && mob.IsAlive).length;
        if (round === this._maxRounds || (team1 === 0 || team2 === 0)) {
          JournalService.log('➿➿➿➿➿➿➿➿➿')
          JournalService.log('Koniec súboja');
          this.mobs.map(mob => {if (mob.Group === 2) {this._LootMoney += mob.LootMoney; mob.LootMoney = 0}})
          this.hs.money += this._LootMoney
          this.BattleInProgress = false;
          this.subscription?.unsubscribe();
        }
      }),
    ).subscribe();
  }
}
