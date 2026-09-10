(function () {
  /* Principles */
  const buttons = [...document.querySelectorAll("[data-principle]")];
  const panelTitle = document.querySelector("[data-principle-title]");
  const panelBody = document.querySelector("[data-principle-body]");
  const panelMeta = document.querySelector("[data-principle-meta]");
  const texts = {
    "01": {
      body: "Before building a model, I want to understand the question behind the question.",
    },
    "02": {
      body: "Sometimes the most interesting solution comes from connecting ideas that don’t seem related at first.",
    },
    "03": {
      body: "Complexity is not always intelligence. I like finding the structure underneath it.",
    },
    "04": {
      body: "An analysis becomes valuable when it helps someone see something differently.",
    },
  };

  function setPrinciple(id) {
    buttons.forEach((b) => b.classList.toggle("is-active", b.dataset.principle === id));
    const t = texts[id];
    if (!t) return;
    if (panelTitle) panelTitle.textContent = `principle ${id}`;
    if (panelBody) panelBody.textContent = t.body;
    if (panelMeta) panelMeta.textContent = `[${Number(id)}/4]`;
  }

  buttons.forEach((b) => {
    b.addEventListener("mouseenter", () => setPrinciple(b.dataset.principle));
    b.addEventListener("focus", () => setPrinciple(b.dataset.principle));
    b.addEventListener("click", () => setPrinciple(b.dataset.principle));
  });
  if (buttons[0]) setPrinciple(buttons[0].dataset.principle);

  /* Hero canvas */
  const canvas = document.getElementById("thinking-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const points = [];
  let t = 0;
  let raf = 0;

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!points.length) {
      for (let i = 0; i < 28; i++) {
        points.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 1.2 + Math.random() * 2.2,
        });
      }
    }
  }

  function drawCurve(w, h, phase, amp, y0, color, width) {
    ctx.beginPath();
    for (let x = 0; x <= w; x += 4) {
      const y =
        y0 +
        Math.sin(x * 0.012 + phase) * amp +
        Math.sin(x * 0.004 + phase * 0.6) * (amp * 0.35);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  function draw() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    for (let x = 40; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 40; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    drawCurve(w, h, t * 0.35, 28, h * 0.42, "rgba(255,255,255,0.18)", 1.3);
    drawCurve(w, h, t * 0.28 + 1.2, 18, h * 0.55, "rgba(232,90,27,0.45)", 1.1);

    const x0 = w * 0.12;
    const y0 = h * 0.72;
    const x1 = w * 0.88;
    const y1 = h * 0.38;
    ctx.beginPath();
    for (let i = 0; i <= 1.001; i += 0.02) {
      const x = x0 + (x1 - x0) * i;
      const lift = Math.sin(i * Math.PI) * (70 + Math.sin(t * 0.45) * 8);
      const y = y0 + (y1 - y0) * i - lift;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.setLineDash([3, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
    const p = (Math.sin(t * 0.3) + 1) / 2;
    const bx = x0 + (x1 - x0) * p;
    const lift = Math.sin(p * Math.PI) * (70 + Math.sin(t * 0.45) * 8);
    const by = y0 + (y1 - y0) * p - lift;
    ctx.beginPath();
    ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#e85a1b";
    ctx.fill();

    const cx = w * 0.72;
    const cy = h * 0.62;
    ctx.beginPath();
    for (let i = -60; i <= 60; i++) {
      const x = cx + i * 2.1;
      const z = i / 18;
      const y = cy - Math.exp(-0.5 * z * z) * 42;
      if (i === -60) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "rgba(232,90,27,0.55)";
    ctx.lineWidth = 1.4;
    ctx.stroke();

    for (const pt of points) {
      if (!reduce) {
        pt.x += pt.vx;
        pt.y += pt.vy;
        if (pt.x < 0 || pt.x > w) pt.vx *= -1;
        if (pt.y < 0 || pt.y > h) pt.vy *= -1;
      }
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.fill();
    }

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i];
        const b = points[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 90) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(232,90,27,${0.2 * (1 - d / 90)})`;
          ctx.stroke();
        }
      }
    }

    if (!reduce) {
      t += 0.016;
      raf = requestAnimationFrame(draw);
    }
  }

  resize();
  draw();
  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    resize();
    draw();
  });
})();
