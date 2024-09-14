import Loading from '@/app/[locale]/rest_client/loading'
import { render, screen } from '@testing-library/react'

describe('loading', () => {
	it('render the loader on a page with className "loader" ', () => {
		render(<Loading />)

		const div = screen.getByLabelText(/loading/i)

		expect(div).toBeInTheDocument()
	})
	it('render the loader on a page with className "loader" ', () => {
		render(<Loading />)

		const div = screen.getByLabelText(/loading/i)

		expect(div).toHaveClass(/loader/i)
	})
})
