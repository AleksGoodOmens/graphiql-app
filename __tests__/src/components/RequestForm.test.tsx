import { RequestForm } from '@/components'
import { ContextProviders } from '@/providers'
import { render, screen } from '@testing-library/react'

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}))
jest.mock('react-i18next', () => ({
	useTranslation: jest.fn(() => ({
		t: (key: string) => key,
	})),
}))
describe('RequestForm', () => {
	it('render form', () => {
		render(
			<ContextProviders>
				<RequestForm />
			</ContextProviders>
		)
		const tagForm = screen.getByRole('form', { name: 'requestForm' })
		expect(tagForm).toBeInTheDocument()
	})
	it('render select ', () => {
		render(
			<ContextProviders>
				<RequestForm />
			</ContextProviders>
		)
		const select = screen.getByRole('combobox')
		expect(select).toBeInTheDocument()
	})
	it('render send button', () => {
		render(
			<ContextProviders>
				<RequestForm />
			</ContextProviders>
		)
		const buttons = screen.getByRole('button')

		expect(buttons).toBeInTheDocument()
	})
})
