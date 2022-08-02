import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireDocumentComponent } from './require-document.component';

describe('RequireDocumentComponent', () => {
  let component: RequireDocumentComponent;
  let fixture: ComponentFixture<RequireDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequireDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
