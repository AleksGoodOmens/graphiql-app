'use client'

import { RequestForm } from '@/components'
import { Container, Typography } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { RequestEditor } from './RequestEditor'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import Loading from '../loading'

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	const [user, loading] = useAuthState(auth)
	const router = useRouter()

	useEffect(() => {
		if (!user) router.replace('/signup')
	}, [user])
	return loading ? (
		<Loading />
	) : (
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
			<RequestForm />
			<RequestEditor />
			{children}
		</Container>
	)
}
