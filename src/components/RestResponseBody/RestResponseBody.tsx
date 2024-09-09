'use client'
import { Box, Grid, List, ListItem, Typography } from '@mui/material'
import { Editor } from '../Editor/Editor'

export interface IRestResponseBody {
	status: number
	statusText: string
	data: string
}

export const RestResponseBody = ({
	status,
	statusText,
	data,
}: IRestResponseBody) => {
	return (
		<Box mt={4}>
			<Typography
				textAlign={'center'}
				variant='h2'
				component={'h2'}
			></Typography>
			<Grid
				container
				sx={{ placeContent: 'center', gap: 2 }}
			>
				<Box>
					<Typography
						variant='h4'
						component={'h3'}
					>
						Status
					</Typography>
					<List>
						<ListItem
							sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
						>
							Status Code: <span>{status}</span>
						</ListItem>
						<ListItem
							sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
						>
							Status Text: <span>{statusText}</span>
						</ListItem>
					</List>
				</Box>
				<Box>
					<Typography
						variant='h4'
						component={'h3'}
					></Typography>
					<Editor value={data} />
				</Box>
			</Grid>
		</Box>
	)
}
