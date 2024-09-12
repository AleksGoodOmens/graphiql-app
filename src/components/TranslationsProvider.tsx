'use client'

import { I18nextProvider } from 'react-i18next'
import initTranslations, { TranslationResources } from '@/app/i18n'
import { createInstance, i18n as I18n } from 'i18next'
import { ReactNode } from 'react'

type TranslationsProviderProps = {
	children: ReactNode
	locale: string
	namespaces: string[]
	resources?: TranslationResources
}

const TranslationsProvider: React.FC<TranslationsProviderProps> = ({
	children,
	locale,
	namespaces,
	resources,
}) => {
	const i18n: I18n = createInstance()

	initTranslations(locale, namespaces, i18n, resources)

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export default TranslationsProvider
