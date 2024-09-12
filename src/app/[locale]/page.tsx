'use client'

import Main from '@/components/Main/Main'
import { ReactNode, useEffect, useState } from 'react'

export default function Home({ children }: { children: ReactNode }) {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])
	return isClient && <Main>{children}</Main>
}
