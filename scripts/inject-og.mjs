// Post-build step: generate a real static HTML file per route with route-specific
// Open Graph / Twitter meta tags, so social crawlers (LinkedIn, etc.) can show a
// proper preview card for deep links on a static GitHub Pages SPA.
//
// Run AFTER `ng build` and BEFORE publishing dist to gh-pages.

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist', 'corporate-website', 'browser');
const BASE = 'https://careteda.com';
const DEFAULT_IMAGE = 'assets/careteda-logo-hd.png';

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

// Each entry generates dist/<path>/index.html with its own preview metadata.
const routes = [
  // Blog posts — each gets its own image + title (matches careteda.com behaviour)
  {
    path: 'blogs/verified-gates',
    title: 'From 160 Gates a Day to Verified Gates',
    desc: 'Gates per engineer-day never really measured gates — it measured verified gates, and agents that generate RTL for free are forcing the industry to say so plainly.',
    image: 'assets/blogs/verified-gates-hero.jpg',
  },
  {
    path: 'blogs/verilator-5-050',
    title: 'Unlimited. Full-Featured. Perfect for the Agentic Loop.',
    desc: 'How Verilator 5.050 closes the cost, functionality, and performance gaps at once — measured across sixteen public and UVM designs.',
    image: 'assets/blogs/verilator-5-050-hero.jpeg',
  },
  {
    path: 'blogs/2026-08-release',
    title: 'CaretEDA’s 2026.08 Release: From RTL to Physical Reality',
    desc: 'CaretEDA\'s second release brings OpenROAD into the Spec-to-Netlist™ platform, updates Verilator, and introduces new partnerships, bridging the gap from RTL generation to physical implementation.',
    image: 'assets/blogs/2026-08-release-hero.jpg',
  },
  {
    path: 'blogs/chip-design-over-mcp',
    title: 'Chip Design over MCP: Drive It from Claude, Codex, and Copilot',
    desc: 'Caret now exposes both its goal-driven hardware agents and its EDA tools through MCP, putting them inside your IDE and CI pipeline — turning AI from a side-window assistant into an engineering teammate.',
    image: 'assets/blogs/mcp-data-flow-og.jpg',
  },
  {
    path: 'blogs/dac2026-oss-blog',
    title: 'Open Source EDA Has Arrived. Now It Has a Partner You Can Call',
    desc: 'Why the open source EDA stack is ready for production chip design, and how CaretEDA is closing the adoption gap with commercial Service Level Agreements.',
    image: 'assets/blogs/dac2026-oss-hero.png',
  },
  {
    path: 'blogs/spec-bottleneck',
    title: 'The Spec Is the Bottleneck, Not the Silicon',
    desc: 'Why agentic chip design breaks when ambiguous specs are silently resolved, and why formalization has to sit before RTL generation.',
    image: 'assets/blogs/spec-bottleneck-hero.png',
  },
  {
    path: 'blogs/verilator',
    title: 'Verilator: The Open-Source Simulator Reshaping Chip Design',
    desc: 'How a tool born at Digital Equipment Corporation in 1994 ended up at the center of chip verification for Tesla, Google, AMD, and NVIDIA.',
    image: 'assets/blogs/verilator-image1.jpg',
  },
  {
    path: 'blogs/code-generation',
    title: 'Generating SystemVerilog Is Easy. Generating Hardware Is Not.',
    desc: 'LLMs can produce RTL that compiles and simulates — but hardware is a contract with physics, and physics does not accept plausible drafts.',
    image: 'assets/blogs/code-generation-perspective.jpg',
  },
  {
    path: 'blogs/silicon-imperative',
    title: 'The Silicon Imperative',
    desc: 'Rising chip design complexity, shrinking tapeout cycles, and why the $775B semiconductor market is making AI-driven design a strategic necessity.',
    image: 'assets/blogs/silicon-imperative.jpg',
  },
  // News detail (press release)
  {
    path: 'news/2026-08-release-neevsemi-partnership',
    title: 'CaretEDA Announces 2026.08 Release and NeevSemi Partnership',
    desc: 'New Spec-to-Netlist™ capabilities, OpenROAD availability in CaretEDA\'s open-source EDA stack, and a preferred partnership with NeevSemi.',
    image: DEFAULT_IMAGE,
  },
  {
    path: 'news/bit-mesra-award',
    title: 'CaretEDA Co-Founder and CEO Sashi Obilisetty Receives BIT Mesra Distinguished Alumna Award 2026',
    desc: 'Electronics and Communication Engineering alumna honored for contributions to engineering, technology and entrepreneurship at BIT Mesra’s 72nd Foundation Day.',
    image: DEFAULT_IMAGE,
  },
  {
    path: 'news/dac-2026',
    title: 'CaretEDA Announces Commercially Available End-to-End Opensource EDA Stack, and Launches Startup Program',
    desc: '2026.08 Release Delivers the Opensource EDA Stack Spanning Simulation, Logic Synthesis, Formal Verification, and Physical Synthesis; New Startup Program Opens CaretEDA’s Opensource EDA Stack and Agentic Modules to Early-Stage Chip Design Companies',
    image: DEFAULT_IMAGE,
  },
  {
    path: 'news/technical-advisors',
    title: 'CaretEDA Adds Two Semiconductor Veterans to Technical Advisory Board',
    desc: 'Nithya Raghavan and Sridhar Narayanan join as Technical Advisors, bringing deep EDA knowledge and extensive chip design expertise to CaretEDA’s agentic chip design platform.',
    image: DEFAULT_IMAGE,
  },
  // Section / landing pages — generic brand image, page-specific title & description
  { path: 'blogs',   title: 'Blog',    desc: 'Insights on AI-native chip design, EDA, and semiconductor engineering from the CaretEDA team.', image: DEFAULT_IMAGE },
  { path: 'news',    title: 'News',    desc: 'The latest announcements from CaretEDA.', image: DEFAULT_IMAGE },
  { path: 'about',   title: 'About CaretEDA', desc: 'CaretEDA automates chip design from natural-language specification to silicon-ready netlist with its AI-native Spec-to-Netlist™ platform.', image: DEFAULT_IMAGE },
  { path: 'team',    title: 'Team',    desc: 'Meet the team building CaretEDA’s AI-native chip design platform.', image: DEFAULT_IMAGE },
  { path: 'careers', title: 'Careers', desc: 'Join CaretEDA and help reshape how chips are designed with AI-native, agentic EDA.', image: DEFAULT_IMAGE },
  { path: 'ifaq',    title: 'IFAQ',    desc: 'Everything you need to know before, during, and after your Spec-to-Netlist™ evaluation.', image: DEFAULT_IMAGE },
  { path: 'startup-program', title: 'Startup Program Application', desc: 'Join the next generation of silicon innovators. Apply below to get access to CaretEDA\'s commercially supported open-source EDA stack and agentic modules.', image: DEFAULT_IMAGE },
];

const escapeAttr = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildHtml(tpl, { title, desc, url, image }) {
  const t = escapeAttr(title);
  const d = escapeAttr(desc);
  return tpl
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t} | CaretEDA</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`);
}

let count = 0;
for (const r of routes) {
  const url = `${BASE}/${r.path}`;
  const image = `${BASE}/${r.image}`;
  const html = buildHtml(template, { title: r.title, desc: r.desc, url, image });
  const dir = join(DIST, r.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  count++;
  console.log(`  og: /${r.path}`);
}
console.log(`Injected per-route Open Graph tags into ${count} pages.`);

// sitemap.xml for search engines (robots.txt in public/ points here).
// Real pages only: home, blog posts, news releases, job pages. Section shortcuts (/about, /blogs …)
// redirect to home anchors, so they would be duplicates.
const jobPages = ['careers/senior-hardware-engineer'];
const pages = ['', ...routes.map(r => r.path).filter(p => /^(blogs|news)\//.test(p)), ...jobPages];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${BASE}/${p}</loc></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
console.log(`Wrote sitemap.xml with ${pages.length} pages.`);
