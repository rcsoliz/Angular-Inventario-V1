import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParTabControlComponent } from './par-tab-control.component';

describe('ParTabControlComponent', () => {
  let component: ParTabControlComponent;
  let fixture: ComponentFixture<ParTabControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParTabControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParTabControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
