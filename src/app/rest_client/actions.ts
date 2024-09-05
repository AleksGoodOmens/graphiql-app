'use server'

import { paramsToString } from '@/utils'

export interface IFetchData {
	HTTPMethod: string
	RequestUrl: string
}

export const fetchData = async ({
	HTTPMethod,
	RequestUrl,
}: IFetchData): Promise<string> => {
	try {
		const response = await fetch(RequestUrl, {
			method: HTTPMethod,
		})

		const data = await response.text()

		const encodedData = btoa(data)
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
