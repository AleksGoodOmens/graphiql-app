import RestClientPage from '@/app/rest_client/page'
import { render, screen } from '@testing-library/react'

describe('Page', () => {
	it('renders a heading', () => {
		render(<RestClientPage />)

		const paragraph = screen.getByRole('paragraph')

		expect(paragraph).toBeInTheDocument()
		expect(paragraph).toHaveTextContent(/Please fill the from above/)
	})
})
