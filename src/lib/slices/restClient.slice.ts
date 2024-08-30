import { paramsToString } from '@/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type INewParams = INewParam[]

export interface INewParam {
	id?: number
	key: string
	value: string
}

export interface IRestClientResponse {
	code: number
	statusCode: string
	message: string | boolean
	body: string
}

export interface IRestClientInitialState {
	url: string
	baseUrl: string
	isLoading: boolean
	isError: boolean
	response: IRestClientResponse
	newParams: INewParams
}

const initialState: IRestClientInitialState = {
	url: '',
	baseUrl: '',
	newParams: [],
	isLoading: false,
	isError: false,
	response: {
		code: 0,
		statusCode: '',
		message: '',
		body: '',
	},
}
const restClientSlice = createSlice({
	name: 'restClient',
	initialState,
	reducers: {
		setUrl(state, { payload }: PayloadAction<string>) {
			if (payload.includes('https://') && payload.length > 10) {
				const url = new URL(payload)
				const params = [...url.searchParams].map((p) => ({
					key: p[0],
					value: p[1],
				}))
				state.baseUrl = `${url.protocol}//${url.host}${url.pathname}`
				state.newParams = params

				const paramsString = paramsToString(params)
				state.url = state.baseUrl + (paramsString ? `?${paramsString}` : '')
			} else {
				state.url = payload
			}
		},
		setResponse(state, { payload }: PayloadAction<IRestClientResponse>) {
			state.response = payload
		},

		addParam(
			state: IRestClientInitialState,
			{ payload }: PayloadAction<INewParam>
		) {
			state.newParams.push(payload)
			const paramsString = paramsToString(state.newParams)
			state.url = state.baseUrl + (paramsString ? `?${paramsString}` : '')
		},
		delParam(state, { payload }: PayloadAction<number>) {
			const updatedParams = state.newParams.filter((_, i) => i !== payload)

			state.newParams = updatedParams
			const paramsString = paramsToString(updatedParams)
			state.url = state.baseUrl + (paramsString ? `?${paramsString}` : '')
		},
		updateParam(state, { payload }: PayloadAction<INewParam>) {
			const updatedParams = state.newParams.map((p, i) => {
				if (i === payload.id) {
					p.key = payload.key
					p.value = payload.value
				}
				return p
			})

			const paramsString = paramsToString(updatedParams)

			state.url = state.baseUrl + (paramsString ? `?${paramsString}` : '')
		},
	},
})

export const { setUrl, setResponse, addParam, delParam, updateParam } =
	restClientSlice.actions

export default restClientSlice.reducer
