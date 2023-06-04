import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
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
