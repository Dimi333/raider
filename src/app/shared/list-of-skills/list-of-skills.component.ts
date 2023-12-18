import {Component, EventEmitter, HostListener, inject, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroService} from "../../services/hero.service";

@Component({
  selector: 'app-list-of-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
      @for (skill of skills;let index = $index;track index) {
          @if (skill) {
              <button (click)="useSkill(skill)" [class]="{'selected': waitingSkill === skill}">
                  {{ GetCharacter(index) + " | " + skill }}
              </button>
          }
      } @empty {
          -
      }
  `,
  styles: `.selected {font-weight: 700}`
})
export class ListOfSkillsComponent {
  private _hs: HeroService = inject(HeroService);

  public waitingSkill: string | undefined = ""

  @HostListener('window:keydown.Q', ['$event'])
  heal(event: KeyboardEvent) {
    this.usingSkill.emit(this.skills[0])
    this.waitingSkill = this.skills[0]
  }

  @HostListener('window:keydown.W', ['$event'])
  lightning(event: KeyboardEvent) {
    this.usingSkill.emit(this.skills[1])
    this.waitingSkill = this.skills[1]
  }

  @Output() usingSkill: EventEmitter<string> = new EventEmitter<string>();
  public skills: (string | undefined)[] = this._hs.heroes.map(hero => hero.Skill)

  GetCharacter(index: number): string {
    switch (index) {
      case 0:
        return "Q";
      case 1:
        return "W";
      case 2:
        return "E";
      case 3:
        return "R";
      default:
        return ""
    }
  }

  useSkill(skill: string) {
    this.usingSkill.emit(skill)
  }
}
