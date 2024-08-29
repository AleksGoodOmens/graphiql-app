interface IParams {
	key: string
	value: string
}

export const paramsToString = (params: IParams[]) => {
	const newStringParams = params
		.map(
			(param) =>
				`${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`
		)
		.join('&')
	return newStringParams
}
