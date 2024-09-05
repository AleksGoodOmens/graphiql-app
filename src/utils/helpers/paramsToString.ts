import { objectWithKeys } from '@/lib'

export const paramsToString = (params: objectWithKeys[]) => {
	console.log(params)
	const newStringParams = params
		.map((param) => {
			const key = Object.keys(param)[0]
			const value = param[key]

			return `${key}=${encodeURIComponent(value)}`
		})
		.join('&')
	return newStringParams
}
