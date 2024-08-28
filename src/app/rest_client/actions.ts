export interface IFetchData {
	HTTPMethod: string
	RequestUrl: string
}

export const fetchData = async ({ HTTPMethod, RequestUrl }: IFetchData) => {
	const response = await fetch(RequestUrl, {
		method: HTTPMethod,
	})

	return response
}
