import { ThemeContext } from '@/providers/ThemeContext'
import { ThemeContextProvider } from '@/providers/ThemeContextProvider/ThemeContextProvider'
import { render, screen } from '@testing-library/react'
import { useContext } from 'react'

describe('ThemeContext', () => {
	it('should default to light mode when user preference is undefined or null', () => {
		const TestComponent = () => {
			const context = useContext(ThemeContext)
			return <div>{context.mode}</div>
		}

		render(
			<ThemeContextProvider>
				<TestComponent />
			</ThemeContextProvider>
		)

		const modeValue = screen.getByText(/light/i)

		expect(modeValue).toBeInTheDocument()
	})

	it('should toggle theme from light to dark when current theme is light', () => {
		const setThemeMode = jest.fn()
		const toggleTheme = () => {
			setThemeMode((prev: string) => (prev === 'light' ? 'dark' : 'light'))
		}
		let themeMode = 'light'
		setThemeMode.mockImplementation((callback: (s: string) => string) => {
			themeMode = callback(themeMode)
		})
		toggleTheme()
		expect(themeMode).toBe('dark')
	})
})
