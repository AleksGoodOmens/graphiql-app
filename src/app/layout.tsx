import type { Metadata } from 'next'
import { Oxygen } from 'next/font/google'
import './globals.css'
import { ReactNode, Suspense } from 'react'
import { StoreProvider } from '@/providers'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Loading from './loading'

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
					<Suspense fallback={<Loading />}>{children}</Suspense>
					<Footer />
				</body>
			</html>
		</StoreProvider>
	)
}
