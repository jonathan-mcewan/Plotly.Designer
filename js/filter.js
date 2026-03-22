function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function highlightText(el, term) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  nodes.forEach(node => {
    if (!node.textContent.trim()) return;
    const re = new RegExp(`(${escapeRe(term)})`, 'gi');
    if (re.test(node.textContent)) {
      const span = document.createElement('span');
      span.innerHTML = node.textContent.replace(re, '<mark>$1</mark>');
      node.parentNode.replaceChild(span, node);
    }
  });
}

function clearHighlights(el) {
  el.querySelectorAll('mark').forEach(mark => {
    const text = document.createTextNode(mark.textContent);
    mark.replaceWith(text);
  });
  el.normalize();
}

export function initLayoutFilter() {
  const filterInput = document.getElementById('controls-filter');
  const filterClear = document.getElementById('filter-clear');
  const filterCount = document.getElementById('filter-count');

  function applyFilter(term) {
    const q = term.trim().toLowerCase();
    const allFields = document.querySelectorAll('#controls-body .field');
    const allSections = document.querySelectorAll('#controls-body .section');
    const allSubLabels = document.querySelectorAll('#controls-body .subsection-label');

    document.querySelectorAll('#controls-body label').forEach(el => clearHighlights(el));
    allSubLabels.forEach(el => clearHighlights(el));

    filterClear.style.display = q ? 'flex' : 'none';

    if (!q) {
      allFields.forEach(f => f.classList.remove('filter-hidden'));
      allSections.forEach(s => s.classList.remove('filter-empty'));
      allSubLabels.forEach(l => l.classList.remove('filter-hidden'));
      filterCount.textContent = '';
      return;
    }

    let matchCount = 0;
    allFields.forEach(field => {
      const label = field.querySelector('label');
      const labelText = label ? label.textContent.toLowerCase() : '';
      const ctrlPath = field.querySelector('[data-path]')?.dataset.path?.toLowerCase() || '';
      const matches = labelText.includes(q) || ctrlPath.includes(q);
      field.classList.toggle('filter-hidden', !matches);
      if (matches) {
        matchCount++;
        if (label) highlightText(label, term.trim());
      }
    });

    allSubLabels.forEach(label => {
      let next = label.nextElementSibling;
      let hasVisible = false;
      while (next && !next.classList.contains('subsection-label')) {
        if (next.classList.contains('field') && !next.classList.contains('filter-hidden')) {
          hasVisible = true;
          break;
        }
        next = next.nextElementSibling;
      }
      label.classList.toggle('filter-hidden', !hasVisible);
      if (!label.classList.contains('filter-hidden')) highlightText(label, term.trim());
    });

    allSections.forEach(section => {
      const sectionFields = section.querySelectorAll('.field:not(.filter-hidden)');
      const empty = sectionFields.length === 0;
      section.classList.toggle('filter-empty', empty);
      if (!empty) {
        const sectionId = section.querySelector('.section-toggle')?.dataset.section;
        if (sectionId) {
          const body = document.getElementById('s-' + sectionId);
          const toggle = section.querySelector('.section-toggle');
          if (body && !body.classList.contains('open')) {
            body.classList.add('open');
            toggle?.classList.add('open');
          }
        }
      }
    });

    filterCount.textContent = matchCount ? `${matchCount} result${matchCount !== 1 ? 's' : ''}` : 'no results';
  }

  filterInput.addEventListener('input', e => applyFilter(e.target.value));
  filterClear.addEventListener('click', () => {
    filterInput.value = '';
    applyFilter('');
    filterInput.focus();
  });

  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== filterInput &&
        !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      filterInput.focus();
      filterInput.select();
    }
    if (e.key === 'Escape' && document.activeElement === filterInput) {
      filterInput.value = '';
      applyFilter('');
      filterInput.blur();
    }
  });
}

export function initTraceFilter() {
  const filterInput = document.getElementById('trace-filter');
  const filterClear = document.getElementById('trace-filter-clear');
  const filterCount = document.getElementById('trace-filter-count');

  function applyTraceFilter(term) {
    const q = term.trim().toLowerCase();
    filterClear.style.display = q ? 'flex' : 'none';
    const fields = document.querySelectorAll('#trace-editor-fields .field');
    const subs = document.querySelectorAll('#trace-editor-fields .subsection-label');
    if (!q) {
      fields.forEach(f => f.classList.remove('filter-hidden'));
      subs.forEach(s => s.classList.remove('filter-hidden'));
      filterCount.textContent = '';
      return;
    }
    let count = 0;
    fields.forEach(f => {
      const lbl = f.querySelector('label')?.textContent.toLowerCase() || '';
      const path = f.querySelector('[data-trace-path]')?.dataset.tracePath?.toLowerCase() || '';
      const match = lbl.includes(q) || path.includes(q);
      f.classList.toggle('filter-hidden', !match);
      if (match) count++;
    });
    subs.forEach(s => {
      let next = s.nextElementSibling;
      let has = false;
      while (next && !next.classList.contains('subsection-label')) {
        if (next.classList.contains('field') && !next.classList.contains('filter-hidden')) { has = true; break; }
        next = next.nextElementSibling;
      }
      s.classList.toggle('filter-hidden', !has);
    });
    filterCount.textContent = count ? `${count} results` : 'no results';
  }

  // Export for use by trace-editor re-renders
  window.__applyTraceFilter = applyTraceFilter;

  filterInput.addEventListener('input', e => applyTraceFilter(e.target.value));
  filterClear.addEventListener('click', () => {
    filterInput.value = '';
    applyTraceFilter('');
    filterInput.focus();
  });
}
