import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapCalendarComponent } from './heatmap-calendar.component';

describe('HeatmapCalendarComponent', () => {
  let component: HeatmapCalendarComponent;
  let fixture: ComponentFixture<HeatmapCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatmapCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatmapCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
