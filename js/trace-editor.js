import { TRACE_FIELDS, COLORWAY_LIST, getSampleTraces } from './constants.js';
import { state } from './state.js';
import { getPath, setPath, deletePath, toHex } from './utils.js';
import { syncJSON } from './ui-sync.js';
import { renderChart } from './chart.js';

function buildTraceField(f, trace, traceIdx) {
  if (f.sec) {
    const el = document.createElement('div');
    el.className = 'subsection-label';
    el.textContent = f.sec;
    return el;
  }
  const wrap = document.createElement('div');
  wrap.className = 'field';

  const lbl = document.createElement('label');
  lbl.textContent = f.label;
  wrap.appendChild(lbl);

  const val = getPath(trace, f.path);

  if (f.kind === 'color') {
    const row = document.createElement('div');
    row.className = 'color-row';
    const picker = document.createElement('input');
    picker.type = 'color';
    picker.dataset.tracePath = f.path;
    picker.dataset.traceIdx = traceIdx;
    picker.dataset.traceKind = 'color-picker';
    picker.value = val ? toHex(String(val)) : '#636efa';
    const txt = document.createElement('input');
    txt.type = 'text';
    txt.className = 'ctrl';
    txt.dataset.tracePath = f.path;
    txt.dataset.traceIdx = traceIdx;
    txt.dataset.traceKind = 'color-text';
    txt.placeholder = '#hex / rgba(…)';
    txt.value = val != null ? String(val) : '';
    row.append(picker, txt);
    wrap.appendChild(row);
  } else if (f.kind === 'bool') {
    const inp = document.createElement('input');
    inp.type = 'checkbox';
    inp.className = 'ctrl';
    inp.dataset.tracePath = f.path;
    inp.dataset.traceIdx = traceIdx;
    inp.dataset.traceKind = 'bool';
    if (val !== undefined) inp.checked = Boolean(val);
    wrap.appendChild(inp);
  } else if (f.kind === 'num') {
    const inp = document.createElement('input');
    inp.type = 'number';
    inp.className = 'ctrl';
    inp.dataset.tracePath = f.path;
    inp.dataset.traceIdx = traceIdx;
    inp.dataset.traceKind = 'num';
    if (f.min !== undefined) inp.min = f.min;
    if (f.max !== undefined) inp.max = f.max;
    if (f.step !== undefined) inp.step = f.step;
    if (val !== undefined) inp.value = String(val);
    wrap.appendChild(inp);
  } else if (f.kind === 'text') {
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'ctrl';
    inp.dataset.tracePath = f.path;
    inp.dataset.traceIdx = traceIdx;
    inp.dataset.traceKind = 'text';
    if (f.placeholder) inp.placeholder = f.placeholder;
    if (val !== undefined) inp.value = String(val);
    wrap.appendChild(inp);
  } else if (f.kind === 'select' || f.kind === 'mixed-bool') {
    const sel = document.createElement('select');
    sel.className = 'ctrl';
    sel.dataset.tracePath = f.path;
    sel.dataset.traceIdx = traceIdx;
    sel.dataset.traceKind = f.kind;
    (f.opts || []).forEach(o => {
      const opt = document.createElement('option');
      opt.value = o; opt.textContent = o;
      sel.appendChild(opt);
    });
    if (val !== undefined) sel.value = String(val);
    wrap.appendChild(sel);
  }
  return wrap;
}

export function renderTraceEditor(idx) {
  state.activeTraceIdx = Math.max(0, Math.min(idx, state.traces.length - 1));
  const container = document.getElementById('trace-editor-fields');
  if (!container) return;
  container.innerHTML = '';
  if (!state.traces.length) {
    container.innerHTML = '<div style="padding:12px;color:var(--muted-foreground);font-size:11px;">No traces. Add one above.</div>';
    return;
  }
  const trace = state.traces[state.activeTraceIdx];
  const type = trace.type || 'scatter';
  const typeFields = TRACE_FIELDS[type] || TRACE_FIELDS.scatter;
  [...TRACE_FIELDS._common, ...typeFields].forEach(f => {
    container.appendChild(buildTraceField(f, trace, state.activeTraceIdx));
  });
}

export function renderTraceSelector() {
  const sel = document.getElementById('trace-selector');
  if (!sel) return;
  sel.innerHTML = '';
  state.traces.forEach((t, i) => {
    const pill = document.createElement('button');
    pill.className = 'trace-pill' + (i === state.activeTraceIdx ? ' active' : '');
    const dot = document.createElement('span');
    dot.className = 'pill-dot';
    dot.style.background = COLORWAY_LIST[i % COLORWAY_LIST.length];
    const name = document.createElement('span');
    name.textContent = t.name || `Trace ${i}`;
    const del = document.createElement('span');
    del.className = 'pill-del';
    del.textContent = '×';
    del.title = 'Remove trace';
    del.addEventListener('click', e => {
      e.stopPropagation();
      if (state.traces.length === 1) return;
      state.traces.splice(i, 1);
      state.activeTraceIdx = Math.min(state.activeTraceIdx, state.traces.length - 1);
      renderTraceSelector();
      renderTraceEditor(state.activeTraceIdx);
      syncJSON();
      renderChart();
    });
    pill.append(dot, name, del);
    pill.addEventListener('click', () => {
      state.activeTraceIdx = i;
      renderTraceSelector();
      renderTraceEditor(i);
    });
    sel.appendChild(pill);
  });
  const addBtn = document.createElement('button');
  addBtn.className = 'trace-add-pill';
  addBtn.textContent = '+ Add';
  addBtn.addEventListener('click', () => {
    const newT = getSampleTraces(state.currentTraceType, state.currentScatterMode)[0];
    if (newT) { newT.name = `Trace ${state.traces.length}`; state.traces.push(newT); }
    renderTraceSelector();
    renderTraceEditor(state.traces.length - 1);
    syncJSON();
    renderChart();
  });
  sel.appendChild(addBtn);
}

export function handleTraceFieldChange(e) {
  const el = e.target;
  const path = el.dataset.tracePath;
  if (!path) return;
  const idx = parseInt(el.dataset.traceIdx);
  const kind = el.dataset.traceKind || '';
  const trace = state.traces[idx];

  let value;
  if (kind === 'bool') {
    value = el.checked;
  } else if (kind === 'num') {
    value = el.value === '' ? undefined : Number(el.value);
  } else if (kind === 'mixed-bool') {
    const v = el.value;
    value = v === 'true' ? true : v === 'false' ? false : v;
  } else if (kind === 'color-picker') {
    value = el.value;
    el.closest('.color-row')?.querySelectorAll('[data-trace-kind="color-text"]').forEach(s => {
      if (s.dataset.tracePath === path) s.value = el.value;
    });
  } else if (kind === 'color-text') {
    value = el.value.trim() || undefined;
    el.closest('.color-row')?.querySelectorAll('[data-trace-kind="color-picker"]').forEach(s => {
      if (s.dataset.tracePath === path) try { s.value = toHex(el.value); } catch {}
    });
  } else {
    value = el.value || undefined;
  }

  if (value === undefined) deletePath(trace, path);
  else setPath(trace, path, value);

  if (path === 'name') renderTraceSelector();
  syncJSON();
  clearTimeout(state.renderTimer);
  state.renderTimer = setTimeout(renderChart, 80);
}
