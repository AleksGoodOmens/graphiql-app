'use client'
import { restClientSelector, useAppSelector } from '@/lib'
import { Box, List, ListItem, Typography } from '@mui/material'

export const RestResponseBody = () => {
	const { response } = useAppSelector(restClientSelector)

	const { body, code, message, statusCode } = response
	return (
		<Box mt={4}>
			<Typography
				textAlign={'center'}
				variant='h2'
				component={'h2'}
			>
				Response
			</Typography>
			<Box>
				<Typography
					variant='h3'
					component={'h3'}
				>
					Status
				</Typography>
				<List>
					<ListItem>code: {code}</ListItem>
					<ListItem>statusCode: {statusCode}</ListItem>
					<ListItem>message: {message}</ListItem>
				</List>
			</Box>
			<Box>
				<Typography
					variant='h3'
					component={'h3'}
				>
					{body}
				</Typography>
			</Box>
		</Box>
	)
}
