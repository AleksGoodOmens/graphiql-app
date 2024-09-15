'use client'
import { Button, Container, Grid, Typography } from '@mui/material'
import Link from 'next/link'

function HistoryPage() {
	return (
		<Container>
			<Typography
				variant='h1'
				component={'h1'}
			>
				You haven`t executed any requests It`s empty here. Try:
			</Typography>
			<Grid
				container
				gap={2}
			>
				<Button variant='contained'>
					<Link href='/'>home</Link>
				</Button>
				<Button
					variant='contained'
					color='success'
				>
					<Link href='/rest_client'>Rest client</Link>
				</Button>
			</Grid>
		</Container>
	)
}

export default HistoryPage
