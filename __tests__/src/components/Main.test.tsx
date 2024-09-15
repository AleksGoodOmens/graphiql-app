import Main from '@/components/Main/Main'
import { render, screen } from '@testing-library/react'
import { useAuthState } from 'react-firebase-hooks/auth'
jest.mock('react-firebase-hooks/auth', () => ({
	useAuthState: jest.fn(),
}))

jest.mock('firebase/auth', () => ({
	signOut: jest.fn(),
	getAuth: jest.fn(),
}))

jest.mock('@/utils/helpers/checkTokenExpiration', () => ({
	checkTokenExpiration: jest.fn(),
	__esModule: true,
	default: jest.fn(),
}))

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(() => ({
		push: jest.fn(),
		replace: jest.fn(),
	})),
}))

jest.mock('react-i18next', () => ({
	useTranslation: jest.fn(() => ({
		t: (key: string) => key,
	})),
}))
describe('Main', () => {
	it('render loader on loading', () => {
		;(useAuthState as jest.Mock).mockReturnValue([null, true])
		render(<Main />)

		expect(screen.getByLabelText('loading')).toBeInTheDocument()
	})
	it('render button "singIn" and button "singUp" when !user', () => {
		;(useAuthState as jest.Mock).mockReturnValue([null, false])
		render(<Main />)

		expect(screen.getByRole('button', { name: /signin/i })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /signup/i })).toBeInTheDocument()
	})

	it('render h1 with text "main" h2 with text "greeting"', () => {
		const mockUser = {
			getIdTokenResult: jest.fn().mockResolvedValue({
				expirationTime: '2023-09-30T00:00:00.000Z',
			}),
		}

		;(useAuthState as jest.Mock).mockReturnValue([mockUser, false])
		render(<Main />)

		expect(
			screen.getByRole('heading', { name: /mainHeading/i, level: 1 })
		).toBeInTheDocument()
		expect(
			screen.getByRole('heading', { name: /greeting/i, level: 2 })
		).toBeInTheDocument()
	})
	it('render buttons "rest", "graphiQL", "history"', () => {
		const mockUser = {
			getIdTokenResult: jest.fn().mockResolvedValue({
				expirationTime: '2023-09-30T00:00:00.000Z',
			}),
		}

		;(useAuthState as jest.Mock).mockReturnValue([mockUser, false])
		render(<Main />)

		expect(screen.getByRole('button', { name: /rest/i })).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: /graphiQL/i })
		).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /history/i })).toBeInTheDocument()
	})
})
