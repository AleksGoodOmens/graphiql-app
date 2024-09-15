import TranslationsProvider from '@/components/TranslationsProvider'
import { render, screen } from '@testing-library/react'
import { createInstance } from 'i18next'
import initTranslations from '@/app/i18n'

jest.mock('i18next', () => ({
	createInstance: jest.fn(() => ({
		init: jest.fn(),
		use: jest.fn(),
		changeLanguage: jest.fn(),
		language: 'en',
	})),
}))

jest.mock('@/app/i18n', () => ({
	__esModule: true,
	default: jest.fn(),
	initTranslations: jest.fn(),
}))

describe('TranslationsProvider', () => {
	it('should render children and initialize i18n with given locale and namespaces', () => {
		const mockInitTranslations = initTranslations

		render(
			<TranslationsProvider
				locale='en'
				namespaces={['common']}
			>
				<div>Test Content</div>
			</TranslationsProvider>
		)

		expect(screen.getByText('Test Content')).toBeInTheDocument()

		expect(mockInitTranslations).toHaveBeenCalledWith(
			'en',
			['common'],
			expect.any(Object),
			undefined
		)

		expect(createInstance).toHaveBeenCalled()
	})
})
