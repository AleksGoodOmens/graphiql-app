import Error from '@/app/[locale]/rest_client/error'
import { render, screen } from '@testing-library/react'
// Мокаем useRouter
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

		// Проверяем, что текст ошибки отображается
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

		// 	// Проверяем, что console.error был вызван с ошибкой
		expect(mockConsoleError).toHaveBeenCalledWith(error)
	})

	// it('should reset and navigate to home on button click', () => {
	// 	render(
	// 		<Error
	// 			error={new Error('Test error')}
	// 			reset={mockReset}
	// 		/>
	// 	)

	// 	const button = screen.getByRole('button', { name: 'Try again' })

	// 	fireEvent.click(button)

	// 	// Проверяем, что функции были вызваны
	// 	expect(mockReset).toHaveBeenCalled()
	// 	expect(mockRouterPush).toHaveBeenCalledWith('/')
	// })
})
