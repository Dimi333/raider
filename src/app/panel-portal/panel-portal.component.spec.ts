import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPortalComponent } from './panel-portal.component';

describe('PanelPortalComponent', () => {
  let component: PanelPortalComponent;
  let fixture: ComponentFixture<PanelPortalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PanelPortalComponent]
});
    fixture = TestBed.createComponent(PanelPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
