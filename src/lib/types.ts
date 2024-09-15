export interface IKeyValue {
	key: string
	value: string
}

export interface IKeyValueID extends IKeyValue {
	id: number
}

export interface IRestClientResponse {
	code: number
	statusCode: string
	message: string | boolean
	body: string
}

export type objectWithKeys = {
	[key: string]: string | number
}

export interface IRestClientInitialState {
	url: string
	baseUrl: string
	isLoading: boolean
	isError: boolean
	params: IKeyValueID[]
	headers: IKeyValueID[]
	body: string
}

export interface IFetchData {
	HTTPMethod: string
	RequestUrl: string
	body: string
	headers: objectWithKeys
}
