/** @type {import('tailwindcss').Config} */
// Design tokens (unslop redesign): one "ink" neutral ramp, cool and very low saturation (tapeout bench),
// three text roles, one accent (CaretEDA blue). Every colour but "night" points at a CSS variable in
// styles.css, so the same class works in the light theme and the dark one (html[data-theme="dark"]).
// "night" is the dark instrument panel used for the hero flow plate only.
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            colors: {
                page: 'var(--page)',
                deep: 'var(--deep)',      // alternate band, input affixes
                card: 'var(--card)',
                raised: 'var(--raised)',  // hover / active surface
                line: 'var(--line)',
                'line-strong': 'var(--line-strong)',
                ink: {
                    DEFAULT: 'var(--ink)', // primary text
                    2: 'var(--ink-2)',     // secondary text
                    3: 'var(--ink-3)',     // muted text, meta, icons
                },
                accent: {
                    DEFAULT: 'var(--accent)', // brand blue: primary action fill
                    hover: 'var(--accent-hover)',
                    ink: 'var(--accent-ink)', // brand blue as text
                    soft: 'var(--accent-soft)', // selected / hover tint
                },
                night: {
                    DEFAULT: '#0b0d14', // hero instrument panel
                    card: '#11141c',
                },
                positive: 'var(--positive)',
                negative: 'var(--negative)',
            },
        },
    },
    plugins: [],
}
