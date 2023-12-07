import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {DialogService} from "./home/services/dialog.service";
import {JournalService} from "./services/journal.service";
import {HeroService, uuidv4} from "./services/hero.service";
import {MobileObject} from "./services/MobileObject.class";
import {Occupation, Race} from "./services/utils";
import { Portal, TemplatePortal, PortalModule } from "@angular/cdk/portal";
import { Router, RouterOutlet, RouterLink } from "@angular/router";
import {DecimalPipe, PlatformLocation} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {GetValueDialogComponent} from "./shared/get-value-dialog/get-value-dialog.component";


@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <div class="game">
                <router-outlet></router-outlet>
                <div class="resources">
                    <span>Peniaze: {{ heroService.money | number: '1.0' }}</span><br>
                </div>
                <div class="panel">
                    <a routerLink="/">🏠 <span>Domov</span></a>
                    <a routerLink="/raid">⚔️ <span>Nájazd</span></a>
                    <a routerLink="/quests">💬 <span>Úlohy</span></a>
                    <a routerLink="/market">🏪 <span>Market</span></a>
                    <a routerLink="/about">ℹ️ <span>O hre</span></a>
                    <button (click)="save()">📘 Save</button>
                    <button (click)="load()">📖 Load</button>

                    <ng-template [cdkPortalOutlet]="selectedPortal"></ng-template>
                    <ng-template #templatePortalContentRaid>
                        <h1>Nájazd</h1>
                        <div [innerHTML]="JournalService.gameJournal"></div>
                    </ng-template>

                    <ng-template #templatePortalContentHome>
                        <h1>Tábor</h1>
                        <button (click)="createBand()">Vytvor skupinu 👥</button>
                    </ng-template>

                    <ng-template #templatePortalContentMarket>
                        <h1>Market</h1>
                        <button (click)="refreshMarket()">Obnoviť ♻️</button>
                    </ng-template>

                    <ng-template #templatePortalContentAbout>
                        <h1>O hre</h1>
                    </ng-template>

                    <ng-template #templatePortalContentQuests>
                        <h1>Úlohy</h1>
                    </ng-template>
                </div>
            </div>

            <small id="version">Verzia 0.0.2</small>
        </div>
    `,
    styles: [`
    .container {
      display: grid;
      height: 100vh;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      grid-template-areas:
    "game";
    }

    .game {
      grid-area: game;
      overflow: hidden;
      align-items: center;
    }

    .resources {
      position: absolute;
      top: 0;
      left: 0;
      background: #65310c url("./../assets/img/backgrounds/vrch.png");
      width: 100vw;
      height: 35px;
      z-index: 2;
    }

    .panel {
      background: url("../assets/img/backgrounds/wood.jpg") center center;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      height: 280px;
      width: 100vw;
      z-index: 2;

      a {
        color: white;
        text-decoration: none;
        font-size: xx-large;
        text-align: center;
        display: inline-block;
        background: #65310c;
        padding: 10px;
        margin: 3px;
        border-radius: 5px;
      }

      span {
        display: block;
        padding: 10px 10px;
        border-radius: 5px;
        margin-right: 5px;
      }
    }

    #version {
      position: absolute;
      bottom: 3px;
      left: 3px;
      font-size: 10px;
    }
  `],
    standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    PortalModule,
    DecimalPipe
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('templatePortalContentRaid') templatePortalContentRaid!: TemplateRef<unknown>;
  @ViewChild('templatePortalContentHome') templatePortalContentHome!: TemplateRef<unknown>;
  @ViewChild('templatePortalContentMarket') templatePortalContentMarket!: TemplateRef<unknown>;
  @ViewChild('templatePortalContentAbout') templatePortalContentAbout!: TemplateRef<unknown>;
  @ViewChild('templatePortalContentQuests') templatePortalContentQuests!: TemplateRef<unknown>;

  heroService = inject(HeroService)

  templatePortalRaid!: TemplatePortal<unknown>;
  templatePortalHome!: TemplatePortal<unknown>;
  templatePortalMarket!: TemplatePortal<unknown>;
  templatePortalAbout!: TemplatePortal<unknown>;
  templatePortalQuests!: TemplatePortal<unknown>;
  selectedPortal!: Portal<any>;

  constructor(
    public js: JournalService,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private hs: HeroService,
    private _viewContainerRef: ViewContainerRef,
    private router: Router,
    private pLocation: PlatformLocation,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.templatePortalRaid = new TemplatePortal(this.templatePortalContentRaid, this._viewContainerRef)
    this.templatePortalHome = new TemplatePortal(this.templatePortalContentHome, this._viewContainerRef)
    this.templatePortalMarket = new TemplatePortal(this.templatePortalContentMarket, this._viewContainerRef)
    this.templatePortalAbout = new TemplatePortal(this.templatePortalContentAbout, this._viewContainerRef)
    this.templatePortalQuests = new TemplatePortal(this.templatePortalContentQuests, this._viewContainerRef)

    this.router.events.subscribe(value => {
      console.log('current route: ', this.router.url.toString());
      if ((this.pLocation as any)._location.hash === '#/') {
        this.selectedPortal = this.templatePortalHome
      }

      if ((this.pLocation as any)._location.hash === '#/raid') {
        this.selectedPortal = this.templatePortalRaid
      }

      if ((this.pLocation as any)._location.hash === '#/market') {
        this.selectedPortal = this.templatePortalMarket
      }

      if ((this.pLocation as any)._location.hash === '#/about') {
        this.selectedPortal = this.templatePortalAbout
      }

      if ((this.pLocation as any)._location.hash === '#/quests') {
        this.selectedPortal = this.templatePortalQuests
      }
    });
  }

  updateLanguage(event: any): void {
  }

  openDialog(): void {
    this.dialogService.open();
  }

  save() {
    localStorage.setItem('save', JSON.stringify(this.heroService.heroes))
    localStorage.setItem('money', JSON.stringify(this.heroService.money))
    localStorage.setItem('bands', JSON.stringify(this.heroService.bands))
  }

  load() {
    const data = localStorage.getItem('save');
    const data2 = localStorage.getItem('money');
    const data3 = localStorage.getItem('bands');
    if (data) {
      const dat = JSON.parse(data)
      const heroes: MobileObject[] = []
      dat.forEach((d: {
        id: string;
        name: string;
        race: Race;
        occupation: Occupation;
        image: string;
        item: string;
        item2: string;
        level: number;
        uc: number;
        oc: number;
        z: number;
        maxz: number;
        str: number;
        dex: number;
        con: number;
        int: number;
        char: number;
        mana: number;
        maxMana: number;
        group: number;
        xp: number;
        age: number;
        skill: string;
        band: string;
      }) => heroes.push(this.heroService.createHero(d)))

      this.heroService.heroes = heroes
    }

    if (data2) {
      this.heroService.money = +data2
    }

    if (data3) {
      this.heroService.bands = JSON.parse(data3)
    }
  }

  createBand() {
    const dialogRef = this.dialog.open(GetValueDialogComponent, {
      data: {name: "Zadaj meno skupiny", value: ""},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result.value) {
        let name = result.value;
        this.heroService.bands.push({id: uuidv4(), name, heroes: []})
      }
    });
  }

  refreshMarket() {
    alert("neimplementované")
  }

  protected readonly JournalService = JournalService;


}
