import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCallComponent } from './request-call.component';

describe('RequestCallComponent', () => {
  let component: RequestCallComponent;
  let fixture: ComponentFixture<RequestCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
