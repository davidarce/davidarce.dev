/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				bg: 'var(--bg)',
				surface: 'var(--surface)',
				text: 'var(--text)',
				muted: 'var(--muted)',
				accent: 'var(--accent)',
			},
			fontFamily: {
				sans: ['Geist', 'system-ui', 'sans-serif'],
				mono: ['Geist Mono', 'ui-monospace', 'monospace'],
			},
		},
	},
	plugins: [],
}
