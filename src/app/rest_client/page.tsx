import { RestForm, RestResponseBody } from '@/components'
import { fetchData, IFetchData } from './actions'
import { Box, Container, Typography } from '@mui/material'
import ParamsSection from './paramsSection'

export interface JsonObject {
	[key: string]: string
}
export default function RestClientPage() {
	const fetchDataServerAction = async (data: IFetchData) => {
		'use server'

		const response = await fetchData(data)

		const parsedResponse: JsonObject = await response.json()

		const stringifyBody = JSON.stringify(parsedResponse)

		return {
			code: response.status,
			statusCode: response.statusText,
			message: response.ok,
			body: stringifyBody,
		}
	}
	return (
		<Box component={'main'}>
			<Container maxWidth={'xl'}>
				<Typography
					variant='h1'
					component={'h1'}
				>
					Rest Client page
				</Typography>
				<RestForm onSubmit={fetchDataServerAction} />
				<ParamsSection />

				<RestResponseBody />
			</Container>
		</Box>
	)
}
