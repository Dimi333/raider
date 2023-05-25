import { Injectable } from '@angular/core';
import {HealingSkill, ISkill} from "./skill";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor() { }

  skillFactory(name: string): ISkill | void {
    if (name === 'HealingSkill') {
      return new HealingSkill(1);
    }
  }
}
