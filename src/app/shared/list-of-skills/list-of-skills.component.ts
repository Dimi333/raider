import {Component, EventEmitter, inject, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroService} from "../../services/hero.service";

@Component({
  selector: 'app-list-of-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for(skill of skills; track skill) {
        @if(skill) {
            <button (click)="useSkill(skill)">
                {{skill}}
            </button>
        }
    } @empty {
        -
    }
  `,
  styles: ``
})
export class ListOfSkillsComponent {
  private _hs: HeroService = inject(HeroService);

  @Output() usingSkill: EventEmitter<string> = new EventEmitter<string>();
  public skills: (string | null)[] = this._hs.heroes.map(hero => hero.Skill);

  useSkill(skill: string) {
    this.usingSkill.emit(skill);
  }
}
