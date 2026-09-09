/* Portfolio UI — premium Data Scientist site */

(function () {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error("PORTFOLIO_DATA missing. Run generate_portfolio_data.py first.");
    return;
  }

  const {
    profile,
    skills,
    projects,
    experience,
    education,
    certifications,
    kpis,
    heroMetrics,
    capabilities,
    meta,
  } = data;

  const ICONS = {
    forecasting:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 15l3-4 3 2 5-7"/></svg>',
    mmm: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="10" width="4" height="10"/><rect x="10" y="6" width="4" height="14"/><rect x="17" y="3" width="4" height="17"/></svg>',
    ml: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><circle cx="18" cy="12" r="2"/><path d="M8 12h2M12 8v2M12 14v2M14 12h2"/></svg>',
    streaming:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    bi: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5h4v14H4zM10 19V9h4v10h-4zM16 19v-7h4v7h-4z"/></svg>',
    segment:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="10" r="3"/><circle cx="16" cy="8" r="2.5"/><circle cx="15" cy="16" r="2.8"/><path d="M3 19c1.2-2.2 3-3.3 5-3.3S11.8 16.8 13 19"/></svg>',
    marketing:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h10l6-5v10l-6-5H4z"/></svg>',
    crossmedia:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>',
    sports:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3c2.2 2.5 3.5 5.6 3.5 9S14.2 18.5 12 21M12 3C9.8 5.5 8.5 8.6 8.5 12S9.8 18.5 12 21M3.5 9.5h17M3.5 14.5h17"/></svg>',
  };

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k === "text") node.textContent = v;
      else if (k === "hidden" && v) node.hidden = true;
      else node.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach((child) => {
      if (child == null || child === false) return;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  document.querySelectorAll("[data-bind]").forEach((node) => {
    const key = node.getAttribute("data-bind");
    const value = key.split(".").reduce((acc, part) => (acc == null ? acc : acc[part]), data);
    if (value != null) node.textContent = value;
  });

  document.querySelectorAll("[data-href]").forEach((node) => {
    const key = node.getAttribute("data-href");
    const value = key.split(".").reduce((acc, part) => (acc == null ? acc : acc[part]), data);
    if (!value) {
      node.hidden = true;
      return;
    }
    if (key.endsWith("email")) node.setAttribute("href", "mailto:" + value);
    else node.setAttribute("href", value);
    node.hidden = false;
  });

  document.title = `${profile.full_name.replace(" Cecilia", "")} — ${profile.title}`;

  /* Hero BI metrics */
  const heroRoot = document.getElementById("hero-metrics");
  if (heroRoot && heroMetrics) {
    heroMetrics.forEach((m) => {
      heroRoot.appendChild(
        el("article", { class: "metric-tile reveal" }, [
          el("p", { class: "metric-label", text: m.label }),
          el("p", { class: "metric-sub", text: m.sublabel }),
          el("p", { class: `metric-value${m.positive ? " up" : ""}`, text: m.value }),
        ])
      );
    });
  }

  /* KPI strip */
  const kpiRoot = document.getElementById("kpi-grid");
  if (kpiRoot && kpis) {
    kpis.forEach((k) => {
      kpiRoot.appendChild(
        el("div", { class: "kpi-item reveal" }, [
          el("strong", { text: k.value }),
          el("span", { text: k.label }),
        ])
      );
    });
  }

  /* Case studies */
  const caseRoot = document.getElementById("case-grid");
  if (caseRoot && projects) {
    projects.forEach((p) => {
      const result = Array.isArray(p.impact) ? p.impact[0] : p.result || "";
      caseRoot.appendChild(
        el("article", { class: "case-card reveal", id: p.id }, [
          el("div", { class: "case-meta" }, [
            el("span", { class: "case-year", text: String(p.year) }),
            el("span", { class: "badge", text: p.company || "Case study" }),
          ]),
          el("h3", { text: p.title }),
          el("p", { class: "case-problem", html: `<strong>Problem.</strong> ${escapeHtml(p.problem)}` }),
          el("div", { class: "case-result" }, [
            el("span", { text: "Result" }),
            document.createTextNode(result),
          ]),
          el(
            "div",
            { class: "case-tags" },
            (p.stack || []).slice(0, 4).map((t) => el("span", { class: "badge", text: t }))
          ),
          el("a", {
            class: "btn-link",
            href: p.page || (window.CASE_STUDY_MAP && window.CASE_STUDY_MAP[p.id]) || `#${p.id}`,
            text: "Read Case Study →",
          }),
        ])
      );
    });
  }

  /* What I Do */
  const capRoot = document.getElementById("capability-grid");
  if (capRoot && capabilities) {
    capabilities.forEach((c) => {
      capRoot.appendChild(
        el("article", { class: "cap-card reveal" }, [
          el("div", { class: "cap-icon", html: ICONS[c.icon] || ICONS.bi }),
          el("h3", { text: c.title }),
        ])
      );
    });
  }

  /* Experience timeline */
  const expRoot = document.getElementById("experience-timeline");
  if (expRoot && experience) {
    experience.forEach((job) => {
      const initials = (job.logo || job.company || "?")
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      expRoot.appendChild(
        el("li", { class: "timeline-item reveal" }, [
          el("article", { class: "timeline-card" }, [
            el("div", { class: "timeline-top" }, [
              el("div", { class: "logo-mark", text: initials, "aria-hidden": "true" }),
              el("div", {}, [
                el("h3", { text: job.company }),
                el("p", { class: "timeline-role", text: job.role }),
                el(
                  "p",
                  {
                    class: "timeline-period",
                    text: [job.period, job.location].filter(Boolean).join(" · "),
                  }
                ),
              ]),
            ]),
            el(
              "ul",
              {},
              (job.highlights || []).slice(0, 3).map((h) => el("li", { text: h }))
            ),
            el(
              "div",
              { class: "case-tags" },
              (job.stack || []).map((t) => el("span", { class: "badge", text: t }))
            ),
          ]),
        ])
      );
    });
  }

  /* Research / education */
  const eduRoot = document.getElementById("education-list");
  if (eduRoot && education) {
    education.forEach((ed) => {
      eduRoot.appendChild(
        el("article", { class: "research-card reveal" }, [
          el("span", { class: "year", text: ed.year }),
          el("h3", { text: ed.school }),
          el("p", { class: "degree", text: ed.degree }),
          el("p", { text: ed.detail }),
        ])
      );
    });
  }

  const certRoot = document.getElementById("certifications-list");
  if (certRoot && certifications) {
    certifications.forEach((c) => {
      certRoot.appendChild(
        el("div", { class: "cert-item reveal" }, [
          el("strong", { text: c.name }),
          el("span", { text: c.issuer }),
        ])
      );
    });
  }

  /* Skills badges */
  const skillsRoot = document.getElementById("skills-groups");
  if (skillsRoot && skills) {
    skills.forEach((group) => {
      skillsRoot.appendChild(
        el("div", { class: "skill-group reveal" }, [
          el("h3", { text: group.group }),
          el(
            "div",
            { class: "skill-badges" },
            group.items.map((item) => el("span", { class: "badge", text: item }))
          ),
        ])
      );
    });
  }

  const note = document.getElementById("data-note");
  if (note && meta) {
    note.textContent = meta.note || "";
  }

  /* Reveal on scroll */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((node) => io.observe(node));

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
