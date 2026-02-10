import twColors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
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
			success: 'var(--success)',
		},
		extend: {
			fontFamily: {
				montserrat: ['var(--font-montserrat)'],
				'montserrat-alternates': ['var(--font-montserrat-alternates)'],
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
				1: '1',
				2: '2',
				3: '3'
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
		// require('tailwindcss-global-dark'),
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
