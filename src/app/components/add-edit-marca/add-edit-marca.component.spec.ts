import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMarcaComponent } from './add-edit-marca.component';

describe('AddEditMarcaComponent', () => {
  let component: AddEditMarcaComponent;
  let fixture: ComponentFixture<AddEditMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMarcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
