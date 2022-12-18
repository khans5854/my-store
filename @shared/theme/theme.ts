import { createTheme, PaletteMode, responsiveFontSizes } from '@mui/material'
import { overrides } from './overrides'
import { palette } from './palette'
import { typography } from './typography'
import { breakpoints } from './breakpoints'
const baseTheme = (mode: PaletteMode) => ({
	palette: palette(mode),
	typography: {
		fontFamily: [
			'Montserrat',
			`system-ui`,
			`-apple-system`,
			`BlinkMacSystemFont`,
			`'Segoe UI'`,
			`Helvetica`,
			`Arial`,
			`sans-serif`,
			`'Apple Color Emoji'`,
			`'Segoe UI Emoji'`,
			`'Segoe UI Symbol'`,
		].join(','),
	},
	shape: {
		borderRadius: 8,
	},
	breakpoints: breakpoints(),
	mixins: {
		toolbar: {
			minHeight: 64,
		},
	},
})

export const createCustomTheme = (mode: PaletteMode) => {
	let theme = createTheme(baseTheme(mode))

	theme = createTheme(theme, {
		components: { ...overrides(theme) },
		typography: { ...typography(theme) },
	})

	theme = responsiveFontSizes(theme)
	return theme
}
