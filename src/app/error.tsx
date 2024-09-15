'use client'

import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	const router = useRouter()
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div>
			<h2>Something went wrong!</h2>
			<Button
				variant='contained'
				onClick={() => {
					reset()
					router.push('/')
				}}
			>
				Try again
			</Button>
		</div>
	)
}
