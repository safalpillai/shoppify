import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLinksComponent } from './dash-links.component';

describe('DashLinksComponent', () => {
  let component: DashLinksComponent;
  let fixture: ComponentFixture<DashLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
