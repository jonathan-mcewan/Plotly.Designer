export function getPath(obj, path) {
  if (!path) return undefined;
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

export function setPath(obj, path, value) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (cur[k] == null || typeof cur[k] !== 'object') cur[k] = {};
    cur = cur[k];
  }
  const last = keys[keys.length - 1];
  if (value === undefined || value === null || value === '') {
    delete cur[last];
  } else {
    cur[last] = value;
  }
}

export function deletePath(obj, path) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (cur[keys[i]] == null) return;
    cur = cur[keys[i]];
  }
  delete cur[keys[keys.length - 1]];
}

export function toHex(color) {
  if (!color) return '#000000';
  if (/^#[0-9a-f]{6}$/i.test(color)) return color;
  try {
    const c = document.createElement('canvas');
    c.width = c.height = 1;
    const ctx = c.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0,0,1,1);
    const d = ctx.getImageData(0,0,1,1).data;
    return '#' + [d[0],d[1],d[2]].map(v => v.toString(16).padStart(2,'0')).join('');
  } catch { return '#000000'; }
}

export function getDocUrl(path, traceType) {
  // Convert dot-path to Plotly docs anchor format
  // e.g. "xaxis.showgrid" → "layout-xaxis-showgrid"
  //      "marker.size" (scatter) → "scatter-marker-size"
  const clean = path.replace(/\[\d+\]/g, ''); // strip array indices
  const anchor = clean.replace(/\./g, '-');
  if (traceType) {
    return `https://plotly.com/javascript/reference/${traceType}/#${traceType}-${anchor}`;
  }
  return `https://plotly.com/javascript/reference/layout/#layout-${anchor}`;
}

export function createDocLink(path, traceType) {
  const a = document.createElement('a');
  a.className = 'doc-link';
  a.href = getDocUrl(path, traceType);
  a.target = '_blank';
  a.rel = 'noopener';
  a.title = `Plotly docs: ${path}`;
  a.textContent = '?';
  return a;
}

export function coerceValue(el) {
  const type = el.dataset.type || '';
  const val = el.type === 'checkbox' ? el.checked : el.value;

  if (type === 'bool') return el.checked;
  if (type === 'num') {
    if (val === '' || val == null) return undefined;
    const n = Number(val);
    return isNaN(n) ? undefined : n;
  }
  if (type === 'color-picker' || type === 'color-text') {
    return val === '' ? undefined : val;
  }
  if (type === 'mixed-bool') {
    if (val === 'true') return true;
    if (val === 'false') return false;
    return val;
  }
  if (val === '') return undefined;
  return val;
}
