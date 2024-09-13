import { IKeyValueID, objectWithKeys } from '@/lib'

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
