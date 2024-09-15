import { Loader } from '@/components'
import { render, screen } from '@testing-library/react'

describe('Loader', () => {
	it('render the loader on a page with className "loader" ', () => {
		render(<Loader />)

		const div = screen.getByLabelText(/loading/i)

		expect(div).toBeInTheDocument()
	})
	it('render the loader on a page with className "loader" ', () => {
		render(<Loader />)

		const div = screen.getByLabelText(/loading/i)

		expect(div).toHaveClass(/loader/i)
	})
})
