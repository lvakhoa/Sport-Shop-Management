import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1.5rem',
  			sm: '2.25rem'
  		},
  		screens: {
  			'2xl': '1536px'
  		}
  	},
  	extend: {
  		colors: {
  			blue: {
  				'50': '#D4E0FF',
  				'100': '#336AEA'
  			},
  			black: {
  				'50': '#F0F0F0',
  				'60': '#E7E7E7',
  				'75': '#D9D9D9',
  				'100': '#000000'
  			},
  			white: {
  				'50': '#F9F9F9',
  				'100': '#FFFFFF'
  			},
  			green: {
  				'50': '#67BAC2',
  				'100': '#33EA7C',
  				'150': '#D4FFE0'
  			},
  			red: {
  				'50': '#FFD4D7',
  				'100': '#DA1521'
  			},
  			content: 'rgb(110,113,145)',
  			heading: 'rgb(31,31,57)',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: '#2B50ED',
  			secondary: '#648EEF',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		width: {
  			'sidebar-compact': '220px',
  			'sidebar-default': '304px'
  		},
  		margin: {
  			'sidebar-compact': '220px',
  			'sidebar-default': '304px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
