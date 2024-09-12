import { Typography } from '@mui/material'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'rest - CodeAde',
	description: 'The page with rest client form',
}

export default function RestClientPage() {
	return (
		<Typography
			variant='body1'
			sx={{ textAlign: 'center' }}
		>
			Please fill the from above
		</Typography>
	)
}
