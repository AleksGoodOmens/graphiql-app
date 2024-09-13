'use server'

import { IFetchData, IRestClientResponse } from '@/lib'

const methodWithBody = ['POST', 'PUT', 'PATCH', 'DELETE']

export const fetchData = async ({
	HTTPMethod,
	RequestUrl,
	headers,
	body,
}: IFetchData): Promise<IRestClientResponse> => {
	const configureOptions = () => {
		const options: RequestInit = {
			method: HTTPMethod,
			headers: headers as HeadersInit,
		}

		if (methodWithBody.includes(HTTPMethod) && body) {
			options.body = body
		}

		return options
	}

	const options = configureOptions()

	try {
		const response = await fetch(RequestUrl, options)

		let data: unknown
		try {
			data = await response.json()
		} catch {
			data = await response.text()
		}

		const encodedData = JSON.stringify(data)

		return {
			code: response.status,
			statusCode: response.statusText,
			body: encodedData,
			message: 'done',
		}
	} catch (error) {
		return {
			code: 500,
			statusCode: '"HTTP Error 500" or "Internal Server Error"',
			body: '',
			message: 'error',
		}
	}
}
