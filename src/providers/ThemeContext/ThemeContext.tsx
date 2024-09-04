'use client'
import { ThemeProvider, useMediaQuery } from '@mui/material'
import { createContext, ReactNode, useState } from 'react'
import { themeSettings } from '.'

export const ThemeContext = createContext({
	mode: 'dark',
	toggleTheme: () => {
		console.log('test')
	},
})

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
