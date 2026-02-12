import twColors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}'
	],
	important: true,
	theme: {
		colors: {
			white: twColors.white,
			black: twColors.black,
			transparent: twColors.transparent,
			background: 'var(--background)',
			foreground: 'var(--foreground)',
			backdrop: 'var(--backdrop)',
			primary: 'var(--primary)',
			gray: twColors.gray,
			warning: 'var(--warning)',
			danger: 'var(--danger)',
			success: 'var(--success)'
		},
		extend: {
			fontFamily: {
				montserrat: ['var(--font-montserrat)'],
				'montserrat-alternates': ['var(--font-montserrat-alternates)']
			},
			fontSize: {
				xs: ['var(--text-size-xs)', 'var(--text-height-xs)'],
				sm: ['var(--text-size-sm)', 'var(--text-height-sm)'],
				base: ['var(--text-size-base)', 'var(--text-height-base)'],
				lg: ['var(--text-size-lg)', 'var(--text-height-lg)'],
				xl: ['var(--text-size-xl)', 'var(--text-height-xl)'],
				'2xl': ['var(--text-size-2xl)', 'var(--text-height-2xl)'],
				'3xl': ['var(--text-size-3xl)', 'var(--text-height-3xl)'],
				'4xl': ['var(--text-size-4xl)', 'var(--text-height-4xl)']
			},
			spacing: {
				xs: 'var(--spacing-xs)',
				sm: 'var(--spacing-sm)',
				md: 'var(--spacing-md)',
				lg: 'var(--spacing-lg)',
				xl: 'var(--spacing-xl)',
				'2xl': 'var(--spacing-2xl)',
				'3xl': 'var(--spacing-3xl)'
			},
			minWidth: {
				xs: 'var(--spacing-xs)',
				sm: 'var(--spacing-sm)',
				md: 'var(--spacing-md)',
				lg: 'var(--spacing-lg)',
				xl: 'var(--spacing-xl)',
				'2xl': 'var(--spacing-2xl)',
				'3xl': 'var(--spacing-3xl)'
			},
			minHeight: {
				xs: 'var(--spacing-xs)',
				sm: 'var(--spacing-sm)',
				md: 'var(--spacing-md)',
				lg: 'var(--spacing-lg)',
				xl: 'var(--spacing-xl)',
				'2xl': 'var(--spacing-2xl)',
				'3xl': 'var(--spacing-3xl)'
			},
			maxWidth: {
				xs: 'var(--spacing-xs)',
				sm: 'var(--spacing-sm)',
				md: 'var(--spacing-md)',
				lg: 'var(--spacing-lg)',
				xl: 'var(--spacing-xl)',
				'2xl': 'var(--spacing-2xl)',
				'3xl': 'var(--spacing-3xl)'
			},
			maxHeight: {
				xs: 'var(--spacing-xs)',
				sm: 'var(--spacing-sm)',
				md: 'var(--spacing-md)',
				lg: 'var(--spacing-lg)',
				xl: 'var(--spacing-xl)',
				'2xl': 'var(--spacing-2xl)',
				'3xl': 'var(--spacing-3xl)'
			},
			zIndex: {
				'1': '1',
				'2': '2',
				'3': '3'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			}
		},
		keyframes: {},
		container: {
			center: true,
			padding: '16px',
			screens: {
				sm: '576px',
				md: '769px',
				lg: '992px',
				xl: '1280px',
				'2xl': '1536px'
			}
		}
	},
	plugins: [
		animate,
		plugin(({ addComponents, addUtilities }) => {
			addComponents({
				'.truncate-1': {
					display: '-webkit-box !important',
					'-webkit-line-clamp': '1',
					'-webkit-box-orient': 'vertical',
					textOverflow: 'ellipsis',
					overflow: 'hidden'
				},
				'.truncate-2': {
					display: '-webkit-box !important',
					'-webkit-line-clamp': '2',
					'-webkit-box-orient': 'vertical',
					textOverflow: 'ellipsis',
					overflow: 'hidden'
				},
				'.truncate-3': {
					display: '-webkit-box !important',
					'-webkit-line-clamp': '3',
					'-webkit-box-orient': 'vertical',
					textOverflow: 'ellipsis',
					overflow: 'hidden'
				},
				'.truncate-4': {
					display: '-webkit-box !important',
					'-webkit-line-clamp': '4',
					'-webkit-box-orient': 'vertical',
					textOverflow: 'ellipsis',
					overflow: 'hidden'
				}
			})
			addUtilities({
				'.outline-border-none': {
					outline: 'none',
					border: 'none'
				},
				'.pointer-events-all': {
					pointerEvents: 'all'
				}
			})
		})
	]
}
