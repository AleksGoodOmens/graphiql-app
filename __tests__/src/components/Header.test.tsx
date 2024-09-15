import { Header } from '@/components'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useTranslation } from 'react-i18next'
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(() => ({
		push: jest.fn(),
	})),
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
jest.mock('react-firebase-hooks/auth', () => ({
	useAuthState: jest.fn(),
}))

describe('Header no user', () => {
	beforeEach(() => {
		;(useAuthState as jest.Mock).mockReturnValue([null, false, null])
	})

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
	it('renders signin, signup, mode button', () => {
		render(<Header />)

		const signIn = screen.getByRole('button', { name: /Signin/i })
		const signUp = screen.getByRole('button', { name: /Signup/i })
		const dark = screen.getByRole('button', { name: /light/i })

		expect(signIn).toBeInTheDocument()
		expect(signUp).toBeInTheDocument()
		expect(dark).toBeInTheDocument()
	})
	it('user can click the signin Button', async () => {
		const mockPush = jest.fn()
		;(useRouter as jest.Mock).mockReturnValue({
			push: mockPush,
		})

		render(<Header />)

		const signInButton = screen.getByRole('button', { name: /Signin/i })

		await userEvent.click(signInButton)

		expect(mockPush).toHaveBeenCalledTimes(1)
	})
	it('user can click the signup Button', async () => {
		const mockPush = jest.fn()
		;(useRouter as jest.Mock).mockReturnValue({
			push: mockPush,
		})

		render(<Header />)

		const signUpButton = screen.getByRole('button', { name: /Signup/i })

		await userEvent.click(signUpButton)

		expect(mockPush).toHaveBeenCalledTimes(1)
	})
	it('language options Russian English', () => {
		render(<Header />)

		const Russian = screen.getByRole('option', { name: /Russian/i })
		const English = screen.getByRole('option', { name: /English/i })

		expect(Russian).toBeInTheDocument()
		expect(English).toBeInTheDocument()
	})
})

describe('Header user', () => {
	beforeEach(() => {
		;(useAuthState as jest.Mock).mockReturnValue([
			{ name: 'testUser' },
			false,
			null,
		])
	})
	it('render signIn and Main buttons', () => {
		render(<Header />)

		const signOut = screen.getByRole('button', { name: /SignOut/i })
		const main = screen.getByRole('button', { name: /main/i })
		expect(signOut).toBeInTheDocument()
		expect(main).toBeInTheDocument()
	})

	it('user can click the signOut Button', async () => {
		const mockPush = jest.fn()
		;(useRouter as jest.Mock).mockReturnValue({
			push: mockPush,
		})

		render(<Header />)

		const signIOutButton = screen.getByRole('button', { name: /SignOut/i })

		await userEvent.click(signIOutButton)

		expect(mockPush).toHaveBeenCalledTimes(1)
	})
	it('user can click the Main Button', async () => {
		const mockPush = jest.fn()
		;(useRouter as jest.Mock).mockReturnValue({
			push: mockPush,
		})

		render(<Header />)

		const main = screen.getByRole('button', { name: /main/i })

		await userEvent.click(main)

		expect(mockPush).toHaveBeenCalledTimes(1)
	})
})
