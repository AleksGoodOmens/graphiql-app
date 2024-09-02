'use client'
import { createContext, ReactNode, useState } from 'react'

export const ThemeContext = createContext({
	mode: 'dark',
	toggleTheme: () => {
		console.log('test')
	},
})

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setThemeMode] = useState<'light' | 'dark'>('light')

	const toggleTheme = () => {
		setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'))
	}

	return (
		<ThemeContext.Provider value={{ mode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
