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
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div>
			<h2>Something went wrong!</h2>
			<Button
				variant='contained'
				onClick={
					// Attempt to recover by trying to re-render the segment

					() => {
						reset()
						router.push('/')
					}
				}
			>
				Try again
			</Button>
		</div>
	)
}
