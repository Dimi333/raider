import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  static get gameJournal(): string {
    return this._gameJournal
  }

  private static _gameJournal: string = ''

  constructor() { }

  static log(message: string, offset: number = 0, type: string = '') {
    this._gameJournal = '<div class="message offset'+ offset +' type'+type+'">' + message + '</div><br>' + this._gameJournal
  }

  static resetLog() {
    this._gameJournal = ''
  }
}
