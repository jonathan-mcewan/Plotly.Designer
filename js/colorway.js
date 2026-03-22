import { COLORWAYS } from './constants.js';
import { state } from './state.js';
import { applyAndRender } from './ui-sync.js';

export function initColorway() {
  document.getElementById('colorway-select').addEventListener('change', function() {
    const key = this.value;
    const customDiv = document.getElementById('colorway-custom');
    if (key === 'custom') {
      customDiv.style.display = 'block';
    } else {
      customDiv.style.display = 'none';
      if (COLORWAYS[key]) {
        state.layout.colorway = COLORWAYS[key];
        applyAndRender();
      }
    }
  });

  document.getElementById('colorway-custom-input').addEventListener('input', function() {
    const colors = this.value.split(',').map(s => s.trim()).filter(Boolean);
    if (colors.length >= 2) {
      state.layout.colorway = colors;
      applyAndRender();
    }
  });
}
