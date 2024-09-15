import { render, screen } from '@testing-library/react'
import ResponsePage from '@/app/[locale]/rest_client/[...method]/page'
describe('ResponsePage', () => {
	const responseParams = {
		params: { method: ['GET', ''] },
		searchParams: { test: 'test' },
	}
	it('renders a h2 with "Response"', async () => {
		render(await ResponsePage(responseParams))

		const heading = screen.getByRole('heading', { name: /response/i, level: 2 })

		expect(heading).toBeInTheDocument()
	})
})
