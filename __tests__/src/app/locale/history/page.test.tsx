import HistoryPage from '@/app/[locale]/history/page'
import { render, screen } from '@testing-library/react'

describe('HistoryPage', () => {
	it('render home button, rest client button, h1', () => {
		render(<HistoryPage />)

		const homeBtn = screen.getByRole('button', { name: /home/i })
		const restClientBtn = screen.getByRole('button', { name: /rest/i })
		const title = screen.getByRole('heading', { level: 1 })

		expect(homeBtn).toBeInTheDocument()
		expect(restClientBtn).toBeInTheDocument()
		expect(title).toBeInTheDocument()
	})
})
