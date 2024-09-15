import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useAppDispatch, updateHeader, delHeader, delParam } from '@/lib'

import { RestListItem } from '@/components'
jest.mock('@/lib', () => ({
	useAppDispatch: jest.fn(),
	updateHeader: jest.fn(),
	updateParam: jest.fn(),
	delHeader: jest.fn(),
	delParam: jest.fn(),
}))

describe('RestListItem component', () => {
	let dispatchMock: jest.Mock
	beforeEach(() => {
		dispatchMock = jest.fn()
		;(useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock)
	})

	it('should handle user input and submit form', async () => {
		const pair = { id: 1, key: 'testKey', value: 'testValue' }
		const instance = 'Header'

		render(
			<RestListItem
				pair={pair}
				instance={instance}
			/>
		)

		const keyInput = screen.getByLabelText(/Header key/i)
		const valueInput = screen.getByLabelText(/Header value/i)

		userEvent.type(keyInput, 'testing')
		userEvent.type(valueInput, 'newValue')

		const submitButton = screen.getByRole('button', {
			name: /save key\/value/i,
		})

		userEvent.click(submitButton)

		await waitFor(() => {
			expect(dispatchMock).toHaveBeenCalledWith(
				updateHeader({ id: 1, key: 'testing', value: 'newValue' })
			)
		})
	})

	it('should call delete header action when delete button is clicked', () => {
		const pair = { id: 1, key: 'testKey', value: 'testValue' }
		const instance = 'Header'

		render(
			<RestListItem
				pair={pair}
				instance={instance}
			/>
		)

		const deleteButton = screen.getByLabelText(/del key\/value/i)
		fireEvent.click(deleteButton)

		expect(dispatchMock).toHaveBeenCalledWith(delHeader(1))
	})
	it('should call delete Param action when delete button is clicked', () => {
		const pair = { id: 1, key: 'testKey', value: 'testValue' }
		const instance = 'Param'

		render(
			<RestListItem
				pair={pair}
				instance={instance}
			/>
		)

		const deleteButton = screen.getByLabelText(/del key\/value/i)
		fireEvent.click(deleteButton)

		expect(dispatchMock).toHaveBeenCalledWith(delParam(1))
	})
	it('render a form', () => {
		const pair = { id: 1, key: 'testKey', value: 'testValue' }
		const instance = 'Header'
		render(
			<RestListItem
				pair={pair}
				instance={instance}
			/>
		)
		const tagForm = screen.getByRole('formListItem')
		expect(tagForm).toBeInTheDocument()
	})
	it('render a 2 inputs', () => {
		const pair = { id: 1, key: 'testKey', value: 'testValue' }
		const instance = 'Header'
		render(
			<RestListItem
				pair={pair}
				instance={instance}
			/>
		)
		const inputs = screen.getAllByRole('textbox')
		expect(inputs.length).toEqual(2)
	})
	it('render an save button', () => {
		const pair = { id: 1, key: 'testKey', value: 'testValue' }
		const instance = 'Header'
		render(
			<RestListItem
				pair={pair}
				instance={instance}
			/>
		)
		const buttons = screen.getAllByRole('button')

		expect(buttons.length).toEqual(2)
	})
})
