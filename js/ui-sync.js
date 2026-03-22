import { state } from './state.js';
import { getPath, toHex } from './utils.js';
import { renderChart } from './chart.js';
import { COLORWAYS } from './constants.js';

export function setStatus(cls, msg) {
  const s = document.getElementById('json-status');
  s.className = cls;
  s.textContent = msg;
}

export function getJSONContent() {
  switch (state.activeJsonTab) {
    case 'data':   return JSON.stringify(state.traces, null, 2);
    case 'full':   return JSON.stringify({ data: state.traces, layout: state.layout }, null, 2);
    default:       return JSON.stringify(state.layout, null, 2);
  }
}

export function syncJSON() {
  if (state.jsonEditorFocused) return;
  const ed = document.getElementById('json-editor');
  try {
    ed.value = getJSONContent();
    setStatus('ok', '✓ valid');
  } catch (e) {
    setStatus('err', '✗ serialize error');
  }
}

export function syncUI() {
  document.querySelectorAll('#controls-body [data-path]').forEach(el => {
    const path = el.dataset.path;
    const type = el.dataset.type || '';
    if (type === 'range-item') return;

    const val = getPath(state.layout, path);
    if (val === undefined) {
      if (el.type === 'checkbox') el.checked = false;
      else if (el.type !== 'color') el.value = '';
      return;
    }

    if (el.type === 'checkbox') {
      el.checked = Boolean(val);
    } else if (type === 'color-picker') {
      el.value = toHex(val);
    } else if (type === 'color-text') {
      el.value = String(val);
    } else if (type === 'mixed-bool') {
      el.value = String(val);
    } else if (el.tagName === 'SELECT') {
      el.value = String(val);
    } else {
      el.value = val == null ? '' : String(val);
    }
  });

  // range items
  document.querySelectorAll('#controls-body [data-type="range-item"]').forEach(el => {
    const path = el.dataset.path;
    const m = path.match(/^(.+)\[(\d+)\]$/);
    if (!m) return;
    const arr = getPath(state.layout, m[1]);
    const idx = parseInt(m[2]);
    el.value = (arr && arr[idx] != null) ? String(arr[idx]) : '';
  });

  // colorway swatches (inline to avoid circular dep)
  const container = document.getElementById('colorway-swatches');
  if (container) {
    const colors = state.layout.colorway || COLORWAYS.plotly;
    container.innerHTML = '';
    colors.forEach(c => {
      const div = document.createElement('div');
      div.className = 'swatch';
      div.style.background = c;
      div.title = c;
      container.appendChild(div);
    });
  }
}

export function applyAndRender() {
  syncJSON();
  clearTimeout(state.renderTimer);
  state.renderTimer = setTimeout(renderChart, 80);
}
