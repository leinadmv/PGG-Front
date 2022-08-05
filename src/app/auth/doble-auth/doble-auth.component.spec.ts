import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DobleAuthComponent } from './doble-auth.component';

describe('DobleAuthComponent', () => {
  let component: DobleAuthComponent;
  let fixture: ComponentFixture<DobleAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DobleAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DobleAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
