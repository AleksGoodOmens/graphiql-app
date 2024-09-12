'use client'

import styles from './Main.module.css'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { ReactNode } from 'react'
import { Button } from '@mui/material'
import { AccountCircle, Login } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import Loading from '@/app/[locale]/loading'
import checkTokenExpiration from '@/utils/helpers/checkTokenExpiration'
import { signOut } from 'firebase/auth'
import { useTranslation } from 'react-i18next'

export default function Main({ children }: { children: ReactNode }) {
	const { t } = useTranslation()
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
			<h1>{t('mainHeading')}</h1>
			{user ? (
				<div className={styles['main-wrapper']}>
					<h2>
						{t('greeting')}, {user?.email}!
					</h2>
					<div className={styles['main-links']}>
						<Button
							onClick={() => router.push('/rest_client')}
							variant='contained'
							color='success'
						>
							REST {t('client')}
						</Button>
						<Button
							variant='contained'
							color='success'
						>
							GraphiQL {t('client')}
						</Button>
						<Button
							variant='contained'
							color='success'
						>
							{t('history')}
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
						{t('common:buttonSignin')}
					</Button>
					<Button
						variant='contained'
						startIcon={<AccountCircle />}
						onClick={() => router.push('/signup')}
						color='error'
					>
						{t('common:buttonSignup')}
					</Button>
				</div>
			)}
			<div>{children}</div>
		</main>
	)
}
