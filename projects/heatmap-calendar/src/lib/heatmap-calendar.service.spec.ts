import { TestBed } from '@angular/core/testing';

import { HeatmapCalendarService } from './heatmap-calendar.service';

describe('HeatmapCalendarService', () => {
  let service: HeatmapCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeatmapCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
