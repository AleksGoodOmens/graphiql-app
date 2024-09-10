import { Editor } from '@/components'
import { Box, Grid, List, ListItem, Typography } from '@mui/material'
import { fetchData } from './actions'
import { objectWithKeys } from '@/lib'

interface IResponsePageParams {
	params: {
		method: string[]
	}
	searchParams: objectWithKeys
}
export default async function ResponsePage({
	params,
	searchParams,
}: IResponsePageParams) {
	const getData = async () => {
		'use server'
		const method = params.method[0]
		const decodedUrl = atob(decodeURIComponent(params.method[1]))

		const fetchOptions = {
			HTTPMethod: method,
			RequestUrl: decodedUrl,
			headers: searchParams,
			body: '',
		}

		if (params.method[2]) {
			console.log(params.method[2], 'page ------------------------')
			const decodedBody = decodeURIComponent(atob(params.method[2]))
			fetchOptions['body'] = decodedBody
		}

		console.log(fetchOptions)

		return await fetchData(fetchOptions)
	}

	const data = await getData()

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
							Status Code: <span>{data.code}</span>
						</ListItem>
						<ListItem
							sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
						>
							Status Text: <span>{data.statusCode}</span>
						</ListItem>
					</List>
				</Box>
				<Box>
					<Typography
						variant='h4'
						component={'h3'}
					></Typography>
					<Editor value={data.body} />
				</Box>
			</Grid>
		</Box>
	)
}
