interface IParams {
	key: string
	value: string
}

export const paramsToString = (params: IParams[]) => {
	const newStringParams = params.reduce((acc, p, i) => {
		if (i === 0) {
			acc = `?${p.key}=${p.value}`
			return acc
		}
		acc += `&${p.key}=${p.value}`
		return acc
	}, '')
	return newStringParams
}
