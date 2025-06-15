import { Component, Output, EventEmitter, computed, Signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HeatmapData {
  date: string; // UTC date string
  value: number;
}

export type HeatmapView = 'month' | 'year';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@Component({
  selector: 'lib-heatmap-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heatmap-calendar.component.html',
  styleUrls: ['./heatmap-calendar.component.css']
})
export class HeatmapCalendarComponent {
  public data = input.required<HeatmapData[]>();
  public view = input.required<HeatmapView>();
  public colorScheme = input.required<string[]>();
  public startDate = input.required<string>();
  public endDate = input.required<string>();

  @Output() cellClick = new EventEmitter<{ date: string, value: number }>();

  grid = computed(() => {
    const data = this.data();
    const colorScheme = this.colorScheme();
    const startDate = this.startDate();
    const endDate = this.endDate();
    if (!startDate || !endDate) return [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Map data by date for quick lookup
    const dataMap = new Map<string, number>();
    let minValue = Number.POSITIVE_INFINITY;
    let maxValue = Number.NEGATIVE_INFINITY;
    for (const item of data) {
      dataMap.set(item.date, item.value);
      if (item.value < minValue) minValue = item.value;
      if (item.value > maxValue) maxValue = item.value;
    }
    // Build grid: weeks x days, covering the full range
    // Find the first Sunday before or on start
    let gridStart = new Date(start);
    gridStart.setUTCDate(gridStart.getUTCDate() - gridStart.getUTCDay());
    // Find the last Saturday after or on end
    let gridEnd = new Date(end);
    gridEnd.setUTCDate(gridEnd.getUTCDate() + (6 - gridEnd.getUTCDay()));
    // Build weeks
    const weeks: { date: string, value: number, color: string, inRange: boolean, month: number }[][] = [];
    let current = new Date(gridStart);
    while (current <= gridEnd) {
      const week: { date: string, value: number, color: string, inRange: boolean, month: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = current.toISOString().slice(0, 10);
        const inRange = current >= start && current <= end;
        const value = inRange ? (dataMap.get(dateStr) ?? 0) : 0;
        week.push({
          date: dateStr,
          value,
          color: inRange ? this.getColor(value, minValue, maxValue, colorScheme) : '#f5f5f5',
          inRange,
          month: current.getUTCMonth()
        });
        current.setUTCDate(current.getUTCDate() + 1);
      }
      weeks.push(week);
    }
    // Transpose weeks to rows by day (for HTML grid)
    return Array.from({ length: 7 }, (_, day) => weeks.map(week => week[day]));
  });

  monthLabels = computed(() => {
    const startDate = this.startDate();
    const endDate = this.endDate();
    if (!startDate || !endDate) return [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    let gridStart = new Date(start);
    gridStart.setUTCDate(gridStart.getUTCDate() - gridStart.getUTCDay());
    let gridEnd = new Date(end);
    gridEnd.setUTCDate(gridEnd.getUTCDate() + (6 - gridEnd.getUTCDay()));
    const labels: { month: number, label: string, weekIndex: number }[] = [];
    let current = new Date(gridStart);
    let lastMonth = -1;
    let weekIndex = 0;
    while (current <= gridEnd) {
      const month = current.getUTCMonth();
      if (month !== lastMonth) {
        labels.push({ month, label: MONTHS[month], weekIndex });
        lastMonth = month;
      }
      current.setUTCDate(current.getUTCDate() + 7);
      weekIndex++;
    }
    return labels;
  });

  dayLabels = DAYS_OF_WEEK;

  monthGroups = computed(() => {
    return this.monthLabels().map(l => l.weekIndex);
  });

  getColor(value: number, min: number, max: number, colorScheme: string[]): string {
    if (colorScheme.length === 0) return '#ebedf0';
    if (max === min) return colorScheme[colorScheme.length - 1];
    const idx = Math.floor(
      ((value - min) / (max - min)) * (colorScheme.length - 1)
    );
    return colorScheme[idx];
  }

  onCellClick(cell: { date: string, value: number, inRange: boolean }) {
    if (cell.inRange) {
      this.cellClick.emit(cell);
    }
  }
}
