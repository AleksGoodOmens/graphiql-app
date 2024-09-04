'use client'

import styles from './Header.module.css'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth'
import { AccountCircle, Login, Logout } from '@mui/icons-material'
import { Button, FormControlLabel, Switch } from '@mui/material'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeContext } from '@/providers/ThemeContext/ThemeContext'

export function Header() {
	const [user] = useAuthState(auth)
	const [checked, setChecked] = useState(true)
	const router = useRouter()
	const { mode, toggleTheme } = useContext(ThemeContext)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked)
	}

	const handleLogOut = () => {
		signOut(auth)
		router.push('/')
	}

	return (
		<header>
			<div className={styles['header-wrapper']}>
				<div className={styles.logo}>Logo</div>
				<div className={styles['header-buttons']}>
					{user ? (
						<Button
							onClick={handleLogOut}
							variant='contained'
							startIcon={<Logout />}
							style={{
								backgroundColor: '#D25B01',
								borderColor: '#D25B01',
								color: '#FFFFE0',
							}}
						>
							Sign Out
						</Button>
					) : (
						<div className={styles['header-buttons__account']}>
							<Button
								variant='contained'
								startIcon={<Login />}
								onClick={() => router.push('/signin')}
								style={{
									backgroundColor: '#D25B01',
									borderColor: '#D25B01',
									color: '#FFFFE0',
								}}
								size='small'
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
								size='small'
							>
								Sign Up
							</Button>
						</div>
					)}
					{
						<Button
							variant='contained'
							onClick={toggleTheme}
						>
							change theme to: {mode === 'dark' ? 'light' : 'dark'}
						</Button>
					}
					<FormControlLabel
						control={
							<Switch
								checked={checked}
								onChange={handleChange}
								sx={{
									'& .Mui-checked': {
										'& .MuiSwitch-thumb': {
											backgroundColor: '#807622',
										},
									},
									'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
										backgroundColor: '#807622',
									},
									'& .MuiSwitch-switchBase.Mui-checked': {
										'&:hover': {
											backgroundColor: '#c4be875a',
										},
									},
								}}
							/>
						}
						label={checked ? 'English' : 'Русский'}
						sx={{
							'& .MuiFormControlLabel-label': {
								fontFamily: 'Oxygen, sans-serif',
								fontWeight: '300',
							},
						}}
					/>
				</div>
			</div>
		</header>
	)
}
