import RestClientPage from '@/app/[locale]/rest_client/page'
import { render, screen } from '@testing-library/react'

describe('RestClientPage', () => {
	it('renders a paragraph with "Please fill the from above"', () => {
		render(<RestClientPage />)

		const paragraph = screen.getByRole('paragraph')

		expect(paragraph).toBeInTheDocument()
	})
})
