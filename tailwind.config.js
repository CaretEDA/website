/** @type {import('tailwindcss').Config} */
// Design tokens (unslop redesign, light): one "ink" neutral ramp, cool and very low
// saturation (tapeout bench under daylight), three text roles, one accent (CaretEDA blue).
// "night" is the dark instrument panel used for the hero flow plate only.
// Mirrored as CSS vars in styles.css.
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
                page: '#f6f7f9',
                deep: '#eceef2',    // alternate band, input affixes
                card: '#ffffff',
                raised: '#f0f2f5',  // hover / active surface
                line: 'rgb(17 24 39 / 0.08)',
                'line-strong': 'rgb(17 24 39 / 0.16)',
                ink: {
                    DEFAULT: '#111827', // primary text
                    2: '#4b5565',       // secondary text
                    3: '#5d6577',       // muted text, meta, icons (5.8:1 on white, 5.0:1 on the press band)
                },
                accent: {
                    DEFAULT: '#2563eb', // brand blue: primary action fill (white text 5.2:1)
                    hover: '#1d4ed8',
                    ink: '#1d4ed8',     // brand blue as text on light surfaces (6.7:1)
                    soft: '#e8efff',    // selected / hover tint
                },
                night: {
                    DEFAULT: '#0b0d14', // hero instrument panel
                    card: '#11141c',
                },
                positive: '#16a34a',
                negative: '#dc2626',
            },
        },
    },
    plugins: [],
}
