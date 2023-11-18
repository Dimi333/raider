import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroService} from "../../services/hero.service";
import {FilterByBandPipe} from "../../services/filter-by-band.pipe";
import {MobileComponent} from "../mobile/mobile.component";
import {MobileObject} from "../../services/MobileObject.class";

@Component({
  selector: 'app-list-of-heroes',
  standalone: true,
  imports: [CommonModule, FilterByBandPipe, MobileComponent],
  template: `
    @for (mob of heroes; track mob.Name) {
      <app-mobile (click)="targetFunc(mob)"
              [mob]="mob"
              (useSkill)="useSkill(mob, $event)"></app-mobile>
    }
  `,
  styles: ``
})
export class ListOfHeroesComponent {
  @Input() heroes: MobileObject[] = []
  @Output() targetFuncEmitter: EventEmitter<MobileObject> = new EventEmitter<MobileObject>()

  public useSkill(item: MobileObject, $event: string) {

  }

  public targetFunc(item: MobileObject) {
    this.targetFuncEmitter.emit(item);
  }

}
