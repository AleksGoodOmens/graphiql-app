import initTranslations from '@/app/i18n'
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import i18nConfig from '../../../i18nConfig'

jest.mock('i18next', () => ({
	createInstance: jest.fn(),
}))
jest.mock('i18next-resources-to-backend', () => jest.fn())
jest.mock('react-i18next/initReactI18next', () => ({
	initReactI18next: jest.fn(),
}))

describe('initTranslations', () => {
	it('should initialize i18n instance with provided locale and namespaces', async () => {
		const mockI18nInstance = {
			use: jest.fn().mockReturnThis(),
			init: jest.fn().mockResolvedValue(true),
			services: {
				resourceStore: {
					data: {},
				},
			},
			t: jest.fn().mockReturnValue('test translation'),
		}
		;(createInstance as jest.Mock).mockReturnValue(mockI18nInstance)

		const locale = 'en'
		const namespaces = ['common']

		const result = await initTranslations(locale, namespaces)

		expect(mockI18nInstance.use).toHaveBeenCalledWith(expect.any(Function))
		expect(resourcesToBackend).toHaveBeenCalledWith(expect.any(Function))

		expect(mockI18nInstance.init).toHaveBeenCalledWith({
			lng: locale,
			resources: undefined,
			fallbackLng: i18nConfig.defaultLocale,
			supportedLngs: i18nConfig.locales,
			defaultNS: namespaces[0],
			fallbackNS: namespaces[0],
			ns: namespaces,
			preload: i18nConfig.locales,
		})

		expect(result).toEqual({
			i18n: mockI18nInstance,
			resources: mockI18nInstance.services.resourceStore.data,
			t: mockI18nInstance.t,
		})
	})

	it('should load resources dynamically when not provided', async () => {
		const mockI18nInstance = {
			use: jest.fn().mockReturnThis(),
			init: jest.fn().mockResolvedValue(true),
			services: {
				resourceStore: {
					data: {},
				},
			},
			t: jest.fn().mockReturnValue('test translation'),
		}
		;(createInstance as jest.Mock).mockReturnValue(mockI18nInstance)

		const locale = 'en'
		const namespaces = ['common']

		await initTranslations(locale, namespaces)

		expect(resourcesToBackend).toHaveBeenCalledWith(expect.any(Function))
	})
})
