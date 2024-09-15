import { i18nRouter } from 'next-i18n-router'
import { NextRequest } from 'next/server'
import { middleware } from '@/middleware'

jest.mock('next-i18n-router', () => ({
	i18nRouter: jest.fn(),
}))

describe('Middleware', () => {
	it('should call i18nRouter with correct arguments', () => {
		const mockRequest = {} as NextRequest

		middleware(mockRequest)

		expect(i18nRouter).toHaveBeenCalledWith(mockRequest, {
			defaultLocale: 'en',
			locales: ['en', 'ru'],
			prefixDefault: true,
		})
	})
})
