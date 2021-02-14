import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIngresoComponent } from './list-ingreso.component';

describe('ListIngresoComponent', () => {
  let component: ListIngresoComponent;
  let fixture: ComponentFixture<ListIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIngresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
