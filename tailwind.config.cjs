/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			tablet: '600px',
			desktop: '1200px',
			mobile: '350px',
		},
		extend: {},
	},
	plugins: [],
}
