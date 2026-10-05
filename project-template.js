/* ==========================================
   USTH TIM — Shared project detail template
   Reads the project code from the URL and renders
   the page from window.PROJECTS_DATA.
   ========================================== */
(function () {
  function renderNotFound(main) {
    main.innerHTML = `
      <section class="sheet sheet-canvas" id="project-not-found">
        <div class="container" style="text-align: center; padding-top: 80px; padding-bottom: 80px;">
          <div class="section-meta" style="justify-content: center;"><span class="badge-tag">PROJECTS</span></div>
          <h1 class="display-l">PROJECT NOT FOUND.</h1>
          <p class="lead-text" style="max-width: 480px; margin: 16px auto 0;">This project does not exist. Head back to see every project from Cohort 01.</p>
          <div class="hero-cta-row" style="justify-content: center; margin-top: 28px;">
            <a href="/projects" class="btn-primary">&larr; All projects</a>
          </div>
        </div>
      </section>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('projectMain');
    if (!main) return;

    const data = window.PROJECTS_DATA;
    const segments = window.location.pathname.split('/').filter(Boolean);
    const code = segments[segments.length - 1];
    const project = data.projects.find(p => p.code === code);

    if (!project) {
      renderNotFound(main);
      return;
    }

    const cat = data.categories[project.category];
    document.title = `${project.title.replace(/\.$/, '')} | USTH TIM Projects`;

    const statsHtml = project.featured ? `
      <div class="project-metrics-grid" style="margin-top: 32px; max-width: 460px;">
        <div>
          <div class="p-metric-val" style="color: var(--ink);">${project.featured.stat1.value}</div>
          <div class="p-metric-lbl" style="color: var(--muted);">${project.featured.stat1.label}</div>
        </div>
        <div>
          <div class="p-metric-val" style="color: var(--ink);">${project.featured.stat2.value}</div>
          <div class="p-metric-lbl" style="color: var(--muted);">${project.featured.stat2.label}</div>
        </div>
      </div>` : '';

    const tagsHtml = project.supportType.map(t => `<span class="support-tag">${t}</span>`).join('') +
      (project.coCreated ? '<span class="support-tag support-tag-cocreated">CO-CREATED</span>' : '');

    main.innerHTML = `
      <section class="sheet sheet-canvas" id="project-hero">
        <div class="container">
          <div class="hero-grid" style="align-items: start;">
            <div class="hero-content">
              <div class="cohort-breadcrumb">
                <a href="/projects">Projects</a><span>/</span><span>${project.title.replace(/\.$/, '')}</span>
              </div>

              <div class="section-meta">
                <span class="badge-tag" style="background: ${cat.color}; color: #0A0A0A;">${cat.label}</span>
                <span>${project.status} &bull; Cohort 01 &bull; ${project.date}</span>
              </div>

              <h1 class="display-xl hero-title" style="font-size: clamp(36px, 5vw, 64px);">${project.title}</h1>

              ${statsHtml}
            </div>

            <div class="project-info-card">
              <div class="project-info-row">
                <span class="project-info-label">Partner</span>
                <span class="project-info-value">${project.partner}</span>
              </div>
              <div class="project-info-row">
                <span class="project-info-label">Sector</span>
                <span class="project-info-value">${project.sector}</span>
              </div>
              <div class="project-info-row">
                <span class="project-info-label">Support type</span>
                <span class="project-info-value">
                  <div class="project-card-v2-tags" style="margin-top: 4px;">${tagsHtml}</div>
                </span>
              </div>
              <div class="project-info-row">
                <span class="project-info-label">Status</span>
                <span class="project-info-value">${project.status}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="sheet sheet-surface" id="project-detail-content">
        <div class="container">
          <div class="cohort-highlights-grid">
            <div class="cohort-highlight-card">
              <h3 class="display-m cohort-highlight-title">THE CHALLENGE.</h3>
              <p class="cohort-highlight-desc">${project.challenge}</p>
            </div>
            <div class="cohort-highlight-card">
              <h3 class="display-m cohort-highlight-title">OUR APPROACH.</h3>
              <p class="cohort-highlight-desc">${project.approach}</p>
            </div>
            <div class="cohort-highlight-card">
              <h3 class="display-m cohort-highlight-title">THE OUTCOME.</h3>
              <p class="cohort-highlight-desc">${project.outcomeLong}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="sheet sheet-dark" id="project-cta">
        <div class="container cohort-cta-container">
          <h2 class="display-m" style="color: var(--on-ink);">WORK ON SOMETHING LIKE THIS.</h2>
          <p class="lead-text lead-text-dark" style="max-width: 540px; margin-top: 12px;">
            Bring a similar challenge to Cohort 01 and work with managers and specialists from across industries.
          </p>
          <a href="/#contact" class="btn-primary btn-light" style="margin-top: 28px;">Bring a similar challenge &rarr;</a>
          <div class="cohort-pagination cohort-pagination-dark">
            <a href="/projects">&larr; All projects</a>
          </div>
        </div>
      </section>`;
  });
})();
