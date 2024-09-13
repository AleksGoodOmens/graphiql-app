import { RestListItem } from '@/components'
import { ContextProviders } from '@/providers'
import { render, screen } from '@testing-library/react'

describe('RestListItem', () => {
	const testPair = { key: 'test', value: 'test', id: 0 }
	const instance = 'header'

	it('render a form', () => {
		render(
			<ContextProviders>
				<RestListItem
					pair={testPair}
					instance={instance}
				/>
			</ContextProviders>
		)
		const tagForm = screen.getByRole('formListItem')
		expect(tagForm).toBeInTheDocument()
	})
	it('render a 2 inputs', () => {
		render(
			<ContextProviders>
				<RestListItem
					pair={testPair}
					instance={instance}
				/>
			</ContextProviders>
		)
		const inputs = screen.getAllByRole('textbox')
		expect(inputs.length).toEqual(2)
	})
	it('render an save button', () => {
		render(
			<ContextProviders>
				<RestListItem
					pair={testPair}
					instance={instance}
				/>
			</ContextProviders>
		)
		const buttons = screen.getAllByRole('button')

		expect(buttons.length).toEqual(2)
	})
})
