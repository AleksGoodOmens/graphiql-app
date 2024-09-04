import { paramsToString } from '@/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	IKeyValue,
	IKeyValueID,
	IRestClientInitialState,
	IRestClientResponse,
} from '../types'

const initialState: IRestClientInitialState = {
	url: '',
	baseUrl: '',
	newParams: [],
	headers: [
		{ key: 'Content-Type', value: 'application/json', id: 0 },
		{ key: 'Accept', value: 'application/json', id: 1 },
	],
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
				const params = [...url.searchParams].map((p: [string, string]) => ({
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
			{ payload }: PayloadAction<IKeyValue>
		) {
			state.newParams = [...state.newParams, payload]
			const paramsString = paramsToString(state.newParams)
			state.url = state.baseUrl + (paramsString ? `?${paramsString}` : '')
		},
		delParam(state, { payload }: PayloadAction<number>) {
			const updatedParams = state.newParams.filter((_, i) => i !== payload)

			state.newParams = updatedParams
			const paramsString = paramsToString(updatedParams)
			state.url = state.baseUrl + (paramsString ? `?${paramsString}` : '')
		},
		updateParam(state, { payload }: PayloadAction<IKeyValueID>) {
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

		addHeader(
			state: IRestClientInitialState,
			{ payload }: PayloadAction<IKeyValue>
		) {
			state.isLoading = true
			state.headers = [
				...state.headers,
				{ ...payload, id: state.headers.length },
			]
			state.isLoading = false
		},
		delHeader(state, { payload }: PayloadAction<number>) {
			state.headers = state.headers.filter((h) => h.id !== payload)
		},
		updateHeader(state, { payload }: PayloadAction<IKeyValueID>) {
			state.headers = state.headers.map((p) => {
				console.log(p.id === payload.id)
				if (p.id === payload.id) {
					p.key = payload.key
					p.value = payload.value
				}
				return p
			})
		},
	},
})

export const {
	setUrl,
	setResponse,
	addParam,
	delParam,
	updateParam,
	addHeader,
	delHeader,
	updateHeader,
} = restClientSlice.actions

export default restClientSlice.reducer
