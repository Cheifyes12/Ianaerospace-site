/**
 * Batavia Aerospace — Content Renderer
 * scripts/render.js
 *
 * Loads JSON files from /content/ and builds all dynamic
 * sections of the page. To edit content, change the JSON files —
 * you do NOT need to touch this file for normal updates.
 */

// ── Helpers ──────────────────────────────────────────────────────

async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function observeFadeUp() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

// ── Flight Tab Switcher (global) ─────────────────────────────────
window.switchTab = function(btn, panelId) {
  const container = btn.closest('.flight-data');
  container.querySelectorAll('.fd-tab').forEach(t => t.classList.remove('active'));
  container.querySelectorAll('.fd-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(panelId).classList.add('active');
};

// ── Config ───────────────────────────────────────────────────────
async function renderConfig() {
  const cfg = await loadJSON('content/config.json');

  // Hero
  document.getElementById('hero-photo').style.backgroundImage = `url('${cfg.heroImage}')`;
  document.getElementById('hero-sub').textContent = cfg.heroSubtitle;
  document.getElementById('donate-btn-hero').href = cfg.donateUrl;
  document.getElementById('donate-hcb-bar').href = cfg.donateUrl;
  document.getElementById('hcb-donate-link').href = cfg.donateUrl;

  // Email
  const emailEl = document.getElementById('contact-email');
  emailEl.href = `mailto:${cfg.email}`;
  emailEl.textContent = cfg.email;

  // Stats
  const statRow = document.getElementById('stat-row');
  statRow.innerHTML = cfg.stats.map(s =>
    `<div class="stat"><span class="stat-num">${s.value}</span><span class="stat-label">${s.label}</span></div>`
  ).join('');

  // Join bullets
  document.getElementById('join-bullets').innerHTML =
    cfg.joinBullets.map(b => `<div class="join-bullet">${b}</div>`).join('');

  // Social links
  const socialIcons = {
    instagram: `<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    tiktok:    `<svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/></svg>`,
    youtube:   `<svg viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>`,
    linkedin:  `<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
  };
  const labels = { instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube', linkedin: 'LinkedIn' };
  document.getElementById('social-links').innerHTML =
    Object.entries(cfg.social).map(([k, url]) =>
      `<a href="${url}" target="_blank" class="social-link">${socialIcons[k] || ''}${labels[k] || k}</a>`
    ).join('');

  return cfg;
}

// ── Updates ──────────────────────────────────────────────────────
async function renderUpdates() {
  const updates = await loadJSON('content/updates.json');
  const list = document.getElementById('updates-list');
  list.innerHTML = updates.map(u => `
    <div class="update-item fade-up">
      <div class="update-date">${u.date}</div>
      <div>
        <div class="update-title">${u.title}</div>
        <div class="update-desc">${u.description}</div>
      </div>
    </div>
  `).join('');
}

// ── Team ─────────────────────────────────────────────────────────
async function renderTeam() {
  const team = await loadJSON('content/team.json');
  document.getElementById('team-grid').innerHTML = team.map(m => `
    <div class="team-card fade-up">
      <img class="team-photo" src="${m.photo}" alt="${m.name}"/>
      <div class="team-info">
        <div class="team-name">${m.name}</div>
        <div class="team-role">${m.role}</div>
        <div class="team-role-sub">${m.subrole}</div>
      </div>
    </div>
  `).join('');
}

// ── Rocketry Projects ────────────────────────────────────────────
async function renderRocketry() {
  const projects = await loadJSON('content/rocketry-projects.json');
  document.getElementById('rocketry-projects').innerHTML = projects.map(p => {
    const imgs = p.images;
    const gallery = `
      <div class="project-gallery">
        <img src="${imgs[0]}" alt="${p.name}"/>
        ${imgs[1] ? `<img src="${imgs[1]}" alt="${p.name} detail"/>` : ''}
        ${imgs[2] ? `<img src="${imgs[2]}" alt="${p.name} detail 2"/>` : ''}
      </div>`;

    const flightDataHtml = p.flightData && p.flightData.length ? `
      <div class="flight-data">
        <div class="flight-data-title">// Flight Data</div>
        <div class="fd-tabs">
          ${p.flightData.map((fd, i) =>
            `<button class="fd-tab${i === 0 ? ' active' : ''}" onclick="switchTab(this,'${fd.id}')">${fd.label}</button>`
          ).join('')}
        </div>
        ${p.flightData.map((fd, i) => `
          <div class="fd-panel${i === 0 ? ' active' : ''}" id="${fd.id}">
            <div class="fd-grid">
              ${fd.stats.map(s => `
                <div class="fd-item">
                  <span class="fd-label">${s.label}</span>
                  <span class="fd-val">${s.value}</span>
                </div>`).join('')}
            </div>
          </div>`).join('')}
      </div>` : '';

    const cadHtml = p.cadLink
      ? `<a href="${p.cadLink.url}" target="_blank" class="cad-link">${p.cadLink.label} →</a>` : '';

    return `
      <div class="project-card fade-up">
        ${gallery}
        <div class="project-info">
          <div class="project-status status-${p.status}">● ${p.statusLabel}</div>
          <div class="project-name">${p.name}</div>
          <p class="project-desc">${p.description}</p>
          <div class="design-notes"><strong>Design Notes</strong>${p.designNotes}</div>
          ${flightDataHtml}
          <div class="project-meta">
            ${p.meta.map(m => `
              <div class="meta-item">
                <span class="meta-label">${m.label}</span>
                <span class="meta-value">${m.value}</span>
              </div>`).join('')}
          </div>
          ${cadHtml}
        </div>
      </div>`;
  }).join('');
}

// ── Aviation ─────────────────────────────────────────────────────
async function renderAviation() {
  const data = await loadJSON('content/aviation.json');
  const container = document.getElementById('aviation-content');

  const aircraftHtml = `
    <div class="rc-desc-block fade-up">
      <p>${data.description}</p>
    </div>
    <div class="rc-sub-eyebrow">Aircraft</div>
    <div class="rc-planes-grid">
      ${data.aircraft.map(a => `
        <div class="project-card fade-up" style="grid-template-columns:1fr;">
          <img class="rc-plane-img" src="${a.image}" alt="${a.name}"/>
          <div class="project-info" style="max-height:none;">
            <div class="project-status status-${a.status}">● ${a.statusLabel}</div>
            <div class="project-name project-name-sm">${a.name}</div>
            <p class="project-desc">${a.description}</p>
            <div class="project-meta">
              ${a.meta.map(m => `
                <div class="meta-item">
                  <span class="meta-label">${m.label}</span>
                  <span class="meta-value">${m.value}</span>
                </div>`).join('')}
            </div>
          </div>
        </div>`).join('')}
    </div>
    <div class="rc-sub-eyebrow" style="margin-top:48px;">Upcoming Goals</div>
    <div class="rc-goals fade-up">
      ${data.goals.map(g => `
        <div class="rc-goal-card">
          <div class="project-status status-${g.status}">◦ ${g.statusLabel}</div>
          <div class="rc-goal-title">${g.title}</div>
          <div class="rc-goal-desc">${g.description}</div>
        </div>`).join('')}
    </div>`;

  container.innerHTML = aircraftHtml;
}

// ── Certifications ───────────────────────────────────────────────
async function renderCertifications() {
  const certs = await loadJSON('content/certifications.json');
  document.getElementById('certs-grid').innerHTML = certs.map(c => `
    <div class="cert-card fade-up">
      <div class="section-eyebrow" style="margin-bottom:8px;">${c.program}</div>
      <div class="cert-name">${c.name}</div>
      <div class="cert-badge">${c.certification}</div>
      <p class="cert-detail">${c.description}</p>
    </div>
  `).join('');
}

// ── Boot ─────────────────────────────────────────────────────────
async function init() {
  try {
    await Promise.all([
      renderConfig(),
      renderUpdates(),
      renderTeam(),
      renderRocketry(),
      renderAviation(),
      renderCertifications(),
    ]);
  } catch (err) {
    console.error('Render error:', err);
  }
  // Re-run fade observer after all content is injected
  observeFadeUp();
}

init();
