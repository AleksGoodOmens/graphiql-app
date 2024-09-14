import AccountLayout from '@/app/[locale]/(account)/layout'
import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
	usePathname: jest.fn(),
}))

jest.mock('react-i18next', () => ({
	useTranslation: jest.fn(() => ({
		t: (key: string) => key,
	})),
}))

describe('AccountLayout', () => {
	it('renders h2 with "formHeadingSignup" when the path includes "signup"', () => {
		;(usePathname as jest.Mock).mockReturnValue('signup')

		render(
			<AccountLayout>
				<div>test</div>
			</AccountLayout>
		)

		expect(screen.getByText('formHeadingSignup')).toBeInTheDocument()
	})

	it('renders h2 with "formHeadingSignin" when the path does not include "signup"', () => {
		;(usePathname as jest.Mock).mockReturnValue('signin')

		render(
			<AccountLayout>
				<div>test</div>
			</AccountLayout>
		)

		expect(screen.getByText('formHeadingSignin')).toBeInTheDocument()
	})
})
