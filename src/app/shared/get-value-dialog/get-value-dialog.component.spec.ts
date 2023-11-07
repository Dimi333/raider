import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetValueDialogComponent } from './get-value-dialog.component';

describe('GetValueDialogComponent', () => {
  let component: GetValueDialogComponent;
  let fixture: ComponentFixture<GetValueDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [GetValueDialogComponent]
});
    fixture = TestBed.createComponent(GetValueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
