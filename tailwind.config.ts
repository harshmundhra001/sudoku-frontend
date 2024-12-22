import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: '#0096c7',
				prim: {
					dark: '#0077b6',
					light: '#00b4d8',
				},
				secondary: '#ff8500',
				sec: {
					dark: '#ff6d00',
					light: '#ff9e00',
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
