'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export default function AccountLayout({ children }: { children: ReactNode }) {
	const { t } = useTranslation()

	const path = usePathname()

	return (
		<main>
			{path.includes('signup') ? (
				<h2>{t('formHeadingSignup')}</h2>
			) : (
				<h2>{t('formHeadingSignin')}</h2>
			)}
			{children}
		</main>
	)
}
