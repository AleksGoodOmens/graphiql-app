import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'CodeADE - Rest client',
	description: 'The page with rest client form',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return <>{children}</>
}
