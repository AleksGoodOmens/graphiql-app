import { ContextProviders } from '@/providers'
import { render } from '@testing-library/react'

it('should render children within StoreProvider and ThemeContextProvider', () => {
	const { getByText } = render(
		<ContextProviders>
			<div>Test Child</div>
		</ContextProviders>
	)
	expect(getByText('Test Child')).toBeInTheDocument()
})
