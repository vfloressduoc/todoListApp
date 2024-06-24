import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeekPage } from './week.page';

describe('TodayPage', () => {
  let component: WeekPage;
  let fixture: ComponentFixture<WeekPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
