import { state } from './state.js';

export function renderChart() {
  const chartDiv = document.getElementById('chart');
  const config = {
    responsive: true,
    editable: false,
    displayModeBar: true,
    toImageButtonOptions: { format: 'png', scale: 2 },
  };
  try {
    // Clear any previous error display
    const errEl = chartDiv.querySelector('.chart-error');
    if (errEl) errEl.remove();

    if (!state.chartInitialized) {
      Plotly.newPlot(chartDiv, state.traces, state.layout, config);
      state.chartInitialized = true;
    } else {
      Plotly.react(chartDiv, state.traces, state.layout, config);
    }
  } catch (e) {
    console.warn('Chart render error:', e.message);
    state.chartInitialized = false;
    // Show error inline so user can fix via JSON/controls
    let errEl = chartDiv.querySelector('.chart-error');
    if (!errEl) {
      errEl = document.createElement('div');
      errEl.className = 'chart-error';
      errEl.style.cssText = 'position:absolute;bottom:12px;left:12px;right:12px;padding:10px 14px;background:hsl(0 72% 51%/0.12);border:1px solid hsl(0 72% 51%/0.3);border-radius:6px;font-size:12px;color:hsl(0 72% 60%);font-family:monospace;z-index:100;max-height:120px;overflow:auto;';
      chartDiv.style.position = 'relative';
      chartDiv.appendChild(errEl);
    }
    errEl.textContent = e.message;
  }
}
