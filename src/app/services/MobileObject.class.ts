import {JournalService} from "./journal.service";
import {K6, K6plus, K8, Occupation, Race} from "./utils";
import {ISkill} from "./skill";

export class MobileObject {
  set LootMoney(value: number) {
    this._LootMoney = value;
  }
  get LootMoney(): number {
    return this._LootMoney;
  }
  get Skill(): string {
    return this._Skill;
  }

  set Skill(value: string) {
    this._Skill = value;
  }
  get Mana(): number {
    return this._Mana;
  }

  set Mana(value: number) {
    this._Mana = value
  }

  get Item2(): string {
    return this._Item2
  }

  get Item(): string {
    return this._Item
  }

  get Image(): string {
    return this._Image
  }

  get MaxZ(): number {
    return this._MaxZ
  }

  get Level(): number {
    return this._Level
  }

  get IsAlive(): boolean {
    if (this._Z <= 0) {
      this._IsAlive = false
    }
    return this._IsAlive
  }

  get Id(): string {
    return this._Id
  }

  get XP(): number {
    return this._XP
  }

  get Initiative(): number {
    return this._Initiative
  }

  get Group(): number {
    return this._Group
  }

  get Z(): number {
    return this._Z
  }

  get OC(): number {
    return this._OC
  }

  get UC(): number {
    return this._UC
  }

  get Name(): string {
    return this._Name
  }

  private readonly _Name: string
  private readonly _Id: string
  private readonly _Image: string
  private _Item2: string
  private _Item: string
  private _Level: number
  private _UC: number
  private _OC: number
  private _Z: number
  private _Mana: number
  private _Group: number
  private _Initiative: number = 0
  private _XP: number
  private _Defense: number = 0
  private _Attack: number = 0
  private _IsAlive: boolean = true
  private _MaxZ: number = 0
  private _Age: number = 20
  private _Race: Race;
  private _Occupation: Occupation = 'warrior'
  private _STR: number
  private _DEX: number
  private _CON: number
  private _INT: number
  private _CHAR: number
  private _Skill: string
  public _Money: number = 0
  private _LootMoney: number = 10

  constructor(
    Id: string,
    name: string,
    race: Race,
    occupation: Occupation,
    image: string,
    item: string,
    item2: string,
    level: number,
    UC: number,
    OC: number,
    Z: number,
    MaxZ: number,
    STR: number,
    DEX: number,
    CON: number,
    INT: number,
    CHAR: number,
    Mana: number,
    Group: number,
    XP: number,
    Age: number,
    Skill: string,
  ) {
    // todo nezabudnúť updatnúť toJSON() a tie ostatné veci
    this._Race = race
    this._Occupation = occupation
    this._Image = image
    this._Level = level
    this._Id = Id
    this._OC = OC
    this._UC = UC
    this._Z = Z
    this._Mana = Mana
    this._MaxZ = MaxZ
    this._Group = Group
    this._Name = name
    this._XP = XP
    this._Item = item
    this._Item2 = item2
    this._STR = STR
    this._DEX = DEX
    this._CON = CON
    this._INT = INT
    this._CHAR = CHAR
    this._Age = Age
    this._Skill = Skill
  }

  // dať všetko z contructor a pri loade vytvoriť nové classy podľa toho
  public toJSON() {
    return {
      race: this._Race,
      occupation: this._Occupation,
      image: this._Image,
      level: this._Level,
      id: this._Id,
      oc: this._OC,
      uc: this._UC,
      z: this._Z,
      maxz: this._MaxZ,
      mana: this._Mana,
      maxZ: this._MaxZ,
      group: this._Group,
      name: this._Name,
      xp: this._XP,
      item: this._Item,
      item2: this._Item2,
      str: this._STR,
      dex: this._DEX,
      con: this._CON,
      int: this._INT,
      char: this._CHAR,
      age: this._Age,
      skill: this._Skill
    }
  }

  public RollAttack() {
    this._Attack = K6plus() + this._UC;
  }

  useSkill(skill: ISkill, target: MobileObject) {
    skill.manipulate(this, target)
  }

  public CheckLevel() {
    if (this._XP >= 500 && this.Level === 1) {
      this._Level = 2
      this.RollNewLevel()
    }
    if (this._XP >= 1500 && this.Level === 2) {
      this._Level = 3;
      this.RollNewLevel()
    }
    if (this._XP >= 3000 && this.Level === 3) {
      this._Level = 4;
      this.RollNewLevel()
    }
    if (this._XP >= 5000 && this.Level === 4) {
      this._Level = 5;
      this.RollNewLevel()
    }
    if (this._XP >= 8000 && this.Level === 5) {
      this._Level = 6;
      this.RollNewLevel()
    }
    if (this._XP >= 11000 && this.Level === 6) {
      this._Level = 7;
      this.RollNewLevel()
    }
    if (this._XP >= 15000 && this.Level === 7) {
      this._Level = 8;
      this.RollNewLevel()
    }
    if (this._XP >= 20000 && this.Level === 8) {
      this._Level = 9;
      this.RollNewLevel()
    }
    if (this._XP >= 21000 && this.Level === 9) {
      this._Level = 10;
      this.RollNewLevel()
    }
  }

  public RollDefence() {
    if (!this._IsAlive) return;
    let def = K6plus() + this._OC;
    this._Defense = def;
  }

  public DamageMe(value: number) {
    this._Z -= value;
  }

  public HealMe(value: number) {
    if (this._Z < this._MaxZ) {
      this._Z += value;

      if (this._Z > this._MaxZ) this._Z = this._MaxZ
    }
  }

  public RollInitiative() {
    if (!this._IsAlive) return;
    let init = K6()
    this._Initiative = init
    JournalService.log(this.Name + ' hodil na iniciatívu ' + init, 30, 'initiative')
  }

  AttackOn(defender: MobileObject) {
    if (!this._IsAlive) return;
    JournalService.log(this.Name + ' ⚔️ ' + this._Attack + ' a ' + defender.Name + ' 🛡️' + defender._Defense + '', 30, 'fight')
    if (defender._Defense < this._Attack) {
      JournalService.log(defender.Name + ' - ' + (this._Attack - defender._Defense) + ' 🩸', 30)
      defender.DamageMe(this._Attack - defender._Defense)
      if (!defender.IsAlive) {
        this._XP += defender.XP
        this.CheckLevel()
      }
    }
  }

  private RollNewLevel() {
    let newHP = K8() + 2
    this._MaxZ += newHP
    this._Z += newHP
    this._UC += 2
    this._OC++
    this._Age++
  }
}
