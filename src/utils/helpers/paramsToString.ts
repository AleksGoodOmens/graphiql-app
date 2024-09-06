import { IKeyValueID, objectWithKeys } from '@/lib'

export const paramsToString = (params: objectWithKeys[]) => {
	const newStringParams = params
		.map((param) => {
			const key = Object.keys(param)[0]
			const value = param[key]

			return `${key}=${encodeURIComponent(value)}`
		})
		.join('&')
	return newStringParams
}

export const headersArrayToHeadersObj = (params: IKeyValueID[]) => {
	const headersObj: objectWithKeys = {}
	params.forEach((param) => {
		const key = param.key
		const value = param.value

		headersObj[key] = value

		return `${key}=${encodeURIComponent(value)}`
	})

	console.log(headersObj)

	return headersObj
}

export const createUrlSearchParams = (params: IKeyValueID[]) => {
	const newStringParams = params
		.map((param) => {
			const key = param.key
			const value = param.value

			return `${key}=${encodeURIComponent(value)}`
		})
		.join('&')
	return newStringParams
}
