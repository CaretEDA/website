/**
 * Cursor effects on the site grounds. Mouse/trackpad only ((hover: hover) and (pointer: fine)).
 *
 * 1. Dot lens (whole page, one fixed canvas just above body::before, below all content):
 *    - in the side margins, where the dot ground already shows, dots near the pointer swell, brighten to
 *      the accent and are pushed gently outward;
 *    - in the middle, where the resting dots are very faint (--dots-rest), the same lens brings them up
 *      around the pointer.
 *    Text stays readable: lens dots fade out around every run of visible text (the line boxes of its text
 *    nodes, whatever element holds them: links, buttons, bold numerals, table cells...) and inline icons,
 *    so nothing bright ever sits behind words; there the faint resting dots show as they do everywhere.
 *    Sections with their own background (white bands, cards, the hero) cover it, as they cover the dots.
 *    It reads the drift's own CSS animation clock, so lens dots stay locked to the drifting grid.
 *
 * 2. Hero circuit (canvas inside section.hero, above the hero's faint circuit, below its content):
 *    the same 240px PCB tile as .hero::before, revealed around the pointer and clearly brighter than it,
 *    with glowing pulses flowing along the traces. It is erased around the hero's text (same line boxes
 *    and clearance as the dot lens), so traces never run behind the headline or intro.
 *
 * Neither runs over the navbar or while a modal dialog is open.
 * Reduced motion: no push, no trailing, no flowing pulses; the reveal and brightening stay.
 * Loops run only while an effect is visible: they fade out and stop when the pointer leaves the page,
 * the tab is hidden, or the pointer has rested for IDLE_MS; the next move brings them back.
 */
const STEP = 24;          // dot grid pitch (background-size in styles.css)
const ORIGIN = 1.5;       // dot centre inside each cell (radial-gradient "at 1.5px 1.5px")
const BASE_R = 1.25;      // resting dot radius
const RADIUS = 140;       // dot lens radius, px
const PEAK = 0.6;         // dot lens strength at the cursor (0..1)
const SWELL = 1;          // extra radius at the lens centre, px
const PUSH = 5;           // max outward push, px
const COVER_IN = 0.3;     // resting dots are fully covered from this far inside the rim (fraction of RADIUS)
const FOLLOW = 18;        // lens follow rate (1/s): slight trail, never laggy
const FADE = 9;           // fade in/out rate (1/s), about 250ms
const IDLE_MS = 2000;     // pointer at rest this long: fade out and stop the loop
const DRIFT_MS = 6000;    // dots-drift duration
const TEXT_CLEAR = 8;     // lens dots are fully hidden this close to text, px
const TEXT_FEATHER = 14;  // ...and back to full strength this much further out
const TEXT_FAR = TEXT_CLEAR + TEXT_FEATHER;
const REST_RIM = 0.35;    // lens dot alpha that matches a resting margin dot (--dots-hot vs --dots)
const LINES_MS = 500;     // text boxes are re-read at most this often while an effect is up
// Inline graphics that read as part of a line of text (link arrows, logo marks), and hairline rules.
const ICON_SEL = 'a svg, a img, button svg, .back-link .arrow-back, hr';
// Never collect text from here: fixed chrome (wrong after scroll, and opaque anyway) and our canvases.
const SKIP_SEL = 'app-navbar, script, style, noscript, canvas, template';
// Block containers whose subtree can be skipped when they are entirely off-screen.
const BLOCK_SEL = 'section, article, header, footer, figure, pre, table, ul, ol, div, p';

const TILE = 240;         // .hero::before background-size
const CIRCUIT_R = 220;    // hero reveal radius, px
const PULSE_SPEED = 70;   // px/s along the traces
const CIRCUIT_PEAK = 1;   // hero circuit strength at the cursor (0..1); kept well above the still .hero::before
                          // circuit so the reveal clearly reads as the cursor's
const TRACES = [
  'M0 48H64L88 72H152L176 48H240',
  'M0 168H32L56 192H120L144 168H240',
  'M200 0V20L184 36V100L200 116V240',
  'M40 0V100L56 116H96',
  'M40 240V224',
  'M120 192V140L136 124',
];
const PADS: [number, number, number][] = [[96, 116, 3], [40, 224, 3], [184, 48, 3], [136, 124, 3], [152, 72, 2.5]];

const ease = (k: number, dt: number) => 1 - Math.exp(-k * dt);
type Box = { l: number; t: number; r: number; b: number };   // document coordinates

export function initCursorDots(): () => void {
  // jsdom (unit tests) and old browsers lack these; the effect is decoration, so just skip it.
  if (typeof window.matchMedia !== 'function' || typeof ResizeObserver === 'undefined'
      || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;

  let page = '', hot = '', glow = '', rest = 0;
  const readColors = () => {
    const s = getComputedStyle(root);
    page = s.getPropertyValue('--page').trim();
    hot = s.getPropertyValue('--dots-hot').trim();
    glow = s.getPropertyValue('--dots-glow').trim();
    rest = parseFloat(s.getPropertyValue('--dots-rest')) || 0;
  };
  readColors();
  // theme switches (data-theme) and modals (class "dialog-open" from the startup application form)
  const rootObserver = new MutationObserver(() => { readColors(); tile = null; retarget(); });
  rootObserver.observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] });

  /* ---------- dot lens ---------- */
  const canvas = document.createElement('canvas');
  canvas.className = 'cursor-dots';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  // Sized from the canvas's own box, not innerWidth: a classic scrollbar (Windows) narrows the box, and a
  // bitmap sized to innerWidth would be squeezed into it, putting lens dots beside the real ones.
  let w = 0, h = 0, dpr = 1;
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth || root.clientWidth; h = canvas.clientHeight || root.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dirty = null;
    linesStale = true;
    sizeHero();
  };
  const canvasResize = new ResizeObserver(resize);   // also fires when the scrollbar comes or goes
  // devicePixelRatio changes (zoom, moving to another monitor) without any box resize
  let dprQuery: MediaQueryList | null = null;
  const onDprChange = () => { resize(); watchDpr(); };
  const watchDpr = () => {
    dprQuery?.removeEventListener('change', onDprChange);
    dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    dprQuery.addEventListener('change', onDprChange);
  };

  // How strongly the resting dots show at x: the body::before mask (solid to 60% of the margin,
  // fading to --dots-rest 40px past the content edge). w is the same box the CSS mask's 100% uses.
  const groundMask = (x: number) => {
    const gutter = Math.max(24, (w - 1200) / 2);
    const solid = gutter * 0.6, end = gutter + 40;
    const e = Math.min(x, w - x);
    const edge = e <= solid ? 1 : e >= end ? 0 : 1 - (e - solid) / (end - solid);
    return rest + (1 - rest) * edge;
  };

  // Boxes of on-screen text (line boxes of every non-blank text node) and inline icons, kept in DOCUMENT
  // coordinates so scrolling never forces a re-read; re-read after DOM changes, resizes, and at most every
  // LINES_MS while an effect is up (entrance animations move text).
  let lines: Box[] = [];
  let linesAt = -1e9, linesStale = true;
  const range = document.createRange();
  const push = (r: DOMRect, sx: number, sy: number) => {
    if (r.width > 1 && r.height > 0.5) lines.push({ l: r.left + sx, t: r.top + sy, r: r.right + sx, b: r.bottom + sy });
  };
  const offscreen = (r: DOMRect) => r.width > 0 && r.height > 0 && (r.bottom < -TEXT_FAR || r.top > h + TEXT_FAR);
  const readLines = (now: number) => {
    if (!linesStale && now - linesAt < LINES_MS) return;
    linesStale = false; linesAt = now;
    lines = [];
    const sx = window.scrollX, sy = window.scrollY;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (n.nodeType === Node.TEXT_NODE) return n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        const el = n as Element;
        if (el.matches(SKIP_SEL)) return NodeFilter.FILTER_REJECT;
        if (el.matches(BLOCK_SEL) && offscreen(el.getBoundingClientRect())) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_SKIP;   // not collected itself, but look inside
      },
    });
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      range.selectNodeContents(n);
      for (const r of range.getClientRects()) if (!offscreen(r)) push(r, sx, sy);
    }
    for (const el of document.querySelectorAll(ICON_SEL)) {
      if (el.closest(SKIP_SEL)) continue;
      const r = el.getBoundingClientRect();
      if (!offscreen(r)) push(r, sx, sy);
    }
  };
  let domChanged = false;
  const domObserver = new MutationObserver(() => { linesStale = true; domChanged = true; });
  domObserver.observe(document.body, { childList: true, subtree: true, characterData: true });

  // 0 on or near text, 1 clear of it. `near` holds the boxes around the lens, in viewport coordinates.
  let near: Box[] = [];
  const textClearance = (px: number, py: number, slack: number) => {
    let c = 1;
    const far = TEXT_FAR + slack;
    for (const r of near) {
      const dx = Math.max(r.l - px, 0, px - r.r);
      if (dx >= far) continue;
      const dy = Math.max(r.t - py, 0, py - r.b);
      if (dy >= far) continue;
      const k = (Math.hypot(dx, dy) - TEXT_CLEAR - slack) / TEXT_FEATHER;
      if (k <= 0) return 0;
      if (k < c) c = k;
    }
    return c;
  };

  // The drift's animation object, looked up once (and again after DOM changes) rather than every frame.
  let drift: Animation | null | undefined;
  const driftOffset = () => {
    if (drift === undefined) drift = document.getAnimations?.().find(a => (a as CSSAnimation).animationName === 'dots-drift') ?? null;
    const t = Number(drift?.currentTime ?? 0);
    return -((t % DRIFT_MS) / DRIFT_MS) * STEP;
  };

  let tx = -1e4, ty = -1e4;   // pointer (viewport)
  let x = tx, y = ty;         // lens position (follows the pointer)
  let inside = false;         // pointer is over the page
  let lastMove = 0;
  let on = 0, onTarget = 0;   // dot lens strength 0..1
  let hOn = 0, hTarget = 0;   // hero circuit strength 0..1
  let last = 0, raf = 0;
  let needTarget = false;     // re-check what is under the pointer on the next frame
  let underPointer: Element | null = null;   // element under the pointer (from pointermove, or hit-tested)
  let dirty: [number, number, number, number] | null = null;
  const lens: number[] = [];  // per frame: x, y, radius, alpha of each lens dot (reused)

  const drawDots = (sx: number, sy: number) => {
    if (dirty) ctx.clearRect(...dirty);
    dirty = null;
    if (on < 0.005) return;

    const pad = RADIUS + PUSH + 4;
    dirty = [x - pad, y - pad, pad * 2, pad * 2];
    const still = reduce.matches;

    near = [];
    const vl = x - pad - TEXT_FAR + sx, vr = x + pad + TEXT_FAR + sx, vt = y - pad - TEXT_FAR + sy, vb = y + pad + TEXT_FAR + sy;
    for (const r of lines) if (r.r > vl && r.l < vr && r.b > vt && r.t < vb) near.push({ l: r.l - sx, t: r.t - sy, r: r.r - sx, b: r.b - sy });

    // pass 1: cover the resting dots inside the lens (full strength from COVER_IN inside the rim, so a
    // pushed dot never reveals the one it left), collecting the lens dots to draw on top
    lens.length = 0;
    ctx.fillStyle = page;
    const off = driftOffset();
    const i0 = Math.floor((x - RADIUS - ORIGIN) / STEP), i1 = Math.ceil((x + RADIUS - ORIGIN) / STEP);
    const j0 = Math.floor((y - RADIUS - ORIGIN - off) / STEP), j1 = Math.ceil((y + RADIUS - ORIGIN - off) / STEP);
    for (let i = i0; i <= i1; i++) {
      const cx = i * STEP + ORIGIN;
      const m = groundMask(cx);
      for (let j = j0; j <= j1; j++) {
        const cy = j * STEP + ORIGIN + off;
        const dx = cx - x, dy = cy - y;
        const d = Math.hypot(dx, dy);
        if (d >= RADIUS) continue;
        const u = 1 - d / RADIUS;
        const f = u * u * (3 - 2 * u) * on;                              // smoothstep falloff
        const shift = still || d < 0.01 ? 0 : PUSH * f * (1 - u) * 2;   // strongest mid-lens
        // near text, leave the resting dot alone (no cover, no lens dot); the slack covers the push
        const c = near.length ? textClearance(cx, cy, shift) : 1;
        if (c <= 0) continue;
        const cover = Math.min(1, u / COVER_IN) * on;
        ctx.globalAlpha = cover * c;
        ctx.beginPath(); ctx.arc(cx, cy, BASE_R + 0.75, 0, Math.PI * 2); ctx.fill();
        // rim: cover + lens dot add back up to exactly the resting dot, so no ring shows
        const restA = REST_RIM * m;
        lens.push(cx + (dx / (d || 1)) * shift, cy + (dy / (d || 1)) * shift, BASE_R + SWELL * f,
                  (restA * cover + Math.max(0, PEAK - restA) * f) * c);
      }
    }

    // pass 2: the glow, over the covers too, so they take the same tint as the ground around them
    const g = ctx.createRadialGradient(x, y, 0, x, y, RADIUS);
    g.addColorStop(0, glow);
    g.addColorStop(1, 'transparent');
    ctx.globalAlpha = on;
    ctx.fillStyle = g;
    ctx.fillRect(x - RADIUS, y - RADIUS, RADIUS * 2, RADIUS * 2);

    // pass 3: the lens dots
    ctx.fillStyle = hot;
    for (let k = 0; k < lens.length; k += 4) {
      ctx.globalAlpha = lens[k + 3];
      ctx.beginPath(); ctx.arc(lens[k], lens[k + 1], lens[k + 2], 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  /* ---------- hero circuit ---------- */
  // Cost notes: the static traces and pads are drawn once into a tile and filled as a pattern; only the
  // pulses are stroked per frame, with a two-stroke glow instead of shadowBlur (a blur per stroke was the
  // most expensive part). Each frame touches only the reveal's HS-px square. (A reveal-sized canvas moved
  // by a transform was tried: cheaper without GPU raster, but its per-frame style work cost more on GPUs.)
  const HS = 2 * (CIRCUIT_R + 4);           // reveal square, CSS px
  const traces = TRACES.map(d => new Path2D(d));
  const lengths = TRACES.map(d => {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    return p.getTotalLength();
  });
  const hCanvas = document.createElement('canvas');
  hCanvas.className = 'hero-circuit';
  hCanvas.setAttribute('aria-hidden', 'true');
  const hctx = hCanvas.getContext('2d')!;
  let hero: HTMLElement | null = null;
  let hDpr = 1, hx = 0, hy = 0;
  let heroDocL = 0, heroDocT = 0;          // hero's top-left in document coordinates (cached, no per-frame layout)
  let hDrawn = false;                       // something is on the canvas
  let hOx = 0, hOy = 0;                     // top-left of the last drawn square, hero coords
  let tile: CanvasPattern | null = null;    // static traces + pads, rebuilt on theme or DPR change
  let heroLines: Box[] = [], heroLinesFrom: Box[] | null = null;   // text boxes inside the hero, hero coords
  const heroResize = new ResizeObserver(() => sizeHero());

  const clearHero = () => {
    if (!hDrawn) return;
    hctx.setTransform(hDpr, 0, 0, hDpr, 0, 0);
    hctx.clearRect(hOx - 1, hOy - 1, HS + 2, HS + 2);
    hDrawn = false;
  };

  function sizeHero() {
    if (!hero) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (dpr !== hDpr) { hDpr = dpr; tile = null; }
    const b = hero.getBoundingClientRect();
    heroDocL = b.left + window.scrollX; heroDocT = b.top + window.scrollY;
    const pw = Math.round(hero.clientWidth * hDpr), ph = Math.round(hero.clientHeight * hDpr);
    if (hCanvas.width !== pw || hCanvas.height !== ph) { hCanvas.width = pw; hCanvas.height = ph; hDrawn = false; }
    heroLinesFrom = null;
  }

  const buildTile = () => {
    const c = document.createElement('canvas');
    c.width = c.height = Math.round(TILE * hDpr);
    const t = c.getContext('2d')!;
    t.scale(hDpr, hDpr);
    t.lineCap = 'round'; t.lineJoin = 'round';
    t.strokeStyle = hot;
    // traces: brighter and a touch heavier than the still circuit underneath
    t.globalAlpha = 0.85 * CIRCUIT_PEAK;
    t.lineWidth = 1.6;
    for (const p of traces) t.stroke(p);
    // pads: page-filled rings, like drilled holes
    for (const [px, py, pr] of PADS) {
      t.beginPath(); t.arc(px, py, pr + 0.75, 0, Math.PI * 2);
      t.fillStyle = page; t.globalAlpha = 1; t.fill();
      t.globalAlpha = CIRCUIT_PEAK; t.stroke();
    }
    tile = hctx.createPattern(c, 'repeat');
    tile?.setTransform(new DOMMatrix().scaleSelf(1 / hDpr));
  };

  // The hero exists only on the home route, so (re)attach whenever it appears, changes, or goes away.
  const findHero = () => {
    const el = document.querySelector<HTMLElement>('section.hero');
    if (el === hero && (!el || el.isConnected)) return;
    if (hero) heroResize.unobserve(hero);
    hero = el && el.isConnected ? el : null;
    hOn = 0; clearHero();
    if (hero) { hero.appendChild(hCanvas); heroResize.observe(hero); sizeHero(); }
    else hCanvas.remove();
  };

  const drawCircuit = (now: number) => {
    clearHero();
    if (hOn < 0.005 || !hero) return;
    if (!tile) buildTile();

    // the square around the lens, on whole pixels; everything is drawn in hero coordinates
    const ox = Math.round(hx) - HS / 2, oy = Math.round(hy) - HS / 2;
    hOx = ox; hOy = oy; hDrawn = true;
    hctx.save();
    hctx.setTransform(hDpr, 0, 0, hDpr, 0, 0);
    hctx.beginPath(); hctx.rect(ox, oy, HS, HS); hctx.clip();
    const r = CIRCUIT_R;

    // traces + pads: one pattern fill (pattern space is hero space, so tiles line up with .hero::before)
    hctx.globalAlpha = 1;
    hctx.fillStyle = tile!;
    hctx.fillRect(ox, oy, HS, HS);

    // signal pulses: short dashes along each trace, a wide faint stroke under a narrow bright one
    if (!reduce.matches) {
      const flow = (now / 1000) * PULSE_SPEED;
      hctx.strokeStyle = hot;
      hctx.lineCap = 'round'; hctx.lineJoin = 'round';
      for (let tx0 = Math.floor((hx - r) / TILE) * TILE; tx0 < hx + r; tx0 += TILE) {
        for (let ty0 = Math.floor((hy - r) / TILE) * TILE; ty0 < hy + r; ty0 += TILE) {
          hctx.setTransform(hDpr, 0, 0, hDpr, tx0 * hDpr, ty0 * hDpr);
          traces.forEach((t, k) => {
            const len = lengths[k];
            hctx.setLineDash([12, Math.max(60, len / 2)]);
            hctx.lineDashOffset = -((flow + k * 37 + (tx0 + ty0) * 0.3) % (len + 70));
            hctx.globalAlpha = 0.28 * CIRCUIT_PEAK; hctx.lineWidth = 6; hctx.stroke(t);
            hctx.globalAlpha = CIRCUIT_PEAK; hctx.lineWidth = 2.5; hctx.stroke(t);
          });
        }
      }
      hctx.setLineDash([]);
      hctx.setTransform(hDpr, 0, 0, hDpr, 0, 0);
    }

    // fade the whole drawing out from the pointer
    hctx.globalCompositeOperation = 'destination-in';
    const g = hctx.createRadialGradient(hx, hy, 0, hx, hy, r);
    g.addColorStop(0, `rgb(0 0 0 / ${hOn})`);
    g.addColorStop(0.45, `rgb(0 0 0 / ${hOn * 0.7})`);
    g.addColorStop(1, 'rgb(0 0 0 / 0)');
    hctx.globalAlpha = 1;
    hctx.fillStyle = g;
    hctx.fillRect(ox, oy, HS, HS);

    // keep the circuit out from behind the hero text: erase each text box, solid within TEXT_CLEAR and
    // feathered over TEXT_FEATHER (stacked rings, so no canvas filter is needed). The hero's boxes are
    // picked out of `lines` once per re-read, not every frame.
    if (heroLinesFrom !== lines) {
      heroLinesFrom = lines;
      const hw = hero.clientWidth, hh = hero.clientHeight;
      heroLines = [];
      for (const l of lines) {
        const b: Box = { l: l.l - heroDocL, t: l.t - heroDocT, r: l.r - heroDocL, b: l.b - heroDocT };
        if (b.r > -TEXT_FAR && b.l < hw + TEXT_FAR && b.b > -TEXT_FAR && b.t < hh + TEXT_FAR) heroLines.push(b);
      }
    }
    hctx.globalCompositeOperation = 'destination-out';
    hctx.fillStyle = '#000';
    for (const l of heroLines) {
      if (l.r + TEXT_FAR < ox || l.l - TEXT_FAR > ox + HS || l.b + TEXT_FAR < oy || l.t - TEXT_FAR > oy + HS) continue;
      for (let k = 3; k >= 0; k--) {
        const p = TEXT_CLEAR + (TEXT_FEATHER * k) / 3;
        hctx.globalAlpha = k === 0 ? 1 : 0.4;
        hctx.fillRect(l.l - p, l.t - p, l.r - l.l + p * 2, l.b - l.t + p * 2);
      }
    }
    hctx.restore();
  };

  /* ---------- targets: which effect, if any, the pointer should drive ---------- */
  const modalOpen = () => {
    if (root.classList.contains('dialog-open')) return true;
    try { return !!document.querySelector('dialog:modal'); } catch { return !!document.querySelector('dialog[open]'); }
  };
  const pickTargets = (now: number) => {
    needTarget = false;
    if (!inside || document.hidden || modalOpen() || now - lastMove > IDLE_MS) { onTarget = hTarget = 0; return; }
    // What is under the pointer. A pointermove already says (its target; the canvases are
    // pointer-events: none), so hit-testing is only needed when content moved under a still pointer
    // (scroll, DOM change): elementFromPoint every frame was the effect's biggest script cost.
    const top = underPointer && underPointer.isConnected ? underPointer : document.elementFromPoint(tx, ty);
    underPointer = top;
    if (!top || top.closest('app-navbar, dialog')) { onTarget = hTarget = 0; return; }
    const inHero = !!hero && hero.contains(top);
    // the hero covers the dot ground, so only one effect runs at a time
    hTarget = inHero ? 1 : 0;
    onTarget = inHero ? 0 : 1;
  };

  /* ---------- loop ---------- */
  const frame = (now: number) => {
    const dt = Math.min((now - (last || now)) / 1000, 0.05);
    last = now;
    if (domChanged) { domChanged = false; drift = undefined; findHero(); needTarget = true; }
    if (needTarget || now - lastMove > IDLE_MS) pickTargets(now);

    if (reduce.matches) { x = tx; y = ty; }
    else { const k = ease(FOLLOW, dt); x += (tx - x) * k; y += (ty - y) * k; }
    on += (onTarget - on) * ease(FADE, dt);
    hOn += (hTarget - hOn) * ease(FADE, dt);

    const sx = window.scrollX, sy = window.scrollY;
    if (hero) { hx = x + sx - heroDocL; hy = y + sy - heroDocT; }
    if (on > 0.005 || onTarget || hOn > 0.005 || hTarget) readLines(now);
    drawDots(sx, sy);
    drawCircuit(now);

    if (on < 0.005 && onTarget === 0 && hOn < 0.005 && hTarget === 0) {
      on = hOn = 0;
      if (dirty) { ctx.clearRect(...dirty); dirty = null; }
      clearHero();
      raf = 0; last = 0;
      return;
    }
    raf = requestAnimationFrame(frame);
  };
  const wake = () => { if (!raf) raf = requestAnimationFrame(frame); };
  function retarget() { needTarget = true; if (inside) wake(); }

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    if (on === 0 && hOn === 0 && onTarget === 0 && hTarget === 0) { x = e.clientX; y = e.clientY; } // appear in place
    tx = e.clientX; ty = e.clientY;
    inside = true; lastMove = performance.now();
    const t = e.target instanceof Element ? e.target : null;
    if (t !== underPointer) { underPointer = t; retarget(); }
    else if (!raf || (onTarget === 0 && hTarget === 0)) retarget();   // idle or faded: wake up
  };
  // Scrolling moves content under a still pointer: hit-test again (batched into the next frame).
  const onScroll = () => { if (inside) { lastMove = performance.now(); underPointer = null; retarget(); } };
  const onLeave = () => { inside = false; onTarget = hTarget = 0; };
  const onVisibility = () => { if (document.hidden) onTarget = hTarget = 0; };

  resize();
  canvasResize.observe(canvas);
  watchDpr();
  findHero();
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  root.addEventListener('pointerleave', onLeave);
  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('scroll', onScroll);
    root.removeEventListener('pointerleave', onLeave);
    document.removeEventListener('visibilitychange', onVisibility);
    dprQuery?.removeEventListener('change', onDprChange);
    rootObserver.disconnect();
    domObserver.disconnect();
    canvasResize.disconnect();
    heroResize.disconnect();
    canvas.remove();
    hCanvas.remove();
  };
}
