import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  value: string;
  name: string;
}

@Component({
  selector: 'app-get-value-dialog',
  template: `
      <p>{{data.name}}</p>
      <input type="text" [(ngModel)]="data.value"/>
      <button (click)="useValue()">Použiť</button>
  `,
  styles: [`
    :host {
      color: black;
    }
  `]
})
export class GetValueDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GetValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }
  useValue() {
    this.dialogRef.close(this.data);
  }
}
