import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
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
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fly-plane-centered': {
					'0%': {
						transform: 'translate(-50px, 100px) rotate(45deg) scale(0.5)',
						opacity: '0'
					},
					'10%': {
						opacity: '1',
						transform: 'translate(-30px, 80px) rotate(45deg) scale(0.8)'
					},
					'90%': {
						opacity: '1',
						transform: 'translate(250px, -100px) rotate(45deg) scale(1.2)'
					},
					'100%': {
						transform: 'translate(300px, -150px) rotate(45deg) scale(0.8)',
						opacity: '0'
					}
				},
				'fly-plane-clear': {
					'0%': {
						transform: 'translate(-100px, 200px) rotate(45deg) scale(0.5)',
						opacity: '0'
					},
					'10%': {
						opacity: '1',
						transform: 'translate(-80px, 180px) rotate(45deg) scale(0.8)'
					},
					'90%': {
						opacity: '1',
						transform: 'translate(calc(100vw - 100px), -150px) rotate(45deg) scale(1.2)'
					},
					'100%': {
						transform: 'translate(calc(100vw + 50px), -200px) rotate(45deg) scale(0.8)',
						opacity: '0'
					}
				},
				'ride-bike-clear': {
					'0%': {
						transform: 'translateX(calc(100vw + 150px)) scale(0.5)',
						opacity: '0'
					},
					'10%': {
						opacity: '1',
						transform: 'translateX(calc(100vw + 100px)) scale(0.8)'
					},
					'90%': {
						opacity: '1',
						transform: 'translateX(-100px) scale(1.2)'
					},
					'100%': {
						transform: 'translateX(-200px) scale(0.8)',
						opacity: '0'
					}
				},
				'drive-car-clear': {
					'0%': {
						transform: 'translateX(calc(100vw + 150px)) scale(0.5)',
						opacity: '0'
					},
					'10%': {
						opacity: '1',
						transform: 'translateX(calc(100vw + 100px)) scale(0.8)'
					},
					'90%': {
						opacity: '1',
						transform: 'translateX(-100px) scale(1.2)'
					},
					'100%': {
						transform: 'translateX(-200px) scale(0.8)',
						opacity: '0'
					}
				},
				'dash': {
					'0%': {
						strokeDashoffset: '100'
					},
					'100%': {
						strokeDashoffset: '0'
					}
				},
				'draw-path': {
					'0%': {
						strokeDasharray: '0 1000'
					},
					'100%': {
						strokeDasharray: '1000 0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'fly-plane-centered': 'fly-plane-centered 1.5s ease-out',
				'fly-plane-clear': 'fly-plane-clear 1.5s ease-out',
				'ride-bike-clear': 'ride-bike-clear 1.5s ease-out',
				'drive-car-clear': 'drive-car-clear 1.5s ease-out',
				'dash': 'dash 2s ease-in-out infinite',
				'draw-path': 'draw-path 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
