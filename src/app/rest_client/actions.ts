'use server'

import { objectWithKeys } from '@/lib'
import { paramsToString } from '@/utils'

export interface IFetchData {
	HTTPMethod: string
	RequestUrl: string
	body: string
	headers: objectWithKeys
}

const methodWithoutBody = ['POST', 'PUT', 'PATCH', 'DELETE']

export const fetchData = async ({
	HTTPMethod,
	RequestUrl,
	headers,
	body,
}: IFetchData): Promise<string> => {
	const configureOptions = () => {
		console.log(!methodWithoutBody.includes(HTTPMethod))
		if (methodWithoutBody.includes(HTTPMethod)) {
			return {
				method: HTTPMethod,
				headers: headers as HeadersInit,
				body: body,
			}
		}
		return {
			method: HTTPMethod,
			headers: headers as HeadersInit,
		}
	}

	const options = configureOptions()

	console.log(options)

	try {
		const response = await fetch(RequestUrl, options)

		const data = await response.json()

		const encodedData = btoa(encodeURIComponent(JSON.stringify(data)))
		const returnedValue = paramsToString([
			{ status: response.status },
			{ statusText: response.statusText },
			{ data: encodedData },
		])
		return returnedValue
	} catch (error: unknown) {
		if (error instanceof Error) {
			const returnedValue = paramsToString([
				{ status: 500 },
				{
					statusText: '"HTTP Error 500" or "Internal Server Error"',
				},
				{ error: error.message },
			])

			return returnedValue
		}
		const returnedValue = paramsToString([
			{ status: 500 },
			{
				statusText: '"HTTP Error 500" or "Internal Server Error"',
			},
			{ error: 'I don`t know what happened here' },
		])

		return returnedValue
	}
}
