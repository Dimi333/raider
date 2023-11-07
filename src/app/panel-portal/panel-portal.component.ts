import { Component } from '@angular/core';

@Component({
    selector: 'app-panel-portal',
    template: `
    <ng-content></ng-content>
  `,
    standalone: true,
})
export class PanelPortalComponent {

}
