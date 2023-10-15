import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetrainerComponent } from './managetrainer.component';

describe('ManagetrainerComponent', () => {
  let component: ManagetrainerComponent;
  let fixture: ComponentFixture<ManagetrainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagetrainerComponent]
    });
    fixture = TestBed.createComponent(ManagetrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
