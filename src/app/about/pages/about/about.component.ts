import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    template: `
        <div class="canvas">
            <div class="box">
                <h1>Raid!</h1>
                <p>
                    Vytor si partiu hrdinov s ktorými pôjdeš čistiť kraj od zloduchov.
                </p>
                <p>
                    V dedine im môžeš dať mocné predmety, môžu sa vyliečiť aj naučiť sa nové schopnosti.
                </p>
                <p>
                    V záložke Nájazd! ich pošleš do dobrodružstva, počas ktorého ich môžeš sledovať a pomáhať im.
                </p>
                <p>
                    V záložke úlohy môžeš začať plniť úlohu pre miestnych zemepánov a zarábať tak peniaze.
                </p>
                <p>
                    V Markete môžeš kupovať a predávať všetko od fľašiek až po samotných hrdinov.
                </p>
                <!--<input type="text" (input)="updateGreetText($event)">
                <p *ngIf="greetResponse">From Go: {{ greetResponse }}</p>-->
            </div>
            <br>
            <div class="box">
                TODO:<br>
                <ul>
                    <li>➡️ UI</li>
                    <li>nájazdy na rôzne lokácie</li>
                    <li>schopnosti</li>
                    <li>mapa</li>
                    <li>miestnosti</li>
                    <li>mestečko a jeho peniaze, ubytovanie, jedlo a pod.</li>
                    <li>liečenie pomocou schopností</li>
                    <li>skupiny dobrodruhov</li>
                    <li>nasadzovanie predmetov</li>
                    <li>truhlica</li>
                    <li>generátor predmetov</li>
                    <li>oživovanie padlých</li>
                    <li>povolania</li>
                    <li>detail postavy/predmetu</li>
                    <li>úlohy a ich plnenie</li>
                    <li>responzivita pre tablet/mobil</li>
                </ul>
            </div>
        </div>
    `,
    styles: [`
      :host {
        display: block;
        overflow: auto;
        height: 100%;
        background: #1f1f1f url("./../../../../assets/img/backgrounds/trolliastrmina.png") no-repeat center center fixed;
      }
    `],
    standalone: true
})
export class AboutComponent {

  greetResponse = "";

  constructor() { }

  updateGreetText(event: any): void {
    go.main.App.Greet(event.target.value).then((response: string) => this.greetResponse = response);
  }
}
