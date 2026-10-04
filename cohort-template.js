/* ==========================================
   USTH TIM — Shared cohort detail template
   Reads the slug from the URL, looks it up in
   window.COHORT_DATA, and renders the page.
   status: "coming-soon" -> single centered block.
   status: "in-progress" -> full detail page.
   ========================================== */
(function () {
  const SECTOR_PALETTE = ['#E6FF3D', '#0A0A0A', '#3A3A3A', '#6E6E6E', '#9E9E9E', '#C2C2C2', '#DADADA'];

  function formatPct(pct) {
    return (pct % 1 === 0 ? pct : pct.toFixed(1)) + '%';
  }

  function breadcrumbHtml(cohort) {
    return `
      <div class="cohort-breadcrumb">
        <a href="/#cohorts">Cohorts</a><span>/</span><span>${cohort.name}</span>
      </div>`;
  }

  function metaHtml(cohort) {
    return `
      <div class="section-meta">
        <span class="badge-tag">${cohort.name}</span>
        <span>${cohort.period} &bull; ${cohort.metaTag}</span>
      </div>`;
  }

  function paginationHtml(cohort, darkVariant) {
    const cls = darkVariant ? 'cohort-pagination cohort-pagination-dark' : 'cohort-pagination';
    return `
      <div class="${cls}">
        <a href="${cohort.pagination.prevHref}">&larr; ${cohort.pagination.prevLabel}</a>
        <a href="${cohort.pagination.nextHref}">${cohort.pagination.nextLabel} &rarr;</a>
      </div>`;
  }

  function renderComingSoon(cohort, main) {
    main.innerHTML = `
      <section class="sheet sheet-canvas cohort-hero-centered" id="cohort-hero">
        <div class="container cohort-hero-container">
          ${breadcrumbHtml(cohort)}
          ${metaHtml(cohort)}
          <h1 class="display-xl hero-title">${cohort.title}</h1>
          <p class="lead-text" style="max-width: 600px;">${cohort.description}</p>
          <div class="hero-cta-row">
            <a href="${cohort.cta.btnHref}" class="btn-primary">${cohort.cta.btnLabel} &rarr;</a>
          </div>
          ${paginationHtml(cohort, false)}
        </div>
      </section>`;
  }

  function renderInProgress(cohort, main) {
    const statsHtml = cohort.stats.map(s => `
      <div class="stat-item">
        <span class="stat-number">${s.value}</span>
        <span class="stat-label">${s.label}</span>
      </div>`).join('');

    const highlightTypeLabels = { project: 'PROJECT', article: 'ARTICLE' };
    const highlightsHtml = cohort.highlights.map(h => `
      <div class="cohort-highlight-card">
        <div class="cohort-highlight-meta">
          <span class="mono-text cohort-highlight-date">${h.date}</span>
          ${h.type ? `<span class="badge-tag ${h.type === 'article' ? 'badge-tag-signal' : ''} cohort-highlight-type">${highlightTypeLabels[h.type] || h.type.toUpperCase()}</span>` : ''}
        </div>
        <h3 class="display-m cohort-highlight-title">${h.title}</h3>
        <p class="cohort-highlight-desc">${h.desc}</p>
        ${h.link ? `<a href="${h.link}" class="cohort-highlight-link">${h.type === 'article' ? 'Read the article' : 'View'} &rarr;</a>` : ''}
      </div>`).join('');

    const sectorBarHtml = cohort.sectorMix.map((s, i) => `
      <div class="cohort-sector-segment" style="width: ${s.pct}%; background: ${SECTOR_PALETTE[i % SECTOR_PALETTE.length]};"></div>`).join('');

    const sectorLegendHtml = cohort.sectorMix.map((s, i) => `
      <div class="cohort-sector-legend-item">
        <span class="cohort-sector-swatch" style="background: ${SECTOR_PALETTE[i % SECTOR_PALETTE.length]};"></span>
        <span>${s.label} &mdash; ${formatPct(s.pct)}</span>
      </div>`).join('');

    const studentsHtml = cohort.students.map(st => `
      <div class="advisor-card">
        <div class="advisor-avatar-box">${st.initials}</div>
        ${st.tag ? `<span class="badge-tag badge-tag-signal" style="margin-bottom: 12px; display: inline-block;">${st.tag}</span>` : ''}
        <h3 class="advisor-name">${st.name}</h3>
        <div class="advisor-role">${st.roleOrg}</div>
        <span class="badge-tag" style="margin: 10px 0; display: inline-block;">${st.sector}</span>
        <div class="advisor-affil">${st.interest}</div>
      </div>`).join('');

    main.innerHTML = `
      <section class="sheet sheet-canvas" id="cohort-hero">
        <div class="container">
          ${breadcrumbHtml(cohort)}
          ${metaHtml(cohort)}
          <h1 class="display-xl hero-title">${cohort.title}</h1>
          <p class="lead-text hero-lead" style="max-width: 620px;">${cohort.description}</p>
          <div class="cohort-stats-row">${statsHtml}</div>
        </div>
      </section>

      <section class="sheet sheet-surface" id="cohort-highlights">
        <div class="container">
          <div class="section-meta">
            <span class="badge-tag">MILESTONES</span>
            <span>WHAT THIS COHORT HAS SHIPPED</span>
          </div>
          <h2 class="display-l">HIGHLIGHTS.</h2>
          <div class="cohort-highlights-grid" style="margin-top: 40px;">${highlightsHtml}</div>
        </div>
      </section>

      <section class="sheet sheet-canvas-soft" id="cohort-sector-mix">
        <div class="container">
          <div class="section-meta">
            <span class="badge-tag">COMPOSITION</span>
            <span>WHERE THIS COHORT COMES FROM</span>
          </div>
          <h2 class="display-l">SECTOR MIX.</h2>
          <div class="cohort-sector-bar" style="margin-top: 40px;">${sectorBarHtml}</div>
          <div class="cohort-sector-legend">${sectorLegendHtml}</div>
        </div>
      </section>

      <section class="sheet sheet-surface" id="cohort-students">
        <div class="container">
          <div class="section-meta">
            <span class="badge-tag">PEOPLE</span>
            <span>${cohort.name} ROSTER</span>
          </div>
          <h2 class="display-l">STUDENTS.</h2>
          <div class="founders-grid" style="margin-top: 40px;">${studentsHtml}</div>
          ${cohort.studentsMoreCount ? `<p class="cohort-students-more">+ ${cohort.studentsMoreCount} more students in ${cohort.displayName || cohort.name}</p>` : ''}
        </div>
      </section>

      <section class="sheet sheet-dark" id="cohort-cta">
        <div class="container cohort-cta-container">
          <h2 class="display-m" style="color: var(--on-ink);">${cohort.cta.title}</h2>
          <p class="lead-text lead-text-dark" style="max-width: 560px; margin-top: 12px;">${cohort.cta.desc}</p>
          <a href="${cohort.cta.btnHref}" class="btn-primary btn-light" style="margin-top: 28px;">${cohort.cta.btnLabel} &rarr;</a>
          ${paginationHtml(cohort, true)}
        </div>
      </section>`;
  }

  function renderNotFound(main) {
    main.innerHTML = `
      <section class="sheet sheet-canvas" id="cohort-not-found">
        <div class="container" style="text-align: center; padding-top: 80px; padding-bottom: 80px;">
          <div class="section-meta" style="justify-content: center;"><span class="badge-tag">COHORTS</span></div>
          <h1 class="display-l">COHORT NOT FOUND.</h1>
          <p class="lead-text" style="max-width: 480px; margin: 16px auto 0;">This cohort does not exist yet. Head back to see every cohort in the network.</p>
          <div class="hero-cta-row" style="justify-content: center; margin-top: 28px;">
            <a href="/#cohorts" class="btn-primary">&larr; All cohorts</a>
          </div>
        </div>
      </section>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('cohortMain');
    if (!main) return;

    const segments = window.location.pathname.split('/').filter(Boolean);
    const slug = segments[segments.length - 1];
    const cohort = (window.COHORT_DATA || {})[slug];

    if (!cohort) {
      renderNotFound(main);
      return;
    }

    document.title = `${cohort.title.replace(/\.$/, '')} | ${cohort.name} | USTH TIM`;

    if (cohort.status === 'coming-soon') {
      renderComingSoon(cohort, main);
    } else {
      renderInProgress(cohort, main);
    }
  });
})();
