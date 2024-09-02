interface ThemeSettingsProps {
	mode: 'light' | 'dark'
}

export const themeSettings = ({ mode }: ThemeSettingsProps) => {
	return {
		palette: {
			mode: mode,
			primary: {
				main: '#EA6A6A',
			},
			secondary: {
				main: '#5FBBAD',
			},
		},
	}
}
