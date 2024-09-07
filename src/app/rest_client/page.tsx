'use client'

import { auth } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from '../loading'

export default function RestClientPage() {
	const [user, loading] = useAuthState(auth)
	const router = useRouter()

	useEffect(() => {
		if (!user) router.replace('/signup')
	}, [user])

	return loading ? <Loading /> : <></>
}
