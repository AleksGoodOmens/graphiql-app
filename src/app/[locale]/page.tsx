'use client'

import Main from '@/components/Main/Main'
import { useEffect, useState } from 'react'

export default function Home() {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])
	return isClient && <Main></Main>
}
