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
				primary: '#4F46E5',
				prim: {
					dark: '#3730A3',
					light: '#818CF8',
				},
				secondary: '#F59E0B',
				sec: {
					dark: '#D97706',
					light: '#FCD34D',
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
