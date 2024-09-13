'use client'

import styles from './Header.module.css'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth'
import { AccountCircle, Login, Logout, Home } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeContext } from '@/providers/ThemeContext'
import logo from '../../assets/logo.svg'
import Image from 'next/image'

export function Header() {
	const [user] = useAuthState(auth)
	const router = useRouter()
	const { mode, toggleTheme } = useContext(ThemeContext)
	const [buttonText, setButtonText] = useState('Русский')

	const handleClick = () => {
		setButtonText((prevText) =>
			prevText === 'Русский' ? 'English' : 'Русский'
		)
	}

	const handleLogOut = () => {
		signOut(auth)
		router.push('/')
	}

	return (
		<header>
			<div className={styles['header-wrapper']}>
				<div className={styles.logo}>
					<Image
						priority
						width={50}
						src={logo as string}
						alt='Logo'
					/>
				</div>
				<div className={styles['header-buttons']}>
					{user ? (
						<div className={styles['header-buttons__account']}>
							<Button
								onClick={handleLogOut}
								variant='contained'
								startIcon={<Logout />}
								color='primary'
								size='small'
							>
								Sign Out
							</Button>
							<Button
								onClick={() => router.push('/')}
								startIcon={<Home />}
								variant='contained'
								color='error'
								size='small'
							>
								Main
							</Button>
						</div>
					) : (
						<div className={styles['header-buttons__account']}>
							<Button
								variant='contained'
								startIcon={<Login />}
								onClick={() => router.push('/signin')}
								color='primary'
								size='small'
							>
								Sign In
							</Button>
							<Button
								variant='contained'
								startIcon={<AccountCircle />}
								onClick={() => router.push('/signup')}
								color='error'
								size='small'
							>
								Sign Up
							</Button>
						</div>
					)}
					<div className={styles['header-buttons__mode']}>
						<Button
							variant='contained'
							onClick={toggleTheme}
							size='small'
							color={mode === 'dark' ? 'success' : 'secondary'}
						>
							{mode === 'dark' ? 'light' : 'dark'}
						</Button>
						<Button
							variant='contained'
							size='small'
							color={mode === 'dark' ? 'success' : 'secondary'}
							onClick={handleClick}
						>
							{buttonText}
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}
