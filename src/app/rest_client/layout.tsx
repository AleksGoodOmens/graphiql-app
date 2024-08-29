import { RestForm } from '@/components'
import { Box, Container, Typography } from '@mui/material'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import ParamsSection from './paramsSection'

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
		<Box component={'main'}>
			<Container maxWidth={'xl'}>
				<Typography
					variant='h1'
					component={'h1'}
				>
					Rest Client page
				</Typography>
				<RestForm />
				<ParamsSection />
			</Container>
			{children}
		</Box>
	)
}
