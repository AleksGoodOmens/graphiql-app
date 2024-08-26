'use client'

import Link from 'next/link'
import './Header.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth'

export default function Header() {
	const [user] = useAuthState(auth)
	return (
		<header>
			<div className='header-wrapper'>
				<div className='logo'>Logo</div>
				<div className='header-buttons'>
					{user ? (
						<Link
							href='/'
							onClick={() => signOut(auth)}
						>
							Sign Out
						</Link>
					) : (
						<Link href='/signin'>Sign In</Link>
					)}
					<div>Language Toggle</div>
				</div>
			</div>
		</header>
	)
}
