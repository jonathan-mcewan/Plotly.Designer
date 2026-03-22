import { getSampleTraces } from './constants.js';
import { state, getDefaultLayout } from './state.js';
import { renderChart } from './chart.js';
import { syncJSON, syncUI, applyAndRender } from './ui-sync.js';
import { handleControlChange, initSectionToggles } from './layout-controls.js';
import { renderTraceEditor, renderTraceSelector, handleTraceFieldChange } from './trace-editor.js';
import { initJsonEditor } from './json-editor.js';
import { initColorway } from './colorway.js';
import { initLayoutFilter, initTraceFilter } from './filter.js';
import { initTheme } from './theme.js';

// ── Theme ───────────────────────────────────────────────
initTheme();

// ── Section toggles ─────────────────────────────────────
initSectionToggles();

// ── Layout control events ───────────────────────────────
document.getElementById('controls-body').addEventListener('change', handleControlChange);
document.getElementById('controls-body').addEventListener('input', e => {
  const el = e.target;
  if (el.type === 'range' || el.type === 'number' || el.type === 'text' || el.type === 'color') {
    handleControlChange(e);
  }
});

// ── Trace editor events ─────────────────────────────────
document.getElementById('trace-editor-body').addEventListener('change', handleTraceFieldChange);
document.getElementById('trace-editor-body').addEventListener('input', e => {
  if (['text','number','color'].includes(e.target.type)) handleTraceFieldChange(e);
});

// ── JSON editor ─────────────────────────────────────────
initJsonEditor();

// ── Colorway ────────────────────────────────────────────
initColorway();

// ── Filters ─────────────────────────────────────────────
initLayoutFilter();
initTraceFilter();

// ── Left panel tab switching ────────────────────────────
document.querySelectorAll('.panel-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.panel-tab-btn').forEach(b => b.classList.toggle('active', b === btn));
    const tab = btn.dataset.panelTab;
    document.getElementById('panel-tab-layout').style.display = tab === 'layout' ? 'flex' : 'none';
    document.getElementById('panel-tab-traces').style.display = tab === 'traces' ? 'flex' : 'none';
    if (tab === 'traces') {
      renderTraceSelector();
      renderTraceEditor(state.activeTraceIdx);
    }
  });
});

// ── Trace type switcher ─────────────────────────────────
document.getElementById('trace-type-select').addEventListener('change', function() {
  state.currentTraceType = this.value;
  state.traces = getSampleTraces(state.currentTraceType, state.currentScatterMode);
  state.chartInitialized = false;
  renderTraceSelector();
  renderTraceEditor(0);
  syncJSON();
  renderChart();
});

document.getElementById('scatter-mode-select').addEventListener('change', function() {
  state.currentScatterMode = this.value;
  if (state.currentTraceType === 'scatter') {
    state.traces = getSampleTraces('scatter', state.currentScatterMode);
    renderChart();
  }
});

document.getElementById('btn-add-trace').addEventListener('click', () => {
  const newTrace = getSampleTraces(state.currentTraceType, state.currentScatterMode)[0];
  if (newTrace) {
    newTrace.name = `Trace ${state.traces.length}`;
    state.traces.push(newTrace);
    renderTraceSelector();
    renderTraceEditor(state.traces.length - 1);
    syncJSON();
    renderChart();
  }
});

// ── Reset ───────────────────────────────────────────────
document.getElementById('btn-reset').addEventListener('click', () => {
  state.layout = getDefaultLayout();
  syncUI();
  syncJSON();
  renderChart();
});

// ── Responsive resize ───────────────────────────────────
const resizeObs = new ResizeObserver(() => {
  if (state.chartInitialized) Plotly.Plots.resize(document.getElementById('chart'));
});
resizeObs.observe(document.getElementById('chart'));

// ── Init ────────────────────────────────────────────────
syncUI();
syncJSON();
renderChart();
renderTraceSelector();
renderTraceEditor(0);
