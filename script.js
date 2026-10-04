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

  // 1b. Collaboration Section Tabs (For Partners vs For Students)
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

  // 2. Carousel Controls & See All Logic
  const projectsCarousel = document.getElementById('projectsCarousel');
  const prevProjectBtn = document.getElementById('prevProjectBtn');
  const nextProjectBtn = document.getElementById('nextProjectBtn');
  const seeAllProjectsBtn = document.getElementById('seeAllProjectsBtn');

  if (prevProjectBtn && projectsCarousel) {
    prevProjectBtn.addEventListener('click', () => {
      projectsCarousel.scrollBy({ left: -320, behavior: 'smooth' });
    });
  }

  if (nextProjectBtn && projectsCarousel) {
    nextProjectBtn.addEventListener('click', () => {
      projectsCarousel.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // Auto-sync items added from /admin via localStorage
  const customProjects = JSON.parse(localStorage.getItem('tim_custom_projects') || '[]');
  const customFounders = JSON.parse(localStorage.getItem('tim_custom_founders') || '[]');

  if (customProjects.length > 0 && projectsCarousel) {
    customProjects.forEach((cp, i) => {
      const pKey = cp.id || `p_custom_sync_${i}`;
      projectDetails[pKey] = {
        title: cp.title,
        gen: cp.gen === 'GENERATION 1' ? 'Generation 1 Pioneer Capstone' : 'Gen 2 Target Focus Area',
        partner: cp.partner,
        lead: "USTH TIM Cohort Candidate",
        advisor: "USTH TIM Advisory Board",
        metrics: [{ label: cp.lbl || 'Impact', val: cp.val || 'Verified' }],
        description: cp.desc || 'Admin added capstone entry.',
        techStack: 'Tech Strategy, R&D Protocol'
      };

      const newSpine = document.createElement('div');
      newSpine.className = `spine-card spine-card-${(i % 5) + 1}`;
      newSpine.innerHTML = `
        <div class="spine-collapsed-view">
          <span class="spine-num">0${i + 7}</span>
          <span class="spine-title-vertical">${cp.title.toUpperCase()}</span>
          <span class="spine-badge-dot"></span>
        </div>
        <div class="spine-expanded-content">
          <div class="project-banner project-banner-2">
            <span class="badge-tag project-gen-pill">${cp.gen}</span>
          </div>
          <div class="project-body">
            <h3 class="project-title">${cp.title}</h3>
            <p class="project-desc">${cp.desc || 'Admin added capstone entry.'}</p>
            <div class="project-metrics-grid">
              <div>
                <div class="p-metric-val">${cp.val}</div>
                <div class="p-metric-lbl">${cp.lbl}</div>
              </div>
            </div>
            <div class="project-footer">
              <span class="partner-tag">PARTNER: ${cp.partner}</span>
              <button class="btn-outlined open-modal-btn" data-project="${pKey}">Details &rarr;</button>
            </div>
          </div>
        </div>
      `;

      newSpine.addEventListener('mouseenter', () => {
        document.querySelectorAll('.spine-card').forEach(s => s.classList.remove('expanded'));
        newSpine.classList.add('expanded');
      });

      projectsCarousel.appendChild(newSpine);
    });
  }

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

  // Active spine card interaction logic (mouseenter & click)
  const spineCards = document.querySelectorAll('.spine-card');
  spineCards.forEach(spine => {
    spine.addEventListener('mouseenter', () => {
      spineCards.forEach(s => s.classList.remove('expanded'));
      spine.classList.add('expanded');
    });

    spine.addEventListener('click', (e) => {
      if (e.target.classList.contains('open-modal-btn')) return;
      spineCards.forEach(s => s.classList.remove('expanded'));
      spine.classList.add('expanded');
    });
  });

  // 3. Project Detail Modal Data & Logic
  const projectDetails = {
    p1: {
      title: "AI-Driven Energy Optimization for High-Tech Industrial Parks",
      gen: "Generation 1 Pioneer Capstone",
      partner: "Schneider Electric Vietnam & USTH ICT Lab",
      lead: "Nguyen Quang Huy (Gen 1 Master Candidate)",
      advisor: "Dr. Marc Delacroix (CNRS) & Assoc. Prof. Nguyen Van Ha",
      metrics: [
        { label: "Energy Efficiency Gain", val: "24.5%" },
        { label: "Patents Filed", val: "2 National Filings" },
        { label: "Implementation Scale", val: "2 Factory Clusters" }
      ],
      description: "This project designed a real-time algorithmic energy balancing platform tailored for high-density electronic assembly plants. By deploying edge-computing nodes on factory micro-grids, the platform predicts peak power demands and adjusts HVAC / automated machine cycles, cutting grid peak charges dramatically.",
      techStack: "Python, PyTorch, Industrial Modbus Protocol, Docker, Embedded IoT Edge Gateways"
    },
    p2: {
      title: "DeepTech Venture Commercialization Framework for VAST Research",
      gen: "Generation 1 Pioneer Capstone",
      partner: "VinAI Research & VAST Institute of Physics",
      lead: "Tran Thi Thu Hang (Gen 1 Master Candidate)",
      advisor: "Prof. Jean-Marc Rossi & Eng. Tran Minh Duc (FPT)",
      metrics: [
        { label: "Commercialization Value", val: "$150,000" },
        { label: "Spin-offs Formed", val: "3 DeepTech Startups" },
        { label: "IP Valuation Model", val: "VAST Certified" }
      ],
      description: "Addressing the technology transfer gap in Vietnam, this thesis developed a standardized decision matrix for scientific patent valuation, royalty structuring, and spin-off equity allocation. It was successfully applied to license 3 advanced photonics and nanotechnology patents from VAST to commercial joint ventures.",
      techStack: "Valuation Modeling, IP Law Framework, Monte Carlo Simulation, Cap-table Structuring"
    },
    p3: {
      title: "Circular Plastics Traceability & Supply Chain Ledger",
      gen: "Generation 1 Pioneer Capstone",
      partner: "Unilever Vietnam & USTH TIM Lab",
      lead: "Le Hoang Nam (Gen 1 Master Candidate)",
      advisor: "Dr. Valérie Moreau (CNRS France)",
      metrics: [
        { label: "Pilots Deployed", val: "4 Processing Plants" },
        { label: "Traceability Accuracy", val: "100% Verified" },
        { label: "Recycled Plastic Tracked", val: "1,200 Tons" }
      ],
      description: "Created a secure digital passport framework for post-consumer recycled plastic (rPET). By assigning cryptographic QR tags at collection hubs and logging transformations through processing plants, consumer brands can audit recycled material percentages for international compliance.",
      techStack: "Hyperledger Fabric, Smart Contracts, Web3 API, QR/RFID Scanning Hardware"
    },
    p4: {
      title: "Autonomous Drone Fleet Management for Precision Agriculture",
      gen: "Generation 2 Target Co-R&D Focus",
      partner: "USTH & CNRS Joint Remote Sensing Laboratory",
      lead: "Gen 2 Candidate Intake (Opening Sept 2026)",
      advisor: "USTH Aeronautical & Remote Sensing Faculty",
      metrics: [
        { label: "Project Status", val: "Sponsor Intake Open" },
        { label: "Target Coverage", val: "50,000 Hectares" },
        { label: "R&D Duration", val: "9 Months (2026-2027)" }
      ],
      description: "Targeting Generation 2 execution, this co-R&D initiative focuses on deploying low-cost autonomous UAV swarms equipped with multispectral sensors to detect early crop stress, nitrogen deficiency, and water usage in agricultural zones across northern Vietnam.",
      techStack: "Computer Vision, Multispectral Imagery, Autonomous Flight Mesh, ROS 2"
    },
    p5: {
      title: "Next-Gen Bio-Polymers from Agricultural Waste Streams",
      gen: "Generation 1 Pioneer Capstone",
      partner: "CNRS & USTH Green Chemistry Lab",
      lead: "Pham Minh Anh (Gen 1 Master Candidate)",
      advisor: "Dr. Valérie Moreau (CNRS France)",
      metrics: [
        { label: "PCT Patents", val: "3 Filings" },
        { label: "R&D Grant Value", val: "€80,000" },
        { label: "Biodegradation", val: "100% in 180 Days" }
      ],
      description: "Developed a bio-refinery process extracting high-purity cellulose and bio-silica from Vietnamese rice husk agricultural waste, forming biodegradable barrier films for sustainable microelectronics packaging.",
      techStack: "Green Chemistry, Polymer Rheology, Spectroscopic Analysis, Bioplastics Synthesis"
    },
    p6: {
      title: "Quantum-Safe Encryption for Smart Grid Infrastructure",
      gen: "Generation 2 Target Co-R&D Focus",
      partner: "Viettel High Tech R&D Institute",
      lead: "Gen 2 Candidate Intake (Opening Sept 2026)",
      advisor: "USTH Applied Math & Cybersecurity Faculty",
      metrics: [
        { label: "Project Status", val: "Sponsor Intake Open" },
        { label: "Encryption Standard", val: "NIST PQC Candidate" },
        { label: "Target Network", val: "National SCADA Microgrid" }
      ],
      description: "Targeting Gen 2, this project implements lattice-based post-quantum cryptographic primitives directly onto power grid control hardware to guard against future quantum computing decryption risks.",
      techStack: "Lattice Cryptography, C/C++, Embedded Hardware Security Modules, SCADA Protocol"
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.getElementById('closeModalBtn');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];

      if (data) {
        modalContent.innerHTML = `
          <div class="badge-tag" style="background: var(--ink); color: var(--on-ink); margin-bottom: 12px; display: inline-block;">${data.gen}</div>
          <h3 class="display-m" style="margin-bottom: 12px; color: var(--ink);">${data.title}</h3>
          <p style="font-family: var(--font-mono); font-size: 13px; color: var(--muted); margin-bottom: 24px;">PARTNER: ${data.partner}</p>
          
          <div style="background: var(--canvas-soft); padding: 20px; border-radius: var(--radius-tile); margin-bottom: 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
            ${data.metrics.map(m => `
              <div>
                <div style="font-family: var(--font-display); font-size: 24px; font-weight: 700; color: var(--ink);">${m.val}</div>
                <div style="font-size: 12px; color: var(--muted);">${m.label}</div>
              </div>
            `).join('')}
          </div>

          <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--ink);">PROJECT SUMMARY</h4>
          <p style="font-size: 15px; color: var(--muted); line-height: 1.6; margin-bottom: 20px;">${data.description}</p>
          
          <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--ink);">TECHNOLOGY & METHODOLOGY STACK</h4>
          <p style="font-family: var(--font-mono); font-size: 13px; color: var(--ink-soft); background: var(--canvas); padding: 12px; border-radius: 6px; margin-bottom: 28px;">${data.techStack}</p>

          <div style="display: flex; gap: 16px; align-items: center;">
            <a href="#contact" class="btn-primary" onclick="closeProjectModal()">Inquire About This Capstone Model &rarr;</a>
          </div>
        `;
        projectModal.style.display = 'flex';
      }
    });
  });

  function closeProjectModal() {
    projectModal.style.display = 'none';
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeProjectModal);
  }

  window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  // 4. FAQ Accordion Toggles
  const faqItems = document.querySelectorAll('.faq-item');

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

  // 5. Form Handling & Success Simulation
  const engagementForm = document.getElementById('engagementForm');
  const formSuccess = document.getElementById('formSuccess');

  if (engagementForm) {
    engagementForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const role = document.getElementById('userRole').value;

      // Simulate API response
      engagementForm.style.display = 'none';
      formSuccess.style.display = 'block';
    });
  }

  const downloadBrochureBtn = document.getElementById('downloadBrochureBtn');
  if (downloadBrochureBtn) {
    downloadBrochureBtn.addEventListener('click', () => {
      alert("Downloading USTH TIM Master Program Prospectus & Partnership Guide (PDF)...");
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

  if (seeAllProjectsBtn) {
    seeAllProjectsBtn.addEventListener('click', () => {
      let catalogHtml = `
        <div class="badge-tag" style="background: var(--ink); color: var(--on-ink); margin-bottom: 12px; display: inline-block;">FULL PORTFOLIO CATALOG</div>
        <h3 class="display-m" style="margin-bottom: 24px; color: var(--ink);">ALL PROJECTS & BREAKTHROUGHS.</h3>
        <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
      `;

      Object.keys(projectDetails).forEach(key => {
        const p = projectDetails[key];
        catalogHtml += `
          <div style="border: 1px solid var(--hairline); padding: 20px; border-radius: var(--radius-tile); background: var(--canvas-soft);">
            <span class="badge-tag" style="margin-bottom: 8px; display: inline-block;">${p.gen}</span>
            <h4 style="font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 6px;">${p.title}</h4>
            <p style="font-size: 13px; color: var(--muted); margin-bottom: 12px;">${p.description}</p>
            <div style="font-family: var(--font-mono); font-size: 12px; color: var(--ink); display: flex; justify-content: space-between; align-items: center;">
              <span>PARTNER: ${p.partner}</span>
              <button class="btn-outlined open-modal-btn" data-project="${key}" style="padding: 4px 12px; font-size: 12px;" onclick="closeProjectModal()">View Details &rarr;</button>
            </div>
          </div>
        `;
      });

      catalogHtml += `</div>`;
      modalContent.innerHTML = catalogHtml;
      projectModal.style.display = 'flex';

      // Re-attach open detail handlers for modal links
      modalContent.querySelectorAll('.open-modal-btn').forEach(b => {
        b.addEventListener('click', () => {
          const k = b.getAttribute('data-project');
          const d = projectDetails[k];
          if (d) {
            modalContent.innerHTML = `
              <div class="badge-tag" style="background: var(--ink); color: var(--on-ink); margin-bottom: 12px; display: inline-block;">${d.gen}</div>
              <h3 class="display-m" style="margin-bottom: 12px; color: var(--ink);">${d.title}</h3>
              <p style="font-family: var(--font-mono); font-size: 13px; color: var(--muted); margin-bottom: 24px;">PARTNER: ${d.partner}</p>
              
              <div style="background: var(--canvas-soft); padding: 20px; border-radius: var(--radius-tile); margin-bottom: 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                ${d.metrics.map(m => `
                  <div>
                    <div style="font-family: var(--font-display); font-size: 24px; font-weight: 700; color: var(--ink);">${m.val}</div>
                    <div style="font-size: 12px; color: var(--muted);">${m.label}</div>
                  </div>
                `).join('')}
              </div>

              <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--ink);">PROJECT SUMMARY</h4>
              <p style="font-size: 15px; color: var(--muted); line-height: 1.6; margin-bottom: 20px;">${d.description}</p>
              
              <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--ink);">TECHNOLOGY & METHODOLOGY STACK</h4>
              <p style="font-family: var(--font-mono); font-size: 13px; color: var(--ink-soft); background: var(--canvas); padding: 12px; border-radius: 6px; margin-bottom: 28px;">${d.techStack}</p>

              <div style="display: flex; gap: 16px; align-items: center;">
                <a href="#contact" class="btn-primary" onclick="closeProjectModal()">Inquire About This Capstone Model &rarr;</a>
              </div>
            `;
          }
        });
      });
    });
  }

  // 7. Student / Admin Portal Management Logic
  const portalModal = document.getElementById('portalModal');
  const portalLoginBtn = document.getElementById('portalLoginBtn');
  const closePortalModalBtn = document.getElementById('closePortalModalBtn');
  const oneClickLoginBtn = document.getElementById('oneClickLoginBtn');
  const portalLoginView = document.getElementById('portalLoginView');
  const portalDashboardView = document.getElementById('portalDashboardView');
  const portalUserHeader = document.getElementById('portalUserHeader');
  const portalLogoutBtn = document.getElementById('portalLogoutBtn');

  let selectedPortalRole = 'Program Administrator';

  if (portalLoginBtn) {
    portalLoginBtn.addEventListener('click', () => {
      portalModal.style.display = 'flex';
    });
  }

  if (closePortalModalBtn) {
    closePortalModalBtn.addEventListener('click', () => {
      portalModal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === portalModal) {
      portalModal.style.display = 'none';
    }
  });

  // Role selector buttons inside portal
  const roleSelectBtns = document.querySelectorAll('.role-select-btn');
  roleSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roleSelectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPortalRole = btn.getAttribute('data-role') || 'User';
    });
  });

  // 1-Click Login Simulation
  if (oneClickLoginBtn) {
    oneClickLoginBtn.addEventListener('click', () => {
      portalLoginView.style.display = 'none';
      portalDashboardView.style.display = 'block';
      if (portalUserHeader) {
        portalUserHeader.textContent = `Logged in as: TIM ${selectedPortalRole}`;
      }
    });
  }

  if (portalLogoutBtn) {
    portalLogoutBtn.addEventListener('click', () => {
      portalDashboardView.style.display = 'none';
      portalLoginView.style.display = 'block';
    });
  }

  // Portal Sub-Tab Switching
  const portalTabBtns = document.querySelectorAll('.portal-tab-btn');
  const portalTabPanels = document.querySelectorAll('.portal-tab-panel');

  portalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      portalTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      portalTabPanels.forEach(panel => {
        if (panel.id === targetTab) {
          panel.style.display = 'block';
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });

  // Dynamic Database Addition 1: Save Project to Live Bookshelf
  const dbAddProjectForm = document.getElementById('dbAddProjectForm');
  let customProjCounter = 7;

  if (dbAddProjectForm) {
    dbAddProjectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('dbProjTitle').value;
      const gen = document.getElementById('dbProjGen').value;
      const partner = document.getElementById('dbProjPartner').value;
      const metricVal = document.getElementById('dbProjMetricVal').value;
      const metricLbl = document.getElementById('dbProjMetricLbl').value;
      const desc = document.getElementById('dbProjDesc').value;

      const pKey = `p_custom_${customProjCounter++}`;

      // Save to projectDetails data object
      projectDetails[pKey] = {
        title: title,
        gen: gen === 'GENERATION 1' ? 'Generation 1 Pioneer Capstone' : 'Gen 2 Target Focus Area',
        partner: partner,
        lead: "USTH TIM Cohort Candidate",
        advisor: "USTH TIM Advisory Board",
        metrics: [
          { label: metricLbl, val: metricVal },
          { label: "Database Entry", val: "Verified" }
        ],
        description: desc,
        techStack: "Tech Strategy, R&D Protocol, Industrial Validation"
      };

      // Create new book spine element for the bookshelf carousel
      const spineNumStr = customProjCounter < 10 ? `0${customProjCounter - 1}` : `${customProjCounter - 1}`;
      const newSpine = document.createElement('div');
      newSpine.className = `spine-card spine-card-${(customProjCounter % 5) + 1}`;
      newSpine.innerHTML = `
        <div class="spine-collapsed-view">
          <span class="spine-num">${spineNumStr}</span>
          <span class="spine-title-vertical">${title.toUpperCase()}</span>
          <span class="spine-badge-dot"></span>
        </div>
        <div class="spine-expanded-content">
          <div class="project-banner project-banner-2">
            <span class="badge-tag ${gen === 'GENERATION 1' ? '' : 'badge-tag-mint'} project-gen-pill">${gen}</span>
            <div class="project-banner-graphic">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></svg>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">${title}</h3>
            <p class="project-desc">${desc}</p>
            
            <div class="project-metrics-grid">
              <div>
                <div class="p-metric-val">${metricVal}</div>
                <div class="p-metric-lbl">${metricLbl}</div>
              </div>
              <div>
                <div class="p-metric-val">Database</div>
                <div class="p-metric-lbl">Live Verified</div>
              </div>
            </div>

            <div class="project-footer">
              <span class="partner-tag">PARTNER: ${partner.toUpperCase()}</span>
              <button class="btn-outlined open-modal-btn" data-project="${pKey}">Details &rarr;</button>
            </div>
          </div>
        </div>
      `;

      // Attach interactions to new spine
      newSpine.addEventListener('mouseenter', () => {
        document.querySelectorAll('.spine-card').forEach(s => s.classList.remove('expanded'));
        newSpine.classList.add('expanded');
      });
      newSpine.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('open-modal-btn')) return;
        document.querySelectorAll('.spine-card').forEach(s => s.classList.remove('expanded'));
        newSpine.classList.add('expanded');
      });

      // Attach detail popup listener
      const newModalBtn = newSpine.querySelector('.open-modal-btn');
      if (newModalBtn) {
        newModalBtn.addEventListener('click', () => {
          const d = projectDetails[pKey];
          modalContent.innerHTML = `
            <div class="badge-tag" style="background: var(--ink); color: var(--on-ink); margin-bottom: 12px; display: inline-block;">${d.gen}</div>
            <h3 class="display-m" style="margin-bottom: 12px; color: var(--ink);">${d.title}</h3>
            <p style="font-family: var(--font-mono); font-size: 13px; color: var(--muted); margin-bottom: 24px;">PARTNER: ${d.partner}</p>
            <p style="font-size: 15px; color: var(--muted); line-height: 1.6; margin-bottom: 20px;">${d.description}</p>
            <a href="#contact" class="btn-primary" onclick="closeProjectModal()">Inquire About This Capstone &rarr;</a>
          `;
          projectModal.style.display = 'flex';
        });
      }

      projectsCarousel.appendChild(newSpine);
      dbAddProjectForm.reset();
      portalModal.style.display = 'none';

      alert(`Success! Project "${title}" has been added to the database and is rendered on the live Bookshelf.`);
    });
  }

  // Dynamic Database Addition 2: Save Founder to Advisory Board Grid
  const dbAddFounderForm = document.getElementById('dbAddFounderForm');
  const foundersGrid = document.querySelector('.founders-grid');

  if (dbAddFounderForm && foundersGrid) {
    dbAddFounderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('dbFounderName').value;
      const role = document.getElementById('dbFounderRole').value;
      const affil = document.getElementById('dbFounderAffil').value;

      // Extract initials
      const nameParts = name.split(' ').filter(p => p.length > 0);
      let initials = 'AD';
      if (nameParts.length >= 2) {
        initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
      } else if (nameParts.length === 1) {
        initials = nameParts[0].substring(0, 2).toUpperCase();
      }

      const newAdvisorCard = document.createElement('div');
      newAdvisorCard.className = 'advisor-card';
      newAdvisorCard.innerHTML = `
        <div class="advisor-avatar-box">${initials}</div>
        <h3 class="advisor-name">${name}</h3>
        <div class="advisor-role">${role}</div>
        <div class="advisor-affil">${affil}</div>
      `;

      foundersGrid.appendChild(newAdvisorCard);
      dbAddFounderForm.reset();
      portalModal.style.display = 'none';

      alert(`Success! ${name} has been added to the USTH TIM Advisory Board grid.`);
    });
  }

});
