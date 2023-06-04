import { ISkill } from './skill';

class Skill implements ISkill{
  Level: number = 1;
  Name: string  = '';
  private _p0: any;

  manipulate(p0: this) {
    this._p0 = p0;
  }
}

describe('Skill', () => {
  it('should create an instance', () => {
    expect(new Skill()).toBeTruthy();
  });
});
