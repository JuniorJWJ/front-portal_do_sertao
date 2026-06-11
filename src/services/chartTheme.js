/**
 * Integração dos gráficos (Chart.js) com o design system.
 * Lê os tokens CSS em tempo de execução para que os gráficos
 * acompanhem o tema claro/escuro.
 */

export function getThemeToken(name, fallback = '') {
	if (typeof window === 'undefined') return fallback
	const value = getComputedStyle(document.documentElement)
		.getPropertyValue(name)
		.trim()
	return value || fallback
}

/* Paleta terrosa harmoniosa com a identidade visual do portal */
const PALETTE = [
	'#8a4f1d',
	'#d59853',
	'#0f7b49',
	'#3a7ca5',
	'#9e4a4a',
	'#6d597a',
	'#b8860b',
	'#5f7470',
	'#c97b63',
	'#496f5d',
	'#a26a42',
	'#7d5ba6',
	'#2e6f95',
	'#bc6c25',
	'#606c38',
	'#9c6644',
	'#8f8073',
]

function hexToRgba(hex, alpha) {
	const value = hex.replace('#', '')
	const r = parseInt(value.substring(0, 2), 16)
	const g = parseInt(value.substring(2, 4), 16)
	const b = parseInt(value.substring(4, 6), 16)
	return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function chartPalette(count) {
	const colors = Array.from(
		{ length: count },
		(_, index) => PALETTE[index % PALETTE.length]
	)

	return {
		backgroundColor: colors.map((color) => hexToRgba(color, 0.55)),
		borderColor: colors,
	}
}

export function chartOptions(overrides = {}) {
	const textColor = getThemeToken('--color-text', '#211f1c')
	const mutedColor = getThemeToken('--color-muted', '#686057')
	const borderColor = getThemeToken('--color-border', '#ded8cd')

	return {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				labels: { color: textColor },
			},
		},
		scales: undefined,
		color: mutedColor,
		borderColor,
		...overrides,
	}
}

export function barChartOptions() {
	const mutedColor = getThemeToken('--color-muted', '#686057')
	const borderColor = getThemeToken('--color-border', '#ded8cd')

	return chartOptions({
		plugins: {
			legend: { display: false },
		},
		scales: {
			x: {
				ticks: { color: mutedColor },
				grid: { color: 'transparent' },
			},
			y: {
				beginAtZero: true,
				ticks: { color: mutedColor, precision: 0 },
				grid: { color: borderColor },
			},
		},
	})
}
