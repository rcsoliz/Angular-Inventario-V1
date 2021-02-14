import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGestionComponent } from './add-edit-gestion.component';

describe('AddEditGestionComponent', () => {
  let component: AddEditGestionComponent;
  let fixture: ComponentFixture<AddEditGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
