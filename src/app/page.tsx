'use client'

import { ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/config'
import Link from 'next/link'
import Button from '@mui/material/Button'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Login from '@mui/icons-material/Login'

export default function Home({ children }: { children: ReactNode }) {
	const [user] = useAuthState(auth)

	return (
		<main>
			<h1>CodeADE API Explorer</h1>
			{user ? (
				<div className='main-wrapper'>
					<h2>Welcome Back, {user.email}!</h2>
					<div className='main-links'>
						<Link href='/rest_client'>REST Client</Link>
						<p>GraphiQL Client</p>
						<p>History</p>
					</div>
				</div>
			) : (
				<div className='main-buttons'>
					<Button
						variant='contained'
						startIcon={<Login />}
						href='/signin'
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
						href='/signup'
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
