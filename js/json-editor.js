import { state } from './state.js';
import { syncJSON, syncUI, setStatus } from './ui-sync.js';
import { renderChart } from './chart.js';
import { renderTraceSelector, renderTraceEditor } from './trace-editor.js';

export function applyJSONContent(raw) {
  const parsed = JSON.parse(raw);
  if (state.activeJsonTab === 'layout') {
    state.layout = parsed;
    syncUI();
  } else if (state.activeJsonTab === 'data') {
    state.traces = Array.isArray(parsed) ? parsed : [parsed];
    renderTraceSelector();
    renderTraceEditor(state.activeTraceIdx);
  } else {
    if (parsed.layout) { state.layout = parsed.layout; syncUI(); }
    if (parsed.data) { state.traces = parsed.data; renderTraceSelector(); renderTraceEditor(state.activeTraceIdx); }
  }
  renderChart();
}

export function initJsonEditor() {
  const ed = document.getElementById('json-editor');

  ed.addEventListener('focus', () => { state.jsonEditorFocused = true; });
  ed.addEventListener('blur',  () => { state.jsonEditorFocused = false; });

  ed.addEventListener('input', () => {
    clearTimeout(state.jsonParseTimer);
    state.jsonParseTimer = setTimeout(() => {
      try {
        applyJSONContent(ed.value);
        setStatus('ok', '✓ valid');
      } catch (e) {
        setStatus('err', '✗ ' + e.message.replace('JSON.parse: ','').slice(0, 40));
      }
    }, 600);
  });

  ed.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(state.jsonParseTimer);
      try {
        applyJSONContent(e.target.value);
        setStatus('ok', '✓ applied');
      } catch (err) {
        setStatus('err', '✗ ' + err.message.slice(0, 40));
      }
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      e.target.value = e.target.value.substring(0, start) + '  ' + e.target.value.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 2;
    }
  });

  document.getElementById('btn-format').addEventListener('click', () => {
    try {
      ed.value = JSON.stringify(JSON.parse(ed.value), null, 2);
      setStatus('ok', '✓ formatted');
    } catch (e) { setStatus('err', '✗ ' + e.message.slice(0,40)); }
  });

  document.getElementById('btn-minify').addEventListener('click', () => {
    try {
      ed.value = JSON.stringify(JSON.parse(ed.value));
      setStatus('ok', '✓ minified');
    } catch (e) { setStatus('err', '✗ ' + e.message.slice(0,40)); }
  });

  document.getElementById('btn-copy').addEventListener('click', () => {
    navigator.clipboard.writeText(ed.value)
      .then(() => setStatus('ok', '✓ copied!'))
      .catch(() => {});
  });

  document.getElementById('btn-apply').addEventListener('click', () => {
    try {
      applyJSONContent(ed.value);
      setStatus('ok', '✓ applied');
    } catch (e) { setStatus('err', '✗ ' + e.message.slice(0,40)); }
  });

  document.getElementById('btn-export').addEventListener('click', () => {
    const chartTitle = state.layout?.title?.text || 'Plotly Chart';
    const exportHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>${chartTitle}</title>
<script src="https://cdn.plot.ly/plotly-3.4.0.min.js"><\/script>
</head><body>
<div id="chart" style="width:100%;height:100vh;"></div>
<script>
Plotly.newPlot('chart',
${JSON.stringify(state.traces, null, 2)},
${JSON.stringify(state.layout, null, 2)},
{responsive:true});
<\/script>
</body></html>`;
    const slug = chartTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const blob = new Blob([exportHtml], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${slug}.html`;
    a.click();
  });

  // JSON tab switching
  document.querySelectorAll('.json-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeJsonTab = btn.dataset.jsonTab;
      document.querySelectorAll('.json-tab-btn').forEach(b => b.classList.toggle('active', b === btn));
      syncJSON();
    });
  });
}
