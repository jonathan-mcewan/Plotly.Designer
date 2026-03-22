import { state } from './state.js';
import { getPath, setPath, deletePath, coerceValue, toHex } from './utils.js';
import { applyAndRender } from './ui-sync.js';

export function handleControlChange(e) {
  const el = e.target;
  if (!el.dataset.path) return;

  const path = el.dataset.path;
  const type = el.dataset.type || '';

  if (type === 'range-item') {
    const m = path.match(/^(.+)\[(\d+)\]$/);
    if (!m) return;
    const arrPath = m[1];
    const idx = parseInt(m[2]);
    let arr = getPath(state.layout, arrPath);
    if (!Array.isArray(arr)) arr = [null, null];
    const rawVal = el.value.trim();
    if (rawVal === '') {
      arr[idx] = null;
    } else {
      const n = Number(rawVal);
      arr[idx] = isNaN(n) ? rawVal : n;
    }
    if (arr[0] === null && arr[1] === null) {
      deletePath(state.layout, arrPath);
    } else {
      setPath(state.layout, arrPath, arr);
    }
    applyAndRender();
    return;
  }

  if (type === 'color-picker') {
    const val = el.value;
    el.closest('.color-row')?.querySelectorAll('[data-type="color-text"]')?.forEach(s => {
      if (s.dataset.path === path) s.value = val;
    });
    setPath(state.layout, path, val || undefined);
    applyAndRender();
    return;
  }
  if (type === 'color-text') {
    const val = el.value.trim();
    el.closest('.color-row')?.querySelectorAll('[data-type="color-picker"]')?.forEach(s => {
      if (s.dataset.path === path) try { s.value = toHex(val); } catch {}
    });
    setPath(state.layout, path, val || undefined);
    applyAndRender();
    return;
  }

  const value = coerceValue(el);
  if (value === undefined) {
    deletePath(state.layout, path);
  } else {
    setPath(state.layout, path, value);
  }
  applyAndRender();
}

export function initSectionToggles() {
  document.querySelectorAll('.section-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = 's-' + btn.dataset.section;
      const body = document.getElementById(sectionId);
      const isOpen = body.classList.contains('open');
      body.classList.toggle('open');
      btn.classList.toggle('open', !isOpen);
    });
    const sectionId = 's-' + btn.dataset.section;
    const body = document.getElementById(sectionId);
    if (body && body.classList.contains('open')) {
      btn.classList.add('open');
    }
  });
}
