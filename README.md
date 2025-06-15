# Heatmap Calendar Library

A customizable Angular library for displaying a heatmap calendar (like GitHub contributions) using HTML elements. Supports month/year views, color schemes, tooltips, and click events. Built with Angular 16+ and fully reactive using Angular signals.

## Project Structure

This is a monorepo containing:
- `projects/heatmap-calendar`: The main library package
- `projects/heatmap-calendar-showcase`: Demo application showcasing the library features

## Development

### Prerequisites
- Node.js (v16 or later)
- Angular CLI (v16 or later)

### Setup
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development Server

To start the showcase application for development:

```bash
ng serve heatmap-calendar-showcase
```

Navigate to `http://localhost:4200/` to see the demo application.

### Building the Library

To build the library:

```bash
ng build heatmap-calendar
```

The build artifacts will be stored in the `dist/heatmap-calendar` directory.

### Testing

Run unit tests:

```bash
ng test heatmap-calendar
```

## Documentation

For detailed documentation about the library's features, API, and usage examples, please refer to the [library README](projects/heatmap-calendar/README.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
