import { IKeyValueID } from '@/lib'

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
