'use client'
import { ReactNode } from 'react'

import { StoreProvider } from './StoreProvider/StoreProvider'
import { CssBaseline } from '@mui/material'
import { ThemeContextProvider } from './ThemeContext/ThemeContext'

interface ContextProvidersProps {
	children: ReactNode
}

export const ContextProviders = ({ children }: ContextProvidersProps) => {
	return (
		<StoreProvider>
			<ThemeContextProvider>
				<CssBaseline />
				{children}
			</ThemeContextProvider>
		</StoreProvider>
	)
}
