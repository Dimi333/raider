import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MobileObject} from "../../services/MobileObject.class";
import {K6} from "../../services/utils";
import {HeroService} from "../../services/hero.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
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
