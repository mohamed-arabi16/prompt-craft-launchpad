
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	safelist: [
		// RTL-specific classes to prevent purging
		{ pattern: /^(rtl|ltr):/ },
		// Common RTL variants
		'rtl:mr-0', 'rtl:mr-1', 'rtl:mr-2', 'rtl:mr-3', 'rtl:mr-4',
		'rtl:ml-0', 'rtl:ml-1', 'rtl:ml-2', 'rtl:ml-3', 'rtl:ml-4',
		'rtl:pl-0', 'rtl:pl-2', 'rtl:pl-4', 'rtl:pl-8',
		'rtl:pr-0', 'rtl:pr-2', 'rtl:pr-4', 'rtl:pr-8',
		'rtl:text-right', 'rtl:text-left',
		'rtl:float-right', 'rtl:float-left',
		'rtl:translate-x-full', 'rtl:-translate-x-full',
		'ltr:mr-0', 'ltr:mr-2', 'ltr:mr-4',
		'ltr:ml-0', 'ltr:ml-2', 'ltr:ml-4',
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'cairo': ['Cairo', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
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
				},
				// Teal/Cyan Brand Colors
				'teal': {
					DEFAULT: 'hsl(var(--teal))',
					foreground: 'hsl(var(--teal-foreground))'
				},
				'cyan': {
					DEFAULT: 'hsl(var(--cyan))',
					foreground: 'hsl(var(--cyan-foreground))'
				}
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-up': {
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': {
						transform: 'translateX(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'slide-in-left-rtl': {
					from: {
						transform: 'translateX(-100%)',
						opacity: '0'
					},
					to: {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'gradient-shift': {
					'0%, 100%': {
						'background-position': '0% 50%'
					},
					'50%': {
						'background-position': '100% 50%'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'shimmer': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(100%)'
					}
				},
				'aurora': {
					'0%, 100%': {
						opacity: '0.3',
						transform: 'translateY(0) rotate(0deg)'
					},
					'33%': {
						opacity: '0.5',
						transform: 'translateY(-10px) rotate(2deg)'
					},
					'66%': {
						opacity: '0.4',
						transform: 'translateY(5px) rotate(-2deg)'
					}
				},
				'spin': {
					from: {
						transform: 'rotate(0deg)'
					},
					to: {
						transform: 'rotate(360deg)'
					}
				},
				'bounce': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-in-left-rtl': 'slide-in-left-rtl 0.6s ease-out forwards',
				'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite',
				'aurora': 'aurora 4s ease-in-out infinite',
				'spin': 'spin 1s linear infinite',
				'bounce': 'bounce 1s infinite'
			},
			backgroundImage: {
				'gradient-hero': 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--teal) / 0.15) 50%, hsl(var(--background)) 100%)',
				'gradient-teal': 'linear-gradient(135deg, hsl(var(--teal)) 0%, hsl(var(--cyan)) 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
