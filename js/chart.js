import { state } from './state.js';

export function renderChart() {
  const chartDiv = document.getElementById('chart');
  const config = {
    responsive: true,
    editable: false,
    displayModeBar: true,
    toImageButtonOptions: { format: 'png', scale: 2 },
  };
  if (!state.chartInitialized) {
    Plotly.newPlot(chartDiv, state.traces, state.layout, config);
    state.chartInitialized = true;
  } else {
    Plotly.react(chartDiv, state.traces, state.layout, config);
  }
}
