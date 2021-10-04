import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SagitComponent } from './sagit.component';

describe('SagitComponent', () => {
  let component: SagitComponent;
  let fixture: ComponentFixture<SagitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SagitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SagitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
