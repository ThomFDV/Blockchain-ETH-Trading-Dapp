import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingFormComponent } from './selling-form.component';

describe('SellingFormComponent', () => {
  let component: SellingFormComponent;
  let fixture: ComponentFixture<SellingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
