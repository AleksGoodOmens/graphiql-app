import { Footer } from '@/components'
import { render, screen } from '@testing-library/react'

describe('Footer', () => {
	it('render form with 4 links', () => {
		render(<Footer />)
		const footer = screen.getByRole('contentinfo')
		const links = screen.getAllByRole('link')
		expect(footer).toBeInTheDocument()
		expect(links.length).toEqual(4)
	})
})
