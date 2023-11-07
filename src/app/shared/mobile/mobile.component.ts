import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MobileObject} from "../../services/MobileObject.class";
import {K6} from "../../services/utils";
import {HeroService} from "../../services/hero.service";
import {ActivatedRoute} from "@angular/router";
import { NgIf, NgStyle, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-mobile',
    template: `
        <div class="box mobile"
             *ngIf="mob"
             style="width: 170px; height: 190px; float: left; margin: 1px"
             [ngStyle]="{'opacity': mob.IsAlive ? 1 : .8, 'filter': mob.IsAlive ? 'none' : 'brightness(.1)'}">
            <button class="remove" (click)="removeHero()">❌</button>
            <small style="display: inline-block; overflow: hidden; height: 20px">{{mob.Name}} 👑: {{mob.Level}} |
                🎩: {{mob.XP}}</small><br>

            <table>
                <tr>
                    <td><img ngSrc="assets/img/{{mob.Group === 1 ? 'avatars' : 'avatars-enemies'}}/{{mob.Image}}.png"
                             alt=""
                             width="110" height="110"/></td>
                    <td><img ngSrc="assets/img/items/{{mob.Item}}.png" alt="" width="50" height="50"/> <img
                            ngSrc="assets/img/items/{{mob.Item2}}.png" alt="" width="50" height="50"/></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div
                                style="border-radius: 5px; text-align: center; overflow: hidden; width: 100%; border: 1px solid white; background: darkred; position: relative">
                            <div class="lifeprogress" [ngStyle]="{'width': 100/mob.MaxZ * mob.Z + '%'}"></div>
                            <div class="lifeNumbers">{{mob.Z}}/{{mob.MaxZ}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        ⚔️{{mob.UC}} 🛡️{{mob.OC}} 🔵-
                        <button *ngIf="mob.Skill === 'HealingSkill'" (click)="useSkillFunc('heal')">❤️</button>
                    </td>
                </tr>
            </table>
        </div>
    `,
    styles: [`
      .box {
        position: relative;
      }

      .lifeprogress {
        position: absolute;
        background: red;
        left: 0;
        top: 0;
        height: 100%;
        width: 0
      }

      .lifeNumbers {
        position: relative;
        z-index: 2;
        font-size: small;
      }

      .remove {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0;
      }
    `],
    standalone: true,
    imports: [NgIf, NgStyle, NgOptimizedImage]
})
export class MobileComponent {
  @Output() useSkill: EventEmitter<string> = new EventEmitter();

  @Input() mob!: MobileObject;

  protected readonly K6 = K6;

  private hs = inject(HeroService)

  private as = inject(ActivatedRoute)

  constructor() {
  }

  useSkillFunc(skill: string) {
    this.useSkill.emit(skill)
  }

  removeHero() {
    this.hs.heroes.splice(this.hs.heroes.findIndex((hero) => hero.Id === this.mob.Id), 1)
  }
}
