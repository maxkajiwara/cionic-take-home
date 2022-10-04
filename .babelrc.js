module.exports = {
	presets: [['next/babel', { 'preset-react': { runtime: 'automatic' } }]],
	plugins: [
		['babel-plugin-twin', { debug: true }],
		'babel-plugin-macros',
		['babel-plugin-styled-components', { ssr: true }],
	],
}
