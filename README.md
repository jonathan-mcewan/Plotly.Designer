# Plotly Designer

A standalone, browser-based visual editor for building and customizing [Plotly.js](https://plotly.com/javascript/) charts. No server, no build step — just open `index.html` or visit the [live site](https://jonathan-mcewan.github.io/Plotly.Designer/).

![License](https://img.shields.io/badge/license-MIT-blue)
![Plotly.js](https://img.shields.io/badge/plotly.js-2.35.2-3F4F75)
![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)

---

## What It Does

Three-panel interface: **controls** on the left, **live chart preview** in the center, **JSON editor** on the right. Changes flow bidirectionally — edit a control and the JSON updates instantly; edit the JSON and the controls reflect it.

### Layout Editor
Every major Plotly layout attribute has a dedicated control — title, axes, margins, legend, hover behavior, colorway, modebar, transitions, and more. Organized in collapsible accordion sections with a search filter to find any property instantly.

### Trace Editor
Switch to the **Traces** tab to configure individual trace properties. Supports all common trace types with type-specific controls:

| Type | Properties |
|------|-----------|
| **Scatter** | mode, line (color/width/dash/shape), marker (color/size/symbol), fill, error bars |
| **Bar** | orientation, marker styling, text position, corner radius |
| **Pie** | hole (donut), direction, rotation, text info, pull |
| **Histogram** | bins, normalization, cumulative, marker |
| **Box / Violin** | points, mean, jitter, notch, bandwidth |
| **Heatmap / Contour** | colorscale, smoothing, gaps |
| **Surface / 3D Scatter** | lighting, contours, marker/line |
| **Funnel / Waterfall** | connectors, increasing/decreasing colors |
| **Treemap / Sunburst** | tiling, branch values, depth |
| **Indicator** | gauge, delta, number formatting |

### JSON Panel
Three tabs — **layout**, **data**, or **full** (`{data, layout}`) — with format, minify, copy, and apply buttons. Supports `Cmd+Enter` to apply and `Tab` for indentation.

### Theme
Follows your system `prefers-color-scheme` automatically. Manual toggle in the top-left corner. The app theme is independent of the chart's own `paper_bgcolor`/`plot_bgcolor`.

### Export
One-click export to a standalone HTML file that includes your traces and layout — ready to share or embed.

---

## Getting Started

### Option 1: GitHub Pages (recommended)
Visit **[jonathan-mcewan.github.io/Plotly.Designer](https://jonathan-mcewan.github.io/Plotly.Designer/)** — nothing to install.

### Option 2: Local
```bash
git clone https://github.com/jonathan-mcewan/Plotly.Designer.git
cd Plotly.Designer
open index.html        # macOS
# or: xdg-open index.html   # Linux
# or: start index.html       # Windows
```

No build step, no `npm install`, no server required. ES modules load natively in all modern browsers.

> **Note:** If you open `index.html` directly via `file://`, some browsers block ES module imports. Use a simple local server instead:
> ```bash
> python3 -m http.server 8000
> # then visit http://localhost:8000
> ```

---

## Project Structure

```
Plotly.Designer/
  index.html              # Markup only — no inline CSS or JS
  css/
    styles.css            # All styles, dark + light theme via CSS variables
  js/
    app.js                # Entry point — wires events, calls init
    constants.js          # Colorways, trace field definitions, sample data
    trace-editor.js       # Trace panel rendering + change handlers
    filter.js             # Layout filter + trace filter
    json-editor.js        # JSON panel: tabs, parse, format, copy, export
    ui-sync.js            # Bidirectional sync: layout <-> JSON <-> controls
    layout-controls.js    # Layout control change handler + accordion
    utils.js              # getPath/setPath, toHex, coerceValue
    state.js              # Shared mutable state singleton
    colorway.js           # Colorway preset picker
    theme.js              # System prefers-color-scheme + manual toggle
    chart.js              # Plotly newPlot/react wrapper
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus the filter search |
| `Escape` | Clear filter and blur |
| `Cmd/Ctrl + Enter` | Apply JSON editor contents |
| `Tab` (in JSON editor) | Insert 2 spaces |

---

## Tech

- **Plotly.js 2.35.2** via CDN — no bundling needed
- **ES Modules** — native browser imports, no transpiler
- **CSS Custom Properties** — shadcn/ui zinc palette for both dark and light themes
- **Zero dependencies** — no React, no framework, no build tools

---

## Contributing

1. Fork and clone
2. Make changes
3. Test by opening `index.html` locally (or `python3 -m http.server`)
4. Open a PR

---

## License

MIT
