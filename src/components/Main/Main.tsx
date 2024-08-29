'use client'

import styles from './Main.module.css'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { ReactNode } from 'react'
import Loading from '@/app/loading'
import Link from 'next/link'
import { Button } from '@mui/material'
import { AccountCircle, Login } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export default function Main({ children }: { children: ReactNode }) {
	const [user, loading] = useAuthState(auth)
	const router = useRouter()

	if (loading) {
		return <Loading />
	}

	return (
		<main className={styles.main}>
			<h1>CodeADE API Explorer</h1>
			{user ? (
				<div className={styles['main-wrapper']}>
					<h2>Welcome Back, {user.email}!</h2>
					<div className={styles['main-links']}>
						<Link href='/rest_client'>REST Client</Link>
						<p>GraphiQL Client</p>
						<p>History</p>
					</div>
				</div>
			) : (
				<div className={styles['main-buttons']}>
					<Button
						variant='contained'
						startIcon={<Login />}
						onClick={() => router.push('/signin')}
						style={{
							backgroundColor: '#D25B01',
							borderColor: '#D25B01',
							color: '#FFFFE0',
						}}
					>
						Sign In
					</Button>
					<Button
						variant='contained'
						startIcon={<AccountCircle />}
						onClick={() => router.push('/signup')}
						style={{
							backgroundColor: '#5B1C02',
							borderColor: '#5B1C02',
							color: '#FFFFE0',
						}}
					>
						Sign Up
					</Button>
				</div>
			)}
			<div>{children}</div>
		</main>
	)
}
