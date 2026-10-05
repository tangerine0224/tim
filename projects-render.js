/* ==========================================
   USTH TIM — Projects rendering (bookshelf + filtered grid)
   Reads from window.PROJECTS_DATA. Used by both the homepage
   bookshelf and the /projects page (bookshelf + filter bar + grid).
   ========================================== */
window.ProjectsUI = (function () {
  const DATA = window.PROJECTS_DATA;
  const CATEGORIES = DATA.categories;
  const PROJECTS = DATA.projects;

  const MONTHS = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };

  function sortKey(dateStr) {
    const [mon, year] = dateStr.split(' ');
    return `${year}-${MONTHS[mon] || '01'}`;
  }

  function statusSlug(status) {
    return status.toLowerCase().replace(/\s+/g, '-');
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---------- Bookshelf (homepage + /projects) ----------
  function renderBookshelf(carouselEl) {
    if (!carouselEl) return;

    const featured = PROJECTS.filter(p => p.featured).sort((a, b) => a.featured.order - b.featured.order);

    carouselEl.innerHTML = featured.map(p => {
      const cat = CATEGORIES[p.category];
      const f = p.featured;
      return `
        <div class="spine-card${f.order === 1 ? ' expanded' : ''}" data-code="${p.code}">
          <div class="spine-collapsed-view" style="border-left: 6px solid ${cat.color};">
            <span class="spine-title-vertical">${escapeHtml(f.showcaseTitle.toUpperCase())}</span>
            <span class="spine-num">0${f.order}</span>
          </div>
          <div class="spine-expanded-content">
            <div class="project-banner ${cat.bannerClass}">
              <span class="badge-tag project-gen-pill" style="background: ${cat.color}; color: #0A0A0A;">${cat.label.toUpperCase()}</span>
              <div class="project-banner-graphic">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">${cat.icon}</svg>
              </div>
            </div>
            <div class="project-body">
              <h3 class="project-title">${escapeHtml(f.showcaseTitle)}</h3>
              <p class="project-desc">${escapeHtml(f.description)}</p>
              <div class="project-metrics-grid">
                <div>
                  <div class="p-metric-val">${escapeHtml(f.stat1.value)}</div>
                  <div class="p-metric-lbl">${escapeHtml(f.stat1.label)}</div>
                </div>
                <div>
                  <div class="p-metric-val">${escapeHtml(f.stat2.value)}</div>
                  <div class="p-metric-lbl">${escapeHtml(f.stat2.label)}</div>
                </div>
              </div>
              <div class="project-footer">
                <span class="partner-tag">PARTNER: ${escapeHtml(p.partner.toUpperCase())}</span>
                <a href="/projects/${p.code}" class="btn-outlined">Details &rarr;</a>
              </div>
            </div>
          </div>
        </div>`;
    }).join('');

    const spineCards = carouselEl.querySelectorAll('.spine-card');

    function expandAt(index) {
      const i = ((index % spineCards.length) + spineCards.length) % spineCards.length;
      spineCards.forEach(s => s.classList.remove('expanded'));
      spineCards[i].classList.add('expanded');
    }

    spineCards.forEach((spine, i) => {
      spine.addEventListener('mouseenter', () => expandAt(i));
      spine.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        expandAt(i);
      });
    });

    function currentExpandedIndex() {
      const idx = Array.from(spineCards).findIndex(s => s.classList.contains('expanded'));
      return idx === -1 ? 0 : idx;
    }

    const prevBtn = document.getElementById('prevProjectBtn');
    const nextBtn = document.getElementById('nextProjectBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => expandAt(currentExpandedIndex() - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => expandAt(currentExpandedIndex() + 1));
  }

  function renderBookshelfLegend(el) {
    if (!el) return;
    el.innerHTML = Object.values(CATEGORIES).map(cat => `
      <span class="bookshelf-legend-item">
        <span class="bookshelf-legend-dot" style="background: ${cat.color};"></span>${cat.label}
      </span>`).join('');
  }

  // ---------- Stats row (/projects) ----------
  function renderStats(el) {
    if (!el) return;
    const partners = new Set(PROJECTS.filter(p => p.partnerIsOrg).map(p => p.partner)).size;
    const categories = Object.keys(CATEGORIES).length;
    const adopted = PROJECTS.filter(p => p.solutionAdopted).length;

    const stats = [
      { value: PROJECTS.length, label: 'Projects' },
      { value: partners, label: 'Partners' },
      { value: categories, label: 'Categories' },
      { value: adopted, label: 'Solutions adopted by partners' }
    ];

    el.innerHTML = stats.map(s => `
      <div class="stat-item">
        <span class="stat-number">${s.value}</span>
        <span class="stat-label">${s.label}</span>
      </div>`).join('');
  }

  // ---------- Filtered grid + filter bar (/projects) ----------
  function initProjectsPage(root) {
    const categoryTabsEl = root.querySelector('#categoryTabs');
    const categoryDescEl = root.querySelector('#categoryDesc');
    const searchEl = root.querySelector('#projectSearch');
    const sectorEl = root.querySelector('#sectorFilter');
    const supportEl = root.querySelector('#supportFilter');
    const statusEl = root.querySelector('#statusFilter');
    const sortEl = root.querySelector('#sortFilter');
    const clearBtn = root.querySelector('#clearFiltersBtn');
    const gridEl = root.querySelector('#projectsGrid');
    const emptyStateEl = root.querySelector('#projectsEmptyState');

    const sectors = Array.from(new Set(PROJECTS.map(p => p.sector))).sort();
    const supportTypes = Array.from(new Set(PROJECTS.flatMap(p => p.supportType))).sort();
    const statuses = ['In progress', 'Piloting', 'Completed'];

    sectorEl.innerHTML = '<option value="">Sector</option>' + sectors.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
    supportEl.innerHTML = '<option value="">Support type</option>' + supportTypes.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
    statusEl.innerHTML = '<option value="">Status</option>' + statuses.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');

    const params = new URLSearchParams(window.location.search);
    const state = {
      category: params.get('category') || 'all',
      sector: params.get('sector') || '',
      support: params.get('support') || '',
      status: params.get('status') || '',
      q: params.get('q') || '',
      sort: params.get('sort') || 'newest'
    };

    searchEl.value = state.q;
    sectorEl.value = state.sector;
    supportEl.value = state.support;
    statusEl.value = state.status;
    sortEl.value = state.sort;

    function categoryCount(key) {
      return key === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.category === key).length;
    }

    function renderTabs() {
      const tabs = [{ key: 'all', label: 'All', color: null }].concat(
        Object.keys(CATEGORIES).map(key => ({ key, label: CATEGORIES[key].label, color: CATEGORIES[key].color }))
      );
      categoryTabsEl.innerHTML = tabs.map(t => `
        <button type="button" class="category-tab${state.category === t.key ? ' active' : ''}" data-category="${t.key}">
          ${t.color ? `<span class="category-tab-dot" style="background:${t.color};"></span>` : ''}${t.label} (${categoryCount(t.key)})
        </button>`).join('');

      categoryTabsEl.querySelectorAll('.category-tab').forEach(btn => {
        btn.addEventListener('click', () => {
          state.category = btn.getAttribute('data-category');
          syncAndRender();
        });
      });

      if (state.category === 'all') {
        categoryDescEl.style.display = 'none';
      } else {
        categoryDescEl.style.display = 'block';
        categoryDescEl.textContent = CATEGORIES[state.category].description;
      }
    }

    function isFilterActive() {
      return state.category !== 'all' || !!state.sector || !!state.support || !!state.status || !!state.q;
    }

    function updateUrl() {
      const p = new URLSearchParams();
      if (state.category !== 'all') p.set('category', state.category);
      if (state.sector) p.set('sector', state.sector);
      if (state.support) p.set('support', state.support);
      if (state.status) p.set('status', state.status);
      if (state.q) p.set('q', state.q);
      if (state.sort !== 'newest') p.set('sort', state.sort);
      const qs = p.toString();
      const newUrl = window.location.pathname + (qs ? '?' + qs : '');
      window.history.replaceState(null, '', newUrl);
    }

    function cardHtml(p) {
      const cat = CATEGORIES[p.category];
      const tags = p.supportType.map(t => `<span class="support-tag">${escapeHtml(t)}</span>`).join('');
      const coCreatedTag = p.coCreated ? '<span class="support-tag support-tag-cocreated">CO-CREATED</span>' : '';
      return `
        <a href="/projects/${p.code}" class="project-card-v2" style="border-left-color: ${cat.color};">
          <div class="project-card-v2-top">
            <span class="mono-text project-card-v2-category">${cat.label.toUpperCase()}</span>
            <span class="status-badge status-${statusSlug(p.status)}">${p.status}</span>
          </div>
          <h3 class="project-card-v2-title">${escapeHtml(p.title)}</h3>
          <div class="project-card-v2-meta">${escapeHtml(p.partner)} &bull; ${escapeHtml(p.sector)}</div>
          <p class="project-card-v2-outcome">${escapeHtml(p.outcome)}</p>
          <div class="project-card-v2-tags">${tags}${coCreatedTag}</div>
          <div class="project-card-v2-footer">
            <span class="mono-text">Cohort 01 &bull; ${escapeHtml(p.date)}</span>
            <span class="project-card-v2-arrow">&rarr;</span>
          </div>
        </a>`;
    }

    const fundTileHtml = `
      <div class="project-fund-tile">
        <div>
          <span class="badge-tag badge-tag-signal" style="margin-bottom: 8px; display: inline-block;">SUPPORT A CAPSTONE</span>
          <h3 class="display-m" style="color: var(--on-ink);">FUND THE NEXT BREAKTHROUGH.</h3>
          <p style="color: var(--muted-on-ink); font-size: 15px; max-width: 480px; margin-top: 8px;">
            Every capstone project starts with a real problem and ends with a tested answer.
          </p>
        </div>
        <a href="/#contact" class="btn-primary btn-light">Support a capstone &rarr;</a>
      </div>`;

    function applyFilters() {
      let results = PROJECTS.filter(p => {
        if (state.category !== 'all' && p.category !== state.category) return false;
        if (state.sector && p.sector !== state.sector) return false;
        if (state.support && !p.supportType.includes(state.support)) return false;
        if (state.status && p.status !== state.status) return false;
        if (state.q) {
          const q = state.q.toLowerCase();
          if (!p.title.toLowerCase().includes(q) && !p.partner.toLowerCase().includes(q)) return false;
        }
        return true;
      });

      results.sort((a, b) => {
        const cmp = sortKey(a.date).localeCompare(sortKey(b.date));
        return state.sort === 'oldest' ? cmp : -cmp;
      });

      return results;
    }

    function renderGrid() {
      const results = applyFilters();
      clearBtn.style.display = isFilterActive() ? 'inline-flex' : 'none';

      if (results.length === 0) {
        gridEl.innerHTML = '';
        emptyStateEl.style.display = 'block';
        return;
      }
      emptyStateEl.style.display = 'none';

      let cardsHtml = results.map(cardHtml);
      if (!isFilterActive() && cardsHtml.length > 3) {
        cardsHtml.splice(3, 0, fundTileHtml);
      }
      gridEl.innerHTML = cardsHtml.join('');
    }

    function syncAndRender() {
      renderTabs();
      renderGrid();
      updateUrl();
    }

    searchEl.addEventListener('input', () => { state.q = searchEl.value; syncAndRender(); });
    sectorEl.addEventListener('change', () => { state.sector = sectorEl.value; syncAndRender(); });
    supportEl.addEventListener('change', () => { state.support = supportEl.value; syncAndRender(); });
    statusEl.addEventListener('change', () => { state.status = statusEl.value; syncAndRender(); });
    sortEl.addEventListener('change', () => { state.sort = sortEl.value; syncAndRender(); });
    clearBtn.addEventListener('click', () => {
      state.category = 'all';
      state.sector = '';
      state.support = '';
      state.status = '';
      state.q = '';
      state.sort = 'newest';
      searchEl.value = '';
      sectorEl.value = '';
      supportEl.value = '';
      statusEl.value = '';
      sortEl.value = 'newest';
      syncAndRender();
    });
    root.querySelector('#clearFiltersEmptyBtn').addEventListener('click', () => clearBtn.click());

    syncAndRender();
  }

  return { renderBookshelf, renderBookshelfLegend, renderStats, initProjectsPage };
})();
