// tailwind.config.js
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'cionic-sky': '#E9F4FC',
				'cionic-cyan': '#44B3E3',
				'cionic-navy': '#374B70',
				'cionic-graphite': '#1E201F',
				'cionic-gray': {
					400: '#D9D9D9',
					500: '#C2C2C2',
					600: '#656565',
				},
				'cionic-lime': '#BEDF2F',
			},
		},
		screens: {
			md: '760px',
			// => @media (min-width: 760px) { ... }
		},
	},
	plugins: [],
}
