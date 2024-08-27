'use client'

import './Header.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth'
import { AccountCircle, Login, Logout } from '@mui/icons-material'
import { Button, FormControlLabel, Switch } from '@mui/material'

export default function Header() {
	const [user] = useAuthState(auth)
	return (
		<header>
			<div className='header-wrapper'>
				<div className='logo'>Logo</div>
				<div className='header-buttons'>
					{user ? (
						<Button
							onClick={() => signOut(auth)}
							variant='contained'
							startIcon={<Logout />}
							href='/'
							style={{
								backgroundColor: '#D25B01',
								borderColor: '#D25B01',
								color: '#FFFFE0',
							}}
						>
							Sign Out
						</Button>
					) : (
						<div className='header-buttons__account'>
							<Button
								variant='contained'
								startIcon={<Login />}
								href='/signin'
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
								href='/signup'
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
					<FormControlLabel
						control={<Switch defaultChecked />}
						label='English'
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
