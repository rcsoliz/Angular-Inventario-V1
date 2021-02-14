import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInventarioComponent } from './add-edit-inventario.component';

describe('AddEditInventarioComponent', () => {
  let component: AddEditInventarioComponent;
  let fixture: ComponentFixture<AddEditInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
