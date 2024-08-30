export interface IFetchData {
	HTTPMethod: string
	RequestUrl: string
}
interface IFetchDataResponse {
	status: number
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any
	error?: string | unknown
}

export const fetchData = async ({
	HTTPMethod,
	RequestUrl,
}: IFetchData): Promise<IFetchDataResponse> => {
	try {
		const response = await fetch(RequestUrl, {
			method: HTTPMethod,
		})

		const data = await response.json()

		return {
			status: response.status,
			data: response.ok ? data : null,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			error: response.ok ? undefined : data?.message || 'Error fetching data', // сообщение об ошибке
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			return {
				status: 500,
				data: null,
				error: error.message || 'Unknown error',
			}
		}
		return {
			status: 500,
			data: null,
			error,
		}
	}
}
