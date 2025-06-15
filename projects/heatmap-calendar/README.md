# Heatmap Calendar Library

A customizable Angular library for displaying a heatmap calendar (like GitHub contributions) using HTML elements. Supports month/year views, color schemes, tooltips, and click events. **Now fully reactive with Angular signals!**

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

heatmapData = signal([
  { date: '2024-06-01', value: 2 },
  { date: '2024-06-02', value: 5 },
  // ...
]);

viewMode = signal<'month' | 'year'>('month');
colorScheme = signal(['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']);
```

### 3. Use the Component with Signals

**Month View Example:**
```html
<lib-heatmap-calendar
  [data]="heatmapData"
  [view]="viewMode"
  [colorScheme]="colorScheme"
  (cellClick)="onCellClick($event)"
></lib-heatmap-calendar>
```

**Year View Example:**
```typescript
viewMode.set('year');
colorScheme.set(['#f0f0f0', '#b3cde0', '#6497b1', '#005b96', '#03396c']);
```

### 4. Handle Cell Clicks

```typescript
onCellClick(event: { date: string, value: number }) {
  alert(`Date: ${event.date}\nValue: ${event.value}`);
}
```

### 5. Customization
- **Color Scheme:** Pass any array of color strings to the `colorScheme` signal.
- **Tooltips:** Hovering a cell shows the date and value.
- **HTML-based:** The grid is rendered with `<div>`s for easy CSS customization.
- **Reactive:** All updates to signals are reflected instantly in the view.

---

## API

| Input         | Type                        | Description                                  |
|---------------|-----------------------------|----------------------------------------------|
| `data`        | `Signal<HeatmapData[]>`     | Signal of array `{ date: string, value: number }` |
| `view`        | `Signal<'month' | 'year'>`  | Signal for calendar view mode                |
| `colorScheme` | `Signal<string[]>`          | Signal of array of colors (low to high)      |

| Output      | Type                                 | Description                  |
|-------------|--------------------------------------|------------------------------|
| `cellClick` | `{ date: string, value: number }`     | Emits when a cell is clicked |

---

## Why Signals?
- **Performance:** Signals enable fine-grained reactivity and efficient change detection in Angular 16+.
- **Simplicity:** No need for manual change detection or lifecycle hooks for input changes.
- **Future-proof:** Aligns with Angular's new reactive primitives.

---

## License
MIT
