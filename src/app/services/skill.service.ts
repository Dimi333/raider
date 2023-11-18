import { Injectable } from '@angular/core';
import {HealingSkill, Skill} from "./skill";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor() { }

  skillFactory(name: string): Skill | void {
    if (name === 'HealingSkill') {
      return new HealingSkill(1);
    }
  }
}
