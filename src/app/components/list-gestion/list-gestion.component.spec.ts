import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGestionComponent } from './list-gestion.component';

describe('ListGestionComponent', () => {
  let component: ListGestionComponent;
  let fixture: ComponentFixture<ListGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
