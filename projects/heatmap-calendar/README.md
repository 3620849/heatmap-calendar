# Heatmap Calendar Library

A customizable Angular library for displaying a heatmap calendar (like GitHub contributions) using HTML elements. Supports month/year views, color schemes, tooltips, and click events.

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

### 2. Prepare Data

The component expects an array of objects with a `date` (UTC string, e.g. '2024-06-15') and a `value` (number of occurrences):

```typescript
heatmapData = [
  { date: '2024-06-01', value: 2 },
  { date: '2024-06-02', value: 5 },
  // ...
];
```

### 3. Use the Component

**Month View Example:**
```html
<lib-heatmap-calendar
  [data]="heatmapData"
  view="month"
  [colorScheme]="['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']"
  (cellClick)="onCellClick($event)"
></lib-heatmap-calendar>
```

**Year View Example:**
```html
<lib-heatmap-calendar
  [data]="heatmapData"
  view="year"
  [colorScheme]="['#f0f0f0', '#b3cde0', '#6497b1', '#005b96', '#03396c']"
></lib-heatmap-calendar>
```

### 4. Handle Cell Clicks

```typescript
onCellClick(event: { date: string, value: number }) {
  alert(`Date: ${event.date}\nValue: ${event.value}`);
}
```

### 5. Customization
- **Color Scheme:** Pass any array of color strings to `[colorScheme]`.
- **Tooltips:** Hovering a cell shows the date and value.
- **HTML-based:** The grid is rendered with `<div>`s for easy CSS customization.

---

## API

| Input         | Type                | Description                                  |
|---------------|---------------------|----------------------------------------------|
| `data`        | `HeatmapData[]`     | Array of `{ date: string, value: number }`   |
| `view`        | `'month' | 'year'`  | Calendar view mode                           |
| `colorScheme` | `string[]`          | Array of colors (low to high)                |

| Output      | Type                                 | Description                  |
|-------------|--------------------------------------|------------------------------|
| `cellClick` | `{ date: string, value: number }`     | Emits when a cell is clicked |

---

## License
MIT
