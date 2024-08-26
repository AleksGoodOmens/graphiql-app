'use client'

import { Button } from '@/components'
import { ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/config'
import Link from 'next/link'

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
						href='/signin'
						name='Sign In'
					/>
					<Button
						href='/signup'
						name='Sign Up'
					/>
				</div>
			)}
			<div>{children}</div>
		</main>
	)
}
