'use client'

import styles from './Main.module.css'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { ReactNode } from 'react'
import { Button } from '@mui/material'
import { AccountCircle, Login } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import checkTokenExpiration from '@/utils/helpers/checkTokenExpiration'
import { signOut } from 'firebase/auth'

export default function Main({ children }: { children: ReactNode }) {
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

	return loading ? (
		<Loading />
	) : (
		<main className={styles.main}>
			<h1>CodeADE API Explorer</h1>
			{user ? (
				<div className={styles['main-wrapper']}>
					<h2>Welcome Back, {user?.email}!</h2>
					<div className={styles['main-links']}>
						<Button
							onClick={() => router.push('/rest_client')}
							variant='contained'
							color='success'
						>
							REST Client
						</Button>
						<Button
							variant='contained'
							color='success'
						>
							GraphiQL Client
						</Button>
						<Button
							variant='contained'
							color='success'
						>
							History
						</Button>
					</div>
				</div>
			) : (
				<div className={styles['main-buttons']}>
					<Button
						variant='contained'
						startIcon={<Login />}
						onClick={() => router.push('/signin')}
						color='primary'
					>
						Sign In
					</Button>
					<Button
						variant='contained'
						startIcon={<AccountCircle />}
						onClick={() => router.push('/signup')}
						color='error'
					>
						Sign Up
					</Button>
				</div>
			)}
			<div>{children}</div>
		</main>
	)
}
