import { Component, Input, Output, EventEmitter, signal, computed, effect, Signal } from '@angular/core';

export interface HeatmapData {
  date: string; // UTC date string
  value: number;
}

export type HeatmapView = 'month' | 'year';

@Component({
  selector: 'lib-heatmap-calendar',
  templateUrl: './heatmap-calendar.component.html',
  styleUrls: ['./heatmap-calendar.component.css']
})
export class HeatmapCalendarComponent {
  /**
   * Array of objects with date (UTC string) and value (number of occurrences)
   */
  @Input({ required: true }) data: Signal<HeatmapData[]> = signal([]);

  /**
   * View mode: 'month' or 'year'
   */
  @Input() view: Signal<HeatmapView> = signal('month');

  /**
   * Color scheme: array of color strings (from low to high)
   */
  @Input() colorScheme: Signal<string[]> = signal(['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']);

  /**
   * Emits when a cell is clicked
   */
  @Output() cellClick = new EventEmitter<{ date: string, value: number }>();

  /**
   * Computed grid for rendering
   */
  grid = computed(() => {
    const data = this.data();
    const view = this.view();
    const colorScheme = this.colorScheme();
    if (!data || data.length === 0) return [];
    // Map data by date for quick lookup
    const dataMap = new Map<string, number>();
    let minValue = Number.POSITIVE_INFINITY;
    let maxValue = Number.NEGATIVE_INFINITY;
    for (const item of data) {
      dataMap.set(item.date, item.value);
      if (item.value < minValue) minValue = item.value;
      if (item.value > maxValue) maxValue = item.value;
    }
    if (view === 'year') {
      const year = new Date(data[0].date).getUTCFullYear();
      const firstDay = new Date(Date.UTC(year, 0, 1));
      const lastDay = new Date(Date.UTC(year, 11, 31));
      let start = new Date(firstDay);
      start.setUTCDate(start.getUTCDate() - start.getUTCDay());
      let end = new Date(lastDay);
      end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));
      const weeks: { date: string, value: number, color: string }[][] = [];
      let current = new Date(start);
      while (current <= end) {
        const week: { date: string, value: number, color: string }[] = [];
        for (let d = 0; d < 7; d++) {
          const dateStr = current.toISOString().slice(0, 10);
          const value = dataMap.get(dateStr) ?? 0;
          week.push({
            date: dateStr,
            value,
            color: this.getColor(value, minValue, maxValue, colorScheme)
          });
          current.setUTCDate(current.getUTCDate() + 1);
        }
        weeks.push(week);
      }
      return Array.from({ length: 7 }, (_, day) => weeks.map(week => week[day]));
    } else {
      const firstDate = new Date(data[0].date);
      const year = firstDate.getUTCFullYear();
      const month = firstDate.getUTCMonth();
      const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
      const rows: { date: string, value: number, color: string }[][] = [];
      let week: { date: string, value: number, color: string }[] = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(Date.UTC(year, month, day));
        const dateStr = date.toISOString().slice(0, 10);
        const value = dataMap.get(dateStr) ?? 0;
        week.push({
          date: dateStr,
          value,
          color: this.getColor(value, minValue, maxValue, colorScheme)
        });
        if (date.getUTCDay() === 6 || day === daysInMonth) {
          rows.push(week);
          week = [];
        }
      }
      return rows;
    }
  });

  getColor(value: number, min: number, max: number, colorScheme: string[]): string {
    if (colorScheme.length === 0) return '#ebedf0';
    if (max === min) return colorScheme[colorScheme.length - 1];
    const idx = Math.floor(
      ((value - min) / (max - min)) * (colorScheme.length - 1)
    );
    return colorScheme[idx];
  }

  onCellClick(cell: { date: string, value: number }) {
    this.cellClick.emit(cell);
  }
}
