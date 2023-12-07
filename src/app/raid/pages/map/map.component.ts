import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: 'app-map',
    template: `
        <div class="canvas">
            <div class="box">
                <p>Zvoľ si nájazd (náročnosť): (aby si mohol ísť na nájazd, potrebuješ mať vytvorenú aspoň 1 skupinu
                    dobrodruhov)</p>
                <table class="maptable">
                    <tr>
                        <td>
                            <div class="">Žltý močiar (1)
                                <button routerLink="adventure/1/0/false">Vyslať</button>
                            </div>
                        </td>
                        <td>
                            <div class="">Okolie Dalnu (3)
                                <button routerLink="adventure/3/0/false">Vyslať</button>
                            </div>
                        </td>
                        <td>
                            <div class="">Hory počiatku (4)
                                <button routerLink="adventure/4/0/false">Vyslať</button>
                            </div>
                        </td>
                    </tr>
                   <tr>
                    <td colspan="3">
                      <div class="">Boss 1
                        <button routerLink="adventure/1/0/true">Vyslať</button>
                      </div>
                    </td>
                  </tr>
                    <tr>
                        <td>
                            <div class="">Čierne hory (5)
                                <button routerLink="adventure/5/0/false">Vyslať</button>
                            </div>
                        </td>
                        <td>
                            <div class="">Pútnikov hvozd (10)
                                <button routerLink="adventure/10/0/false">Vyslať</button>
                            </div>
                        </td>
                        <td>
                            <div class="">Tumno (24)
                                <button routerLink="adventure/24/0/false">Vyslať</button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `,
    styles: [`
      :host {
        display: block;
        height: 100%;
        overflow: auto;
        background: #1f1f1f url("./../../../../assets/img/backgrounds/trolliastrmina.png") no-repeat center center fixed;
      }

      .maptable {
        width: 100%;

        td {
          height: 4em;
        }
      }
    `],
    standalone: true,
    imports: [RouterLink]
})
export class MapComponent {
  chosenBandId: number | undefined

  constructor(private router: Router) {
    if (!this.chosenBandId) {
      // let chosenBand = prompt('Zvoľ skupinu, ktorú tam chceš poslať:\n' + this.heroService.bands.reduce((accumulator, itemInArray, index) => accumulator + (index + 1) + ')' + itemInArray.name + '\n', ''))

      // if (chosenBand) {
      //   let where = Number.parseInt(chosenBand) - 1

        // this.heroes = this.filterByBand.transform(this.heroService.heroes, this.heroService.bands[where].id)

      // }
    }
  }
}
