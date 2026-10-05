/* ==========================================
   USTH TIM Portfolio Page Interactive Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navigation Scroll Effect & Active Section Highlighting
  const headerNav = document.getElementById('mainHeader');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      headerNav.style.paddingTop = '10px';
    } else {
      headerNav.style.paddingTop = '0px';
    }
  });

  // 1b. Collaboration Section Tabs (Enterprises / Institutions / Alumni / Next Cohort)
  const collabTabBtns = document.querySelectorAll('.collab-tab-btn');
  const collabPanels = document.querySelectorAll('.collab-panel');

  collabTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      collabTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetPanel = btn.getAttribute('data-panel');
      collabPanels.forEach(panel => {
        if (panel.id === targetPanel) {
          panel.style.display = 'grid';
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });

  // Auto-sync founders added from /admin via localStorage
  const customFounders = JSON.parse(localStorage.getItem('tim_custom_founders') || '[]');

  const foundersGrid = document.querySelector('.founders-grid');
  if (customFounders.length > 0 && foundersGrid) {
    customFounders.forEach(cf => {
      const parts = cf.name.split(' ').filter(p => p.length > 0);
      const initials = parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : 'AD';
      const card = document.createElement('div');
      card.className = 'advisor-card';
      card.innerHTML = `
        <div class="advisor-avatar-box">${initials}</div>
        <h3 class="advisor-name">${cf.name}</h3>
        <div class="advisor-role">${cf.role}</div>
        <div class="advisor-affil">${cf.affil}</div>
      `;
      foundersGrid.appendChild(card);
    });
  }


  // 4. FAQ Accordion Toggles + Group Filter
  const faqItems = document.querySelectorAll('.faq-item');
  const faqFilterBtns = document.querySelectorAll('.faq-filter-row .category-tab');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all active items
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  faqFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      faqFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const group = btn.getAttribute('data-group');
      let firstVisible = null;

      faqItems.forEach(item => {
        const matches = group === 'all' || item.getAttribute('data-group') === group;
        item.style.display = matches ? '' : 'none';
        item.classList.remove('active');
        if (matches && !firstVisible) firstVisible = item;
      });

      if (firstVisible) firstVisible.classList.add('active');
    });
  });

  // 5. Form Handling, Validation & Success Simulation
  const engagementForm = document.getElementById('engagementForm');
  const formSuccess = document.getElementById('formSuccess');
  const userRoleSelect = document.getElementById('userRole');
  const interestPills = document.querySelectorAll('.interest-pill');
  const sendAnotherInquiryBtn = document.getElementById('sendAnotherInquiryBtn');

  function setFieldError(inputId, message) {
    const inputEl = document.getElementById(inputId);
    const errorEl = document.getElementById(inputId + 'Error');
    if (inputEl) inputEl.classList.toggle('invalid', !!message);
    if (errorEl) {
      errorEl.textContent = message || '';
      errorEl.classList.toggle('visible', !!message);
    }
  }

  interestPills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
    });
  });

  if (userRoleSelect) {
    userRoleSelect.addEventListener('change', () => {
      if (userRoleSelect.value === 'student') {
        const admissionsPill = document.querySelector('.interest-pill[data-value="Admissions"]');
        if (admissionsPill) admissionsPill.classList.add('active');
      }
    });
  }

  if (engagementForm) {
    engagementForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      const fullName = document.getElementById('fullName');
      if (!fullName.value.trim()) {
        setFieldError('fullName', 'Please enter your full name.');
        isValid = false;
      } else {
        setFieldError('fullName', '');
      }

      const email = document.getElementById('email');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        setFieldError('email', 'Please enter your work email.');
        isValid = false;
      } else if (!emailPattern.test(email.value.trim())) {
        setFieldError('email', 'Please enter a valid email address.');
        isValid = false;
      } else {
        setFieldError('email', '');
      }

      if (!userRoleSelect.value) {
        setFieldError('userRole', 'Please select your role.');
        isValid = false;
      } else {
        setFieldError('userRole', '');
      }

      const message = document.getElementById('message');
      if (!message.value.trim()) {
        setFieldError('message', 'Please tell us a bit about your inquiry.');
        isValid = false;
      } else {
        setFieldError('message', '');
      }

      if (!isValid) return;

      // Demo only: no email is actually sent.
      engagementForm.style.display = 'none';
      formSuccess.style.display = 'block';
    });
  }

  if (sendAnotherInquiryBtn) {
    sendAnotherInquiryBtn.addEventListener('click', () => {
      engagementForm.reset();
      interestPills.forEach(pill => pill.classList.remove('active'));
      ['fullName', 'email', 'userRole', 'message'].forEach(id => setFieldError(id, ''));
      formSuccess.style.display = 'none';
      engagementForm.style.display = 'block';
    });
  }

  document.querySelectorAll('#downloadProfileBtn, .download-profile-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert("Downloading USTH TIM Program Profile (PDF)...");
    });
  });

  // Footer: scroll to a homepage section, optionally opening a Work With Us tab first
  const footerScrollLinks = document.querySelectorAll('.footer-scroll-link');
  footerScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const targetId = href.slice(hashIndex + 1);
      const targetEl = document.getElementById(targetId);
      const tabPanel = link.getAttribute('data-tab');

      if (targetEl) {
        e.preventDefault();
        if (tabPanel) {
          const tabBtn = document.querySelector(`.collab-tab-btn[data-panel="${tabPanel}"]`);
          if (tabBtn) tabBtn.click();
        }
        targetEl.scrollIntoView({ behavior: 'smooth' });
      } else if (tabPanel) {
        sessionStorage.setItem('timOpenTab', tabPanel);
      }
    });
  });

  // If we just navigated here from another page's "Work With Us" footer link, open that tab
  const pendingTab = sessionStorage.getItem('timOpenTab');
  if (pendingTab) {
    sessionStorage.removeItem('timOpenTab');
    const tabBtn = document.querySelector(`.collab-tab-btn[data-panel="${pendingTab}"]`);
    if (tabBtn) tabBtn.click();
  }

  // Footer: Back to top
  const footerToTopBtn = document.getElementById('footerToTopBtn');
  if (footerToTopBtn) {
    footerToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Write Message Modal Logic
  const messageModal = document.getElementById('messageModal');
  const openNoteModalBtn = document.getElementById('openNoteModalBtn');
  const closeMsgModalBtn = document.getElementById('closeMsgModalBtn');
  const msgForm = document.getElementById('msgForm');
  const messagesCarousel = document.querySelector('.messages-carousel');

  if (openNoteModalBtn) {
    openNoteModalBtn.addEventListener('click', () => {
      messageModal.style.display = 'flex';
    });
  }

  if (closeMsgModalBtn) {
    closeMsgModalBtn.addEventListener('click', () => {
      messageModal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === messageModal) {
      messageModal.style.display = 'none';
    }
  });


});
