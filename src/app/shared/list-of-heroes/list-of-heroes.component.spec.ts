import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfHeroesComponent } from './list-of-heroes.component';

describe('ListOfHeroesComponent', () => {
  let component: ListOfHeroesComponent;
  let fixture: ComponentFixture<ListOfHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfHeroesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
