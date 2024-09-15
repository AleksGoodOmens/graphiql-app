import { AddForm } from '@/components'
import { ContextProviders } from '@/providers'
import { render, screen } from '@testing-library/react'

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}))
describe('AddForm', () => {
	it('render form, h2', () => {
		render(
			<ContextProviders>
				<AddForm title={'test'} />
			</ContextProviders>
		)
		const tagForm = screen.getByRole('form', { name: 'test_addForm' })
		const h2 = screen.getByRole('heading', { name: /test/i, level: 2 })
		expect(tagForm).toBeInTheDocument()
		expect(h2).toBeInTheDocument()
	})
	it('render send active button', () => {
		render(
			<ContextProviders>
				<AddForm title='test' />
			</ContextProviders>
		)
		const buttons = screen.getByRole('button')

		expect(buttons).toBeInTheDocument()
		expect(buttons).not.toBeDisabled()
	})
	it('render send disabled button', () => {
		render(
			<ContextProviders>
				<AddForm
					title='test'
					disabled
				/>
			</ContextProviders>
		)
		const buttons = screen.getByRole('button')

		expect(buttons).toBeInTheDocument()
		expect(buttons).toBeDisabled()
	})
})
