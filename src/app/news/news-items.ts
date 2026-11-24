/**
 * News, newest first. The homepage hero shows the first item; the News section lists them all.
 * `route` opens a press release on this site; `link` opens an outside page (shown with the LinkedIn mark).
 */
export interface NewsItem {
  date: string;
  title: string;
  summary: string;
  route?: string[];
  link?: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    date: 'September 8, 2026',
    title: 'CaretEDA Announces 2026.08 Release and NeevSemi Partnership',
    summary: "New Spec-to-Netlist™ capabilities, Verilator 5.050 and OpenROAD 26Q3 in CaretEDA's open-source EDA stack, and a preferred partnership with NeevSemi.",
    route: ['/news', '2026-08-release-neevsemi-partnership'],
  },
  {
    date: 'August 31, 2026',
    title: 'CaretEDA Co-Founder and CEO Sashi Obilisetty Receives BIT Mesra Distinguished Alumna Award 2026',
    summary: 'Electronics and Communication Engineering alumna honored for contributions to engineering, technology and entrepreneurship at BIT Mesra’s 72nd Foundation Day.',
    route: ['/news', 'bit-mesra-award'],
  },
  {
    date: 'July 24, 2026',
    title: 'CaretEDA Announces Commercially Available End-to-End Opensource EDA Stack, and Launches Startup Program',
    summary: '2026.08 Release Delivers the Opensource EDA Stack Spanning Simulation, Logic Synthesis, Formal Verification, and Physical Synthesis; New Startup Program Opens CaretEDA’s Opensource EDA Stack and Agentic Modules to Early-Stage Chip Design Companies.',
    route: ['/news', 'dac-2026'],
  },
  {
    date: 'June 22, 2026',
    title: 'CaretEDA Adds Two Semiconductor Veterans to Technical Advisory Board',
    summary: 'Nithya Raghavan and Sridhar Narayanan join as Technical Advisors, bringing deep EDA knowledge and extensive chip design expertise to CaretEDA’s agentic chip design platform.',
    route: ['/news', 'technical-advisors'],
  },
  {
    date: 'February 2026',
    title: 'Announcing the launch of CaretEDA',
    summary: 'Co-founder & CEO Sashi Obilisetty shares the vision behind CaretEDA — end-to-end, AI-first design systems that learn your flow, protect your IP, scale with your team, and continuously accelerate the path from idea to silicon.',
    link: 'https://www.linkedin.com/posts/sashi-obilisetty-009720_semiconductors-chipdesign-eda-share-7423916221449936896-aNY6/',
  },
];
