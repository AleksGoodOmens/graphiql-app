'use client'

import { RequestForm } from '@/components'
import { Container, Typography } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { RequestEditor } from './RequestEditor'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import Loading from '../loading'
import checkTokenExpiration from '@/utils/helpers/checkTokenExpiration'
import { signOut } from 'firebase/auth'

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	const [user, loading] = useAuthState(auth)
	const router = useRouter()

	if (user) {
		user.getIdTokenResult().then((idTokenResult) => {
			const expirationDate = idTokenResult.expirationTime
			const expired = checkTokenExpiration(expirationDate)
			if (expired) {
				signOut(auth)
				router.push('/')
			}
		})
	}

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
