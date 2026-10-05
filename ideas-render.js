/* ==========================================
   USTH TIM: Idea Worth Sharing rendering
   Reads from window.IDEAS_DATA. Used by the /blog bento grid
   and by idea-template.js for the /ideas/[code] detail page.
   ========================================== */
window.IdeasUI = (function () {
  const DATA = window.IDEAS_DATA;
  const CATEGORIES = DATA.categories;
  const POSTS = DATA.posts;

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function initials(name) {
    const parts = name.replace(/^(Assoc\.|Prof\.|Dr\.)\s+/i, '').split(' ').filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return (parts[0] || '??').slice(0, 2).toUpperCase();
  }

  // ---------- Hero stats ----------
  function renderStats(el) {
    if (!el) return;
    const contributors = new Set(POSTS.map(p => p.author)).size;
    const stats = [
      { value: POSTS.length, label: 'Posts shared' },
      { value: contributors, label: 'Contributors' },
      { value: Object.keys(CATEGORIES).length, label: 'Categories' }
    ];
    el.innerHTML = stats.map(s => `
      <div class="stat-item">
        <span class="stat-number">${s.value}</span>
        <span class="stat-label">${s.label}</span>
      </div>`).join('');
  }

  // ---------- Show & Tell isometric block graphic ----------
  function cube(cx, cy, s, h, colors) {
    const top = `${cx},${cy - h} ${cx + s},${cy - h / 2} ${cx},${cy} ${cx - s},${cy - h / 2}`;
    const left = `${cx - s},${cy - h / 2} ${cx},${cy} ${cx},${cy + h} ${cx - s},${cy + h / 2}`;
    const right = `${cx + s},${cy - h / 2} ${cx},${cy} ${cx},${cy + h} ${cx + s},${cy + h / 2}`;
    return `
      <polygon points="${left}" fill="${colors[0]}" stroke="#0A0A0A" stroke-width="0.5"/>
      <polygon points="${right}" fill="${colors[1]}" stroke="#0A0A0A" stroke-width="0.5"/>
      <polygon points="${top}" fill="${colors[2]}" stroke="#0A0A0A" stroke-width="0.5"/>`;
  }

  function isometricBlocksSvg() {
    return `
      <svg width="140" height="96" viewBox="0 0 140 96" xmlns="http://www.w3.org/2000/svg">
        ${cube(40, 72, 24, 14, ['#0A0A0A', '#1A1A1A', '#3A3A3A'])}
        ${cube(80, 58, 24, 14, ['#D8D8D8', '#EDEDED', '#FFFFFF'])}
        ${cube(112, 72, 20, 12, ['#8A8A8A', '#9E9E9E', '#B3B3B3'])}
        ${cube(78, 26, 16, 10, ['#CFE636', '#DEF26B', '#E6FF3D'])}
      </svg>`;
  }

  // ---------- Shared card footer ----------
  function footerHtml(p) {
    return `
      <div class="idea-card-footer">
        <span class="idea-avatar">${initials(p.author)}</span>
        <span class="idea-author-name">${escapeHtml(p.author)}</span>
        <span class="idea-author-role">${escapeHtml(p.role)} &bull; ${escapeHtml(p.org)}</span>
        <span class="idea-read-time">${escapeHtml(p.readTime)}</span>
        <span class="idea-card-go">&rarr;</span>
      </div>`;
  }

  // ---------- Card builders, one per category ----------
  function featureCard(p) {
    const cat = CATEGORIES[p.category];
    return `
      <a href="/ideas/${p.code}" class="idea-card idea-card--feature">
        <div class="idea-feature-main">
          <span class="badge-tag ${cat.badgeClass}">${cat.label.toUpperCase()}</span>
          <h2 class="idea-feature-title">${escapeHtml(p.title)}</h2>
          <p class="idea-feature-excerpt">${escapeHtml(p.excerpt)}</p>
          ${footerHtml(p)}
        </div>
        <div class="idea-feature-quote">
          <span class="idea-quote-mark">&ldquo;</span>
          <p class="idea-quote-text">${escapeHtml(p.quote)}</p>
        </div>
      </a>`;
  }

  function fieldNotesCard(p) {
    const cat = CATEGORIES[p.category];
    return `
      <a href="/ideas/${p.code}" class="idea-card idea-card--fieldnotes">
        <span class="badge-tag ${cat.badgeClass}">${cat.label.toUpperCase()}</span>
        <h3 class="idea-card-title">${escapeHtml(p.title)}</h3>
        <p class="idea-card-excerpt">${escapeHtml(p.excerpt)}</p>
        ${footerHtml(p)}
      </a>`;
  }

  function bigIdeaCard(p) {
    const cat = CATEGORIES[p.category];
    return `
      <a href="/ideas/${p.code}" class="idea-card idea-card--bigidea">
        <span class="badge-tag ${cat.badgeClass}">${cat.label.toUpperCase()}</span>
        <h3 class="idea-card-title">${escapeHtml(p.title)}</h3>
        <p class="idea-card-excerpt">${escapeHtml(p.excerpt)}</p>
        ${footerHtml(p)}
      </a>`;
  }

  function toolkitCard(p) {
    const cat = CATEGORIES[p.category];
    const items = (p.resources || []).map(r => `
      <li>
        <svg class="idea-toolkit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <span class="idea-toolkit-name">${escapeHtml(r.name)}</span>
        <span class="idea-toolkit-format">${escapeHtml(r.format)}</span>
      </li>`).join('');
    return `
      <a href="/ideas/${p.code}" class="idea-card idea-card--toolkit">
        <span class="badge-tag ${cat.badgeClass}">${cat.label.toUpperCase()}</span>
        <h3 class="idea-card-title">${escapeHtml(p.title)}</h3>
        <p class="idea-card-excerpt">${escapeHtml(p.excerpt)}</p>
        <ul class="idea-toolkit-list">${items}</ul>
        <span class="btn-outlined idea-toolkit-cta">Get the toolkit <span class="idea-card-go">&rarr;</span></span>
        ${footerHtml(p)}
      </a>`;
  }

  function readingListCard(p) {
    const cat = CATEGORIES[p.category];
    const spineColors = ['#C7C7C7', '#B3B3B3', '#E6FF3D', '#9E9E9E', '#8A8A8A'];
    const spines = spineColors.map(c => `<span class="idea-reading-spine" style="background:${c};"></span>`).join('');
    const books = (p.books || []).map(b => `<li>${escapeHtml(b)}</li>`).join('');
    return `
      <a href="/ideas/${p.code}" class="idea-card idea-card--reading">
        <span class="badge-tag ${cat.badgeClass}">${cat.label.toUpperCase()}</span>
        <div class="idea-reading-spines">${spines}</div>
        <h3 class="idea-card-title">${escapeHtml(p.title)}</h3>
        <ul class="idea-book-list">${books}</ul>
        ${footerHtml(p)}
      </a>`;
  }

  function showTellCard(p) {
    const cat = CATEGORIES[p.category];
    return `
      <a href="/ideas/${p.code}" class="idea-card idea-card--showtell">
        <span class="badge-tag ${cat.badgeClass}">${cat.label.toUpperCase()}</span>
        <div class="idea-showtell-visual">${isometricBlocksSvg()}</div>
        <h3 class="idea-card-title">${escapeHtml(p.title)}</h3>
        <p class="idea-card-excerpt">${escapeHtml(p.excerpt)}</p>
        <span class="btn-outlined idea-toolkit-cta">See the prototype <span class="idea-card-go">&rarr;</span></span>
        ${footerHtml(p)}
      </a>`;
  }

  function askNetworkCard(p) {
    const cat = CATEGORIES[p.category];
    return `
      <a href="/ideas/${p.code}" class="idea-card idea-card--ask idea-card--dark">
        <span class="badge-tag ${cat.badgeClass}">${cat.label.toUpperCase()}</span>
        <h3 class="idea-ask-question">${escapeHtml(p.title)}</h3>
        <div class="idea-ask-meta">
          <span>${p.answersCount} answers</span>
          <span class="btn-light idea-toolkit-cta">Share your answer <span class="idea-card-go">&rarr;</span></span>
        </div>
        ${footerHtml(p)}
      </a>`;
  }

  function cardHtml(p) {
    if (p.featured) return featureCard(p);
    switch (p.category) {
      case 'field-notes': return fieldNotesCard(p);
      case 'big-ideas': return bigIdeaCard(p);
      case 'toolkit': return toolkitCard(p);
      case 'reading-list': return readingListCard(p);
      case 'show-tell': return showTellCard(p);
      case 'ask-network': return askNetworkCard(p);
      default: return fieldNotesCard(p);
    }
  }

  // ---------- Filter bar + bento grid (/blog) ----------
  function initBlogPage(root) {
    const tabsEl = root.querySelector('#ideaCategoryTabs');
    const searchEl = root.querySelector('#ideaSearch');
    const gridEl = root.querySelector('#ideasBentoGrid');
    const emptyStateEl = root.querySelector('#ideasEmptyState');

    const params = new URLSearchParams(window.location.search);
    const state = {
      category: params.get('category') || 'all',
      q: params.get('q') || ''
    };
    searchEl.value = state.q;

    function categoryCount(key) {
      return key === 'all' ? POSTS.length : POSTS.filter(p => p.category === key).length;
    }

    function renderTabs() {
      const tabs = [{ key: 'all', label: 'All' }].concat(
        Object.keys(CATEGORIES).map(key => ({ key, label: CATEGORIES[key].label }))
      );
      tabsEl.innerHTML = tabs.map(t => `
        <button type="button" class="category-tab${state.category === t.key ? ' active' : ''}" data-category="${t.key}">
          ${t.label} (${categoryCount(t.key)})
        </button>`).join('');

      tabsEl.querySelectorAll('.category-tab').forEach(btn => {
        btn.addEventListener('click', () => {
          state.category = btn.getAttribute('data-category');
          syncAndRender();
        });
      });
    }

    function updateUrl() {
      const p = new URLSearchParams();
      if (state.category !== 'all') p.set('category', state.category);
      if (state.q) p.set('q', state.q);
      const qs = p.toString();
      window.history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : ''));
    }

    function applyFilters() {
      return POSTS.filter(p => {
        if (state.category !== 'all' && p.category !== state.category) return false;
        if (state.q) {
          const q = state.q.toLowerCase();
          const haystack = `${p.title} ${p.excerpt} ${p.author} ${p.org}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      });
    }

    function renderGrid() {
      const results = applyFilters();
      if (results.length === 0) {
        gridEl.innerHTML = '';
        emptyStateEl.style.display = 'block';
        return;
      }
      emptyStateEl.style.display = 'none';
      gridEl.innerHTML = results.map(cardHtml).join('');
    }

    function syncAndRender() {
      renderTabs();
      renderGrid();
      updateUrl();
    }

    searchEl.addEventListener('input', () => { state.q = searchEl.value; syncAndRender(); });

    syncAndRender();
  }

  return { renderStats, initBlogPage, cardHtml, footerHtml, CATEGORIES, POSTS, escapeHtml, initials };
})();
