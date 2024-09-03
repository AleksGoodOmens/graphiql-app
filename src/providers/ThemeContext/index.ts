import { createTheme } from '@mui/material'
import { paletteDark, paletteLight } from './palette'

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		request: true
	}
}

export const themeSettings = (mode: 'light' | 'dark') => {
	const palette = mode === 'light' ? paletteLight : paletteDark

	const theme = createTheme({
		palette: {
			mode: mode,
			...palette,
		},
		typography: {
			fontFamily: 'JetBrains Mono',

			h1: {
				margin: '1rem',
				fontFamily: 'Montserrat',
				textTransform: 'capitalize',
			},
			h2: {
				margin: '1rem',
				fontFamily: 'Montserrat',
				textTransform: 'capitalize',
			},
			h3: {
				margin: '1rem',
				fontFamily: 'Montserrat',
				textTransform: 'capitalize',
			},
			h4: {
				margin: '1rem',
				fontFamily: 'Montserrat',
				textTransform: 'capitalize',
			},
			subtitle1: {
				fontFamily: 'Montserrat',
			},
			subtitle2: {
				fontFamily: 'Montserrat',
			},
		},
	})
	return theme
}
