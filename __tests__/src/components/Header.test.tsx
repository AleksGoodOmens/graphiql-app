import { Header } from '@/components'
import { render, screen } from '@testing-library/react'
import { useTranslation } from 'react-i18next'
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
	usePathname: jest.fn(),
}))
jest.mock('react-i18next', () => ({
	useTranslation: jest.fn(() => ({
		i18: {
			language: 'test',
		},
		t: (key: string) => key,
	})),
}))

describe('Header', () => {
	it('renders header tag"', () => {
		;(useTranslation as jest.Mock).mockReturnValue({
			t: (k: string) => k,
			i18n: { language: 'test' },
		})
		render(<Header />)

		const banner = screen.getByRole('banner')

		expect(banner).toBeInTheDocument()
	})
	it('renders logo with alt text "logo"', () => {
		render(<Header />)

		const logo = screen.getByRole('img', { name: 'Logo' })

		expect(logo).toBeInTheDocument()
	})
	it('renders singin, singUp, mode button', () => {
		render(<Header />)

		const home = screen.getByRole('button', { name: /Signin/i })
		const signin = screen.getByRole('button', { name: /Signup/i })
		const dark = screen.getByRole('button', { name: /light/i })

		expect(home).toBeInTheDocument()
		expect(signin).toBeInTheDocument()
		expect(dark).toBeInTheDocument()
	})

	it('language options Russian English', () => {
		render(<Header />)

		const Russian = screen.getByRole('option', { name: /Russian/i })
		const English = screen.getByRole('option', { name: /English/i })

		expect(Russian).toBeInTheDocument()
		expect(English).toBeInTheDocument()
	})
})
