import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MobileObject} from "../../services/MobileObject.class";
import {K6} from "../../services/utils";
import {HeroService} from "../../services/hero.service";
import { NgStyle, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-mobile',
    template: `
        @if (mob) {
        <div class="box mobile"

        style="width: 170px; height: 220px; float: left; margin: 1px"
        [ngStyle]="{'opacity': mob.IsAlive ? 1 : .8, 'filter': mob.IsAlive ? 'none' : 'brightness(.1)'}">
        <button class="remove" (click)="removeHero()">❌</button>
        <small style="display: inline-block; overflow: hidden; height: 20px">{{mob.Name}} 👑: {{mob.Level}} |
        🎩: {{mob.XP}}</small><br>

        <table>
        <tr>
        <td><img ngSrc="assets/img/{{mob.Group === 1 ? 'avatars' : 'avatars-enemies'}}/{{mob.Image}}.{{mob.Group === 1 ? 'png' : 'jpg'}}"
        alt=""
        width="110" height="110"/></td>
        <td><img ngSrc="assets/img/items/{{mob.Item}}.png" alt="" width="50" height="50"/> <img
        ngSrc="assets/img/items/{{mob.Item2}}.png" alt="" width="50" height="50"/></td>
        </tr>
        <!-- zdravie -->
        <tr>
        <td colspan="2">
        <div
        style="border-radius: 5px; text-align: center; overflow: hidden; width: 100%; border: 1px solid white; background: darkred; position: relative">
        <div class="lifeprogress" [ngStyle]="{'width': 100/mob.MaxZ * mob.Z + '%'}"></div>
        <div class="lifeNumbers">{{mob.Z}}/{{mob.MaxZ}}</div>
        </div>
        </td>
        </tr>
        <!-- mana -->
        <tr>
        <td colspan="2">
        <div
        style="border-radius: 5px; text-align: center; overflow: hidden; width: 100%; border: 1px solid white; background: blue; position: relative">
        <div class="manaprogress" [ngStyle]="{'width': 100/mob.maxMana * mob.Mana + '%'}"></div>
        <div class="lifeNumbers">{{mob.Mana}}/{{mob.maxMana}}</div>
        </div>
        </td>
        </tr>
        <tr>
        <td colspan="2">
        ⚔️{{mob.UC}} 🛡️{{mob.OC}}
        @if (mob.Skill === 'HealingSkill') {
        <a href="#" (click)="useSkillFunc('heal')">❤️</a>
        }
        @if (mob.Skill === 'LightningSkill') {
        <a href="#" (click)="useSkillFunc('lightning')">⚡️</a>
        }
        </td>
        </tr>
        </table>
        </div>
        }
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
    imports: [NgStyle, NgOptimizedImage]
})
export class MobileComponent {
  private hs = inject(HeroService)

  @Output() useSkill: EventEmitter<string> = new EventEmitter();
  @Input() mob!: MobileObject;

  protected readonly K6 = K6;


  constructor() {
  }

  useSkillFunc(skill: string) {
    this.useSkill.emit(skill)
  }

  removeHero() {
    this.hs.heroes.splice(this.hs.heroes.findIndex((hero) => hero.Id === this.mob.Id), 1)
  }
}
