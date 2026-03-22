import { COLORWAYS, getSampleTraces } from './constants.js';

export const state = {
  layout: {
    autosize: true,
    title: { text: 'My Plotly Chart', x: 0.5, font: { size: 18 } },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#ffffff',
    font: { size: 12, color: '#444444' },
    margin: { l: 60, r: 40, t: 80, b: 60, pad: 0, autoexpand: true },
    showlegend: true,
    legend: { x: 1.02, y: 1, xanchor: 'left', yanchor: 'top', orientation: 'v' },
    xaxis: { showgrid: true, zeroline: true, automargin: true },
    yaxis: { showgrid: true, zeroline: true, automargin: true },
    hovermode: 'closest',
    dragmode: 'zoom',
    colorway: COLORWAYS.plotly,
  },
  traces: getSampleTraces('scatter', 'lines+markers'),
  currentTraceType: 'scatter',
  currentScatterMode: 'lines+markers',
  chartInitialized: false,
  activeJsonTab: 'layout',
  activeTraceIdx: 0,
  jsonEditorFocused: false,
  renderTimer: null,
  jsonParseTimer: null,
};

export function getDefaultLayout() {
  return {
    autosize: true,
    title: { text: 'My Plotly Chart', x: 0.5, font: { size: 18 } },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#ffffff',
    font: { size: 12, color: '#444444' },
    margin: { l: 60, r: 40, t: 80, b: 60, pad: 0, autoexpand: true },
    showlegend: true,
    legend: { x: 1.02, y: 1, xanchor: 'left', yanchor: 'top', orientation: 'v' },
    xaxis: { showgrid: true, zeroline: true, automargin: true },
    yaxis: { showgrid: true, zeroline: true, automargin: true },
    hovermode: 'closest',
    dragmode: 'zoom',
    colorway: COLORWAYS.plotly,
  };
}
