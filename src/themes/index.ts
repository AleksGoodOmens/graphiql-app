import { createTheme } from '@mui/material'

export const themeSettings = (mode: 'light' | 'dark') => {
	const theme = createTheme({
		palette: {
			mode: mode,
			primary: {
				main: '#EA6A6A',
			},
			secondary: {
				main: '#5FBBAD',
			},
		},
	})
	return theme
}
