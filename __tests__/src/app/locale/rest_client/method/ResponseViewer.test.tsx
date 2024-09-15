import { render, screen } from '@testing-library/react'
import { ResponseViewer } from '@/app/[locale]/rest_client/[...method]/ResponseViewer'

describe('ResponseViewer', () => {
	const testData = {
		code: 100,
		statusCode: 'test',
		body: 'this is test body',
	}
	it('renders list Item with "code 100"', () => {
		render(<ResponseViewer {...testData} />)

		const statusCode = screen.getByText(/100/)

		expect(statusCode).toBeInTheDocument()
	})
	it('renders list Item with "statusCode test"', () => {
		render(<ResponseViewer {...testData} />)

		const statusCode = screen.getByText(/test/)

		expect(statusCode).toBeInTheDocument()
	})
})
