import { RestForm } from '@/components'
import { Container, Typography } from '@mui/material'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Headers } from './Headers'
import { Params } from './Params'

export const metadata: Metadata = {
	title: 'CodeADE - Rest client',
	description: 'The page with rest client form',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<Container
			component={'main'}
			maxWidth={'xl'}
		>
			<Typography
				variant='h1'
				component={'h1'}
			>
				Rest Client page
			</Typography>
			<RestForm />
			<Params />
			<Headers />
			{children}
		</Container>
	)
}
