import {Component, OnInit} from '@angular/core';

import {DialogService} from "./home/services/dialog.service";
import {JournalService} from "./services/journal.service";
import {HeroService} from "./services/hero.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public js: JournalService,
    private dialogService: DialogService,
    private hs: HeroService
  ) {
  }

  ngOnInit(): void {
    this.hs.addHeroToHeroes()
  }

  updateLanguage(event: any): void {
  }

  openDialog(): void {
    this.dialogService.open();
  }

  protected readonly JournalService = JournalService;
}
