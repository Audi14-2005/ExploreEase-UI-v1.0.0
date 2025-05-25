
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
				'fly-plane-diagonal': {
					'0%': {
						transform: 'translate(-50px, 80vh) rotate(-45deg) scale(0.5)',
						opacity: '0'
					},
					'10%': {
						opacity: '1',
						transform: 'translate(10vw, 70vh) rotate(-45deg) scale(0.8)'
					},
					'90%': {
						opacity: '1',
						transform: 'translate(80vw, 10vh) rotate(-45deg) scale(1.2)'
					},
					'100%': {
						transform: 'translate(100vw, -10vh) rotate(-45deg) scale(0.8)',
						opacity: '0'
					}
				},
				'float-cloud-1': {
					'0%': { transform: 'translate(10vw, 20vh)', opacity: '0.6' },
					'50%': { transform: 'translate(50vw, 15vh)', opacity: '0.8' },
					'100%': { transform: 'translate(90vw, 10vh)', opacity: '0.6' }
				},
				'float-cloud-2': {
					'0%': { transform: 'translate(20vw, 30vh)', opacity: '0.4' },
					'50%': { transform: 'translate(60vw, 25vh)', opacity: '0.6' },
					'100%': { transform: 'translate(80vw, 20vh)', opacity: '0.4' }
				},
				'float-cloud-3': {
					'0%': { transform: 'translate(30vw, 25vh)', opacity: '0.5' },
					'50%': { transform: 'translate(70vw, 20vh)', opacity: '0.7' },
					'100%': { transform: 'translate(95vw, 15vh)', opacity: '0.5' }
				},
				'wind-1': {
					'0%': { transform: 'translateX(0) scale(1)', opacity: '0.6' },
					'50%': { transform: 'translateX(-30px) scale(1.2)', opacity: '0.8' },
					'100%': { transform: 'translateX(-60px) scale(0.8)', opacity: '0' }
				},
				'wind-2': {
					'0%': { transform: 'translateX(0) scale(0.8)', opacity: '0.4' },
					'50%': { transform: 'translateX(-40px) scale(1)', opacity: '0.6' },
					'100%': { transform: 'translateX(-80px) scale(0.6)', opacity: '0' }
				},
				'wind-3': {
					'0%': { transform: 'translateX(0) scale(1.2)', opacity: '0.3' },
					'50%': { transform: 'translateX(-50px) scale(1.5)', opacity: '0.5' },
					'100%': { transform: 'translateX(-100px) scale(1)', opacity: '0' }
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
				'fly-plane-diagonal': 'fly-plane-diagonal 1.5s ease-out',
				'float-cloud-1': 'float-cloud-1 1.5s ease-out',
				'float-cloud-2': 'float-cloud-2 1.5s ease-out 0.2s',
				'float-cloud-3': 'float-cloud-3 1.5s ease-out 0.4s',
				'wind-1': 'wind-1 1s ease-out infinite',
				'wind-2': 'wind-2 1.2s ease-out infinite 0.3s',
				'wind-3': 'wind-3 1.5s ease-out infinite 0.6s',
				'ride-bike-clear': 'ride-bike-clear 1.5s ease-out',
				'drive-car-clear': 'drive-car-clear 1.5s ease-out',
				'dash': 'dash 2s ease-in-out infinite',
				'draw-path': 'draw-path 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
