import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { ContextProviders } from '@/providers'
import { Footer, Header } from '@/components'
import TranslationsProvider from '@/components/TranslationsProvider'
import initTranslations from '../i18n'

export const metadata: Metadata = {
	title: 'CodeADE',
	description: 'Project developed by Darya, Egor, Aleks',
}

interface RootLayoutProps {
	children: ReactNode
	params: {
		locale: string
	}
}

const i18nNamespaces = ['home', 'common', 'form']

export default async function RootLayout({
	children,
	params,
}: RootLayoutProps) {
	const { locale } = params
	const { resources } = await initTranslations(locale, i18nNamespaces)
	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<ContextProviders>
				<html lang='en'>
					<body>
						<Header />
						{children}
						<Footer />
					</body>
				</html>
			</ContextProviders>
		</TranslationsProvider>
	)
}
