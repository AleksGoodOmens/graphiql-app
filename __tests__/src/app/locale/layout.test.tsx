import RestLayout from '@/app/[locale]/rest_client/layout'
import { ContextProviders } from '@/providers'
import checkTokenExpiration from '@/utils/helpers/checkTokenExpiration'
import { render, screen, waitFor } from '@testing-library/react'
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

describe('RestLayout', () => {
	it('renders loader when user is null', () => {
		;(useAuthState as jest.Mock).mockReturnValue([null, true])

		render(
			<RestLayout>
				<div>test child</div>
			</RestLayout>
		)

		expect(screen.getByLabelText('loading')).toBeInTheDocument()
	})

	it('renders default component with h1 tag when user is authenticated', async () => {
		const mockUser = {
			getIdTokenResult: jest.fn().mockResolvedValue({
				expirationTime: '2023-09-30T00:00:00.000Z',
			}),
		}

		;(useAuthState as jest.Mock).mockReturnValue([mockUser, false])

		render(
			<ContextProviders>
				<RestLayout>
					<div>Test Child</div>
				</RestLayout>
			</ContextProviders>
		)

		await waitFor(() => {
			expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
		})

		expect(screen.getByText('rest:restHeading')).toBeInTheDocument()
	})

	it('signs out the user if the token is expired', () => {
		const mockUser = {
			getIdTokenResult: jest.fn().mockResolvedValue({
				expirationTime: '2022-09-30T00:00:00.000Z',
			}),
		}

		;(checkTokenExpiration as jest.Mock).mockReturnValue(true)
		;(useAuthState as jest.Mock).mockReturnValue([mockUser, false])

		render(
			<ContextProviders>
				<RestLayout>
					<div>Test Child</div>
				</RestLayout>
			</ContextProviders>
		)
	})
})
