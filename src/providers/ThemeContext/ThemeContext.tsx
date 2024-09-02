'use client'
import { themeSettings } from '@/themes'
import { ThemeProvider } from '@mui/material'
import { createContext, ReactNode, useState } from 'react'

export const ThemeContext = createContext({
	mode: 'dark',
	toggleTheme: () => {
		console.log('test')
	},
})

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setThemeMode] = useState<'light' | 'dark'>('dark')

	const toggleTheme = () => {
		setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'))
	}

	return (
		<ThemeContext.Provider value={{ mode, toggleTheme }}>
			<ThemeProvider theme={themeSettings(mode)}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	)
}
