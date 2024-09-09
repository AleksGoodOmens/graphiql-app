import { RestResponseBody } from '@/components/RestResponseBody/RestResponseBody'
import { objectWithKeys } from '@/lib'
import { fetchDataWithoutBody } from './action'

interface IUrlParams {
	params: { url: string; method: string }
	searchParams: objectWithKeys
}
async function UrlPage({ params, searchParams }: IUrlParams) {
	const decodedUrl = atob(decodeURIComponent(params.url))

	const data = await fetchDataWithoutBody({
		HTTPMethod: params.method,
		RequestUrl: decodedUrl,
		headers: searchParams,
	})

	console.log(searchParams)

	console.log(data)

	return (
		<RestResponseBody
			status={data.status}
			statusText={data.statusText}
			data={data.data}
		/>
	)
}

export default UrlPage
