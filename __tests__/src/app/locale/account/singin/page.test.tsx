import Home from '@/app/[locale]/page'
import { render, screen, waitFor } from '@testing-library/react'

// eslint-disable-next-line react/display-name
jest.mock('@/components/Main/Main', () => () => <div>Main Component</div>)

describe('Home Component', () => {
	it('renders Main component after useEffect is triggered', async () => {
		render(<Home />)

		await waitFor(() => {
			expect(screen.getByText('Main Component')).toBeInTheDocument()
		})
	})
})
