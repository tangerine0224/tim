/* ==========================================
   USTH TIM: Shared idea detail template
   Reads the idea code from the URL and renders
   the page from window.IDEAS_DATA.
   ========================================== */
(function () {
  function renderNotFound(main) {
    main.innerHTML = `
      <section class="sheet sheet-canvas" id="idea-not-found">
        <div class="container" style="text-align: center; padding-top: 80px; padding-bottom: 80px;">
          <div class="section-meta" style="justify-content: center;"><span class="badge-tag">IDEA WORTH SHARING</span></div>
          <h1 class="display-l">IDEA NOT FOUND.</h1>
          <p class="lead-text" style="max-width: 480px; margin: 16px auto 0;">This post does not exist. Head back to see every idea shared by the network.</p>
          <div class="hero-cta-row" style="justify-content: center; margin-top: 28px;">
            <a href="/blog" class="btn-primary">&larr; All ideas</a>
          </div>
        </div>
      </section>`;
  }

  function byline(p, ui) {
    return `
      <div class="idea-detail-byline">
        <span class="idea-avatar">${ui.initials(p.author)}</span>
        <div>
          <div class="idea-author-name">${ui.escapeHtml(p.author)}</div>
          <div class="idea-author-role">${ui.escapeHtml(p.role)} &bull; ${ui.escapeHtml(p.org)}</div>
        </div>
        <span class="idea-read-time">${ui.escapeHtml(p.readTime)}</span>
      </div>`;
  }

  function relatedCardHtml(p, ui) {
    const cat = ui.CATEGORIES[p.category];
    return `
      <a href="/ideas/${p.code}" class="idea-card idea-card--fieldnotes">
        <span class="badge-tag ${cat.badgeClass}">${cat.label.toUpperCase()}</span>
        <h3 class="idea-card-title">${ui.escapeHtml(p.title)}</h3>
        <p class="idea-card-excerpt">${ui.escapeHtml(p.excerpt)}</p>
        ${ui.footerHtml(p)}
      </a>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('ideaMain');
    if (!main) return;

    const ui = window.IdeasUI;
    const posts = ui.POSTS;
    const segments = window.location.pathname.split('/').filter(Boolean);
    const code = segments[segments.length - 1];
    const post = posts.find(p => p.code === code);

    if (!post) {
      renderNotFound(main);
      return;
    }

    const cat = ui.CATEGORIES[post.category];
    document.title = `${post.title} | USTH TIM Idea Worth Sharing`;

    const bodyHtml = post.body.map(para => `<p>${ui.escapeHtml(para)}</p>`).join('');

    let extraHtml = '';
    if (post.category === 'toolkit' && post.resources) {
      const items = post.resources.map(r => `
        <li>
          <svg class="idea-toolkit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span class="idea-toolkit-name">${ui.escapeHtml(r.name)}</span>
          <span class="idea-toolkit-format">${ui.escapeHtml(r.format)}</span>
        </li>`).join('');
      extraHtml = `
        <div class="cohort-highlight-card" style="margin-top: 40px; max-width: 720px; margin-left: auto; margin-right: auto;">
          <h3 class="display-m cohort-highlight-title" style="font-size: clamp(20px, 2vw, 26px);">RESOURCES IN THIS TOOLKIT.</h3>
          <ul class="idea-toolkit-list" style="border-top: none; padding-top: 0;">${items}</ul>
        </div>`;
    } else if (post.category === 'reading-list' && post.books) {
      const items = post.books.map(b => `<li>${ui.escapeHtml(b)}</li>`).join('');
      extraHtml = `
        <div class="cohort-highlight-card" style="margin-top: 40px; max-width: 720px; margin-left: auto; margin-right: auto;">
          <h3 class="display-m cohort-highlight-title" style="font-size: clamp(20px, 2vw, 26px);">BOOKS IN THIS LIST.</h3>
          <ul class="idea-book-list">${items}</ul>
        </div>`;
    } else if (post.category === 'ask-network' && post.answers) {
      const answers = post.answers.map(a => `
        <div class="idea-answer">
          <span class="idea-avatar">${ui.initials(a.author)}</span>
          <div>
            <div class="idea-author-name">${ui.escapeHtml(a.author)}</div>
            <div class="idea-author-role" style="margin-bottom: 8px;">${ui.escapeHtml(a.role)} &bull; ${ui.escapeHtml(a.org)}</div>
            <p class="idea-answer-text">${ui.escapeHtml(a.text)}</p>
          </div>
        </div>`).join('');
      extraHtml = `
        <div class="cohort-highlight-card" style="margin-top: 40px; max-width: 720px; margin-left: auto; margin-right: auto;">
          <h3 class="display-m cohort-highlight-title" style="font-size: clamp(20px, 2vw, 26px);">ANSWERS FROM THE NETWORK.</h3>
          <div class="idea-answers-list">${answers}</div>
        </div>`;
    }

    let related = posts.filter(p => p.code !== post.code && p.category === post.category);
    if (related.length < 2) {
      const fallback = posts.filter(p => p.code !== post.code && !related.includes(p)).reverse();
      related = related.concat(fallback).slice(0, 2);
    } else {
      related = related.slice(0, 2);
    }

    main.innerHTML = `
      <section class="sheet sheet-canvas" id="idea-hero">
        <div class="container">
          <div class="cohort-breadcrumb">
            <a href="/blog">Ideas</a><span>/</span><span>${cat.label}</span>
          </div>

          <div class="section-meta">
            <span class="badge-tag ${cat.badgeClass}">${cat.label.toUpperCase()}</span>
          </div>

          <h1 class="display-l hero-title" style="max-width: 920px;">${ui.escapeHtml(post.title)}</h1>

          ${byline(post, ui)}
        </div>
      </section>

      <section class="sheet sheet-surface" id="idea-content">
        <div class="container">
          <div class="idea-body-text">
            ${bodyHtml}
          </div>
          ${extraHtml}
        </div>
      </section>

      <section class="sheet sheet-canvas-soft" id="idea-related">
        <div class="container">
          <h2 class="display-m" style="margin-bottom: 24px;">RELATED IDEAS.</h2>
          <div class="ideas-related-grid">
            ${related.map(p => relatedCardHtml(p, ui)).join('')}
          </div>
          <div class="cohort-pagination" style="margin-top: 40px;">
            <a href="/blog">&larr; All ideas</a>
          </div>
        </div>
      </section>`;
  });
})();
