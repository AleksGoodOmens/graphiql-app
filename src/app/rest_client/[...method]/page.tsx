import { Typography } from '@mui/material'
import { fetchData } from './actions'
import { objectWithKeys } from '@/lib'
import { ResponseViewer } from './ResponseViewer'

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
			const decodedBody = decodeURIComponent(atob(params.method[2]))
			fetchOptions['body'] = decodedBody
		}

		return await fetchData(fetchOptions)
	}

	const { body, code, statusCode } = await getData()

	return (
		<section>
			<Typography
				textAlign={'center'}
				variant='h2'
				component={'h2'}
			>
				Response
			</Typography>
			<ResponseViewer
				code={code}
				body={body}
				statusCode={statusCode}
			/>
		</section>
	)
}
