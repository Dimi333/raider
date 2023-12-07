import {Component, EventEmitter, HostListener, inject, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroService} from "../../services/hero.service";

@Component({
  selector: 'app-list-of-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
      @for (skill of skills;let index = $index;track skill) {
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

  public waitingSkill = ""

  @HostListener('window:keydown.Q', ['$event'])
  heal(event: KeyboardEvent) {
    this.usingSkill.emit('HealingSkill')
    this.waitingSkill = 'HealingSkill'
  }

  @HostListener('window:keydown.W', ['$event'])
  lightning(event: KeyboardEvent) {
    this.usingSkill.emit('LightningSkill')
    this.waitingSkill = 'LightningSkill'
  }

  @Output() usingSkill: EventEmitter<string> = new EventEmitter<string>();
  public skills: (string | null)[] = this._hs.heroes.map(hero => hero.Skill)

  GetCharacter(index: number): string {
    switch (index) {
      case 1:
        return "Q";
      case 2:
        return "W";
      default:
        return ""
    }
  }

  useSkill(skill: string) {
    this.usingSkill.emit(skill)
  }
}
