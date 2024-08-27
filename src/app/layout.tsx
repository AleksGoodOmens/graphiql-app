import type { Metadata } from 'next'
import { Oxygen } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { StoreProvider } from '@/providers'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const oxygen = Oxygen({ weight: '300', subsets: ['latin'] })

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
		<StoreProvider>
			<html lang='en'>
				<body className={oxygen.className}>
					<Header />
					{children}
					<Footer />
				</body>
			</html>
		</StoreProvider>
	)
}
