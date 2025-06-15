# Heatmap Calendar Library

A customizable Angular library for displaying a heatmap calendar (like GitHub contributions) using HTML elements. Supports month/year views, color schemes, tooltips, and click events. **Now fully reactive with Angular signals!**

---

## Features

- 📅 Month and Year view modes
- 🎨 Customizable color schemes
- 📊 Visual month separators in year view
- 📝 Day and month labels
- 🖱️ Interactive cells with hover effects
- 💡 Tooltips showing date and value
- ⚡ Fully reactive using Angular signals
- 🎯 Accessible keyboard navigation

---

## Installation

1. **Build the library:**
   ```bash
   ng build heatmap-calendar
   ```
2. **Install the built package in your Angular app:**
   - Copy the output from `dist/heatmap-calendar` to your app, or publish to npm and install via npm/yarn.
   - Example (local):
     ```bash
     npm install ../dist/heatmap-calendar
     ```

## Usage

### 1. Import the Module

In your app module:

```typescript
import { HeatmapCalendarModule } from 'heatmap-calendar';

@NgModule({
  imports: [
    // ...
    HeatmapCalendarModule
  ],
})
export class AppModule {}
```

### 2. Prepare Data as Signals

The component expects Angular signals for all inputs. You can use the `signal` function from `@angular/core`:

```typescript
import { signal } from '@angular/core';

// Your heatmap data
heatmapData = signal([
  { date: '2024-06-01', value: 2 },
  { date: '2024-06-02', value: 5 },
  // ...
]);

// View mode: 'month' or 'year'
viewMode = signal<'month' | 'year'>('month');

// Color scheme from low to high intensity
colorScheme = signal(['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']);

// Date range for the heatmap
startDate = signal('2024-01-01');
endDate = signal('2024-12-31');
```

### 3. Use the Component

```html
<lib-heatmap-calendar
  [data]="heatmapData"
  [view]="viewMode"
  [colorScheme]="colorScheme"
  [startDate]="startDate"
  [endDate]="endDate"
  (cellClick)="onCellClick($event)"
></lib-heatmap-calendar>
```

### 4. Handle Cell Clicks

```typescript
onCellClick(event: { date: string, value: number }) {
  console.log(`Date: ${event.date}, Value: ${event.value}`);
}
```

### 5. Customization

- **Color Scheme:** Pass any array of color strings to the `colorScheme` signal. Colors should be ordered from lowest to highest intensity.
- **View Mode:** Switch between 'month' and 'year' views using the `view` signal.
- **Date Range:** Set the start and end dates for the heatmap using `startDate` and `endDate` signals.
- **Tooltips:** Hovering a cell shows the date and value.
- **Month Separators:** In year view, months are visually separated with subtle dividers.
- **Labels:** Day and month labels are automatically displayed and styled.

---

## API

| Input         | Type                        | Description                                  |
|---------------|-----------------------------|----------------------------------------------|
| `data`        | `Signal<HeatmapData[]>`     | Signal of array `{ date: string, value: number }` |
| `view`        | `Signal<'month' | 'year'>`  | Signal for calendar view mode                |
| `colorScheme` | `Signal<string[]>`          | Signal of array of colors (low to high)      |
| `startDate`   | `Signal<string>`            | Signal for start date (YYYY-MM-DD)           |
| `endDate`     | `Signal<string>`            | Signal for end date (YYYY-MM-DD)             |

| Output      | Type                                 | Description                  |
|-------------|--------------------------------------|------------------------------|
| `cellClick` | `{ date: string, value: number }`    | Emits when a cell is clicked |

---

## Styling

The component uses CSS Grid and Flexbox for layout. You can customize the appearance by overriding these CSS classes:

- `.heatmap-calendar`: Main container
- `.month-labels`: Month labels container
- `.day-labels`: Day labels container
- `.heatmap-cells`: Grid of heatmap cells
- `.heatmap-cell`: Individual cell
- `.month-separator`: Month separator in year view

---

## Why Signals?
- **Performance:** Signals enable fine-grained reactivity and efficient change detection in Angular 16+.
- **Simplicity:** No need for manual change detection or lifecycle hooks for input changes.
- **Future-proof:** Aligns with Angular's new reactive primitives.

---

## License
MIT
