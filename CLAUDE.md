# CLAUDE.md

## Project Overview

Plotly Designer is a standalone, zero-dependency web application for visually building Plotly.js charts. It runs entirely in the browser with no build step — just static HTML, CSS, and ES modules.

## Architecture

- **No framework** — vanilla JS with ES modules (`<script type="module">`)
- **No build tools** — no bundler, no transpiler, no npm
- **Single-page app** — `index.html` loads `css/styles.css` and `js/app.js` (entry point)
- **Plotly.js loaded from CDN** — referenced as a global (`Plotly`) in chart.js

### Module Dependency Graph

```
app.js (entry)
  ├── theme.js           (no deps)
  ├── filter.js           (no deps)
  ├── constants.js        (no deps)
  ├── utils.js            (no deps)
  ├── state.js            ← constants
  ├── chart.js            ← state
  ├── ui-sync.js          ← state, utils, chart, constants
  ├── layout-controls.js  ← state, utils, ui-sync
  ├── trace-editor.js     ← constants, state, utils, ui-sync, chart
  ├── json-editor.js      ← state, ui-sync, chart, trace-editor
  └── colorway.js         ← constants, state, ui-sync
```

No circular dependencies. `ui-sync.js` inlines the colorway swatch rendering to avoid a sync↔colorway cycle.

### State Management

`state.js` exports a single mutable object (`state`) shared across all modules. It holds:
- `layout` — the Plotly layout config object
- `traces` — array of Plotly trace objects
- `activeJsonTab`, `activeTraceIdx`, `chartInitialized`, etc.

### Bidirectional Sync

The core sync loop:
1. **Control → layout → JSON → chart**: `handleControlChange` → `setPath(state.layout, ...)` → `applyAndRender()` → `syncJSON()` + `renderChart()`
2. **JSON → layout → controls → chart**: `applyJSONContent()` → parse → assign to `state.layout`/`state.traces` → `syncUI()` + `renderChart()`

### Theming

CSS custom properties defined on `:root` (dark default) and `[data-theme="light"]`. `theme.js` reads `prefers-color-scheme` at startup and watches for OS changes. The `data-theme` attribute on `<html>` drives all theming — no JS class toggling needed beyond that one attribute.

## Conventions

- All layout control inputs use `data-path` attributes (e.g., `data-path="xaxis.showgrid"`) for automatic path-based binding
- Trace editor fields use `data-trace-path` / `data-trace-idx` / `data-trace-kind` attributes
- CSS class `.ctrl` is the base style for all form inputs
- Filter bars use `.filter-input` and `.filter-clear-btn` classes (shared between layout and trace filters)
- Accordion sections use `.section-toggle` buttons with `data-section` mapped to `#s-{name}` body divs

## Testing

No test framework. To verify changes, open `index.html` in a browser (use `python3 -m http.server` for ES module support) and check:
1. Controls update JSON bidirectionally
2. Chart re-renders on control/JSON changes
3. Light/dark theme toggle works and follows system preference
4. Trace editor renders correct fields per trace type
5. Filter search works on both Layout and Traces tabs
6. Export produces a working standalone HTML file

## Deployment

GitHub Pages via `.github/workflows/deploy.yml` — pushes to `main` or `master` trigger automatic deployment. No build step needed; the workflow just uploads the static files.
