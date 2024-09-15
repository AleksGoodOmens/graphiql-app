import { ThemeProvider, useMediaQuery } from '@mui/material'
import { ReactNode, useState } from 'react'
import { ThemeContext } from '../ThemeContext'
import { themeSettings } from '../ThemeContext/themeSettings'

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const [mode, setThemeMode] = useState<'light' | 'dark'>(
		prefersDarkMode ? 'dark' : 'light'
	)

	const toggleTheme = () => {
		setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'))
	}

	return (
		<ThemeContext.Provider value={{ mode, toggleTheme }}>
			<ThemeProvider theme={themeSettings(mode)}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	)
}
