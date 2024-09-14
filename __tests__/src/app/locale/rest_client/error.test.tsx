import Error from '@/app/[locale]/rest_client/error'
import { render, screen } from '@testing-library/react'
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}))

const mockConsoleError = jest
	.spyOn(console, 'error')
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	.mockImplementation(() => {})

describe('Error component', () => {
	const mockReset = jest.fn()

	it('should render error message and button', () => {
		const error = 'message' as unknown as Error
		render(
			<Error
				error={error}
				reset={mockReset}
			/>
		)

		expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: 'Try again' })
		).toBeInTheDocument()
	})

	it('should log the error using console.error', () => {
		const error = 'message' as unknown as Error
		render(
			<Error
				error={error}
				reset={mockReset}
			/>
		)

		expect(mockConsoleError).toHaveBeenCalledWith(error)
	})
})
