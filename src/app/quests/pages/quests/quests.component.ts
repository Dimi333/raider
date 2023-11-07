import { Component } from '@angular/core';

@Component({
    selector: 'app-quests',
    template: `
        <div class="canvas">
            <div class="box">
                <h1>Úlohy za odmenu</h1>
                <ul>
                    <li>Zlikviduj bossa miestneho podzemia (Veľškrat)</li>
                    <li>Zachráň uneseného dedinčana z Dalnu</li>
                    <li>Vyčisti studničku od hrozných žabiakov</li>
                    <li>Porátaj sa s miestnymi lúpežníkmi (Králi morí)</li>
                    <li>Zisti, prečo krčmárovi Berenovi stále kysne pivo</li>
                </ul>
            </div>
        </div>
    `,
    styles: [`
      :host {
        display: block;
        height: 100%;
        overflow: auto;
        background: #1f1f1f url("./../../../../assets/img/backgrounds/Daln.png") no-repeat center center fixed;
      }
    `],
    standalone: true
})
export class QuestsComponent {

}
