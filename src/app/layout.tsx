import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { ContextProviders } from '@/providers'

import { Footer, Header } from '@/components'

export const metadata: Metadata = {
	title: 'CodeADE',
	description: 'Project developed by Darya, Egor, Aleks',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<ContextProviders>
			<html lang='en'>
				<body>
					<Header />
					{children}
					<Footer />
				</body>
			</html>
		</ContextProviders>
	)
}
