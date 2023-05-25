import {K10} from "./utils";
import {MobileObject} from "./MobileObject.class";

export interface ISkill {
  Name: string;
  Level: number;
  manipulate: Function;
}

export class HealingSkill implements ISkill {
  Level: number;
  Name = 'Healing skill';

  constructor(level: number) {
    this.Level = level
  }

  manipulate(source: MobileObject, target: MobileObject) {
    source.Mana -= 3
    target.HealMe(K10())
  }
}
