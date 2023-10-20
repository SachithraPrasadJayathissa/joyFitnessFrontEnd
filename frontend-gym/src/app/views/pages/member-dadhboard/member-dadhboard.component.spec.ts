import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDadhboardComponent } from './member-dadhboard.component';

describe('MemberDadhboardComponent', () => {
  let component: MemberDadhboardComponent;
  let fixture: ComponentFixture<MemberDadhboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDadhboardComponent]
    });
    fixture = TestBed.createComponent(MemberDadhboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
