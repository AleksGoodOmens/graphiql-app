import SingUp from '@/app/[locale]/(account)/signup/page'
import { render, screen } from '@testing-library/react'
import { useAuthState } from 'react-firebase-hooks/auth'

jest.mock('react-i18next', () => ({
	useTranslation: jest.fn(() => ({
		t: (key: string) => key,
	})),
}))
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(() => ({
		push: jest.fn(),
		replace: jest.fn(),
	})),
}))

jest.mock('react-firebase-hooks/auth', () => ({
	useAuthState: jest.fn(),
}))

jest.mock('firebase/auth', () => ({
	signOut: jest.fn(),
	getAuth: jest.fn(),
}))
describe('SingUpPage', () => {
	it('render loader on loading', () => {
		;(useAuthState as jest.Mock).mockReturnValue([null, true])
		render(<SingUp />)

		expect(screen.getByLabelText('loading')).toBeInTheDocument()
	})
	it('render email and password textBox', () => {
		;(useAuthState as jest.Mock).mockReturnValue([null, false])
		render(<SingUp />)

		expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
		expect(
			screen.getByRole('textbox', { name: /password/i })
		).toBeInTheDocument()
	})
})