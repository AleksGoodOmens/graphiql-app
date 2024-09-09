'use server'

import { objectWithKeys } from '@/lib'

export interface IFetchData {
	HTTPMethod: string
	RequestUrl: string
	headers: objectWithKeys
}

export const fetchDataWithoutBody = async ({
	HTTPMethod,
	RequestUrl,
	headers,
}: IFetchData): Promise<{
	status: number
	statusText: string
	data: string
}> => {
	const options = {
		method: HTTPMethod,
		headers: headers as HeadersInit,
	}

	try {
		const response = await fetch(RequestUrl, options)

		const data = await response.json()

		const encodedData = JSON.stringify(data, null, 2)

		const returnedValue = {
			status: response.status,
			statusText: response.statusText,
			data: encodedData,
		}

		return returnedValue
	} catch (error: unknown) {
		if (error instanceof Error) {
			const returnedValue = {
				status: 500,
				statusText: error.message,
				data: '"HTTP Error 500" or "Internal Server Error"',
			}

			return returnedValue
		}
		const returnedValue = {
			status: 500,
			statusText: 'error',
			data: '"HTTP Error 500" or "Internal Server Error"',
		}

		return returnedValue
	}
}
