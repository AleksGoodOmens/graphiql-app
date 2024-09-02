'use client'
import { createTheme } from '@mui/material'

export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#EA6A6A',
		},
		secondary: {
			main: '#5FBBAD',
		},
	},
	components: {
		MuiButtonBase: {},
	},
})
