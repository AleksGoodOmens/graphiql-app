import { createUrlSearchParams } from '@/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IKeyValue, IKeyValueID, IRestClientInitialState } from '../types'

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
}
const restClientSlice = createSlice({
	name: 'restClient',
	initialState,
	reducers: {
		setUrl(state, { payload }: PayloadAction<string>) {
			try {
				const url = new URL(payload)

				const params = [...url.searchParams].map(
					(p: [string, string], i: number) => ({
						key: p[0],
						value: p[1],
						id: i,
					})
				)

				state.baseUrl = `${url.protocol}//${url.host}${url.pathname}`
				state.newParams = params

				const paramsString = createUrlSearchParams(params)
				state.url = state.baseUrl + (paramsString ? `?${paramsString}` : '')
			} catch (error) {
				state.baseUrl = ''
				state.url = ''
			}
		},

		addParam(
			state: IRestClientInitialState,
			{ payload }: PayloadAction<IKeyValue>
		) {
			state.newParams.push({
				...payload,
				id: state.newParams.length,
			})

			const paramsString = createUrlSearchParams(state.newParams)

			state.url =
				state.baseUrl + (paramsString.length ? `?${paramsString}` : '')
		},

		delParam(state, { payload }: PayloadAction<number>) {
			const updatedParams = state.newParams.filter((p) => p.id !== payload)

			state.newParams = updatedParams
			const paramsString = createUrlSearchParams(updatedParams)
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

			state.newParams = updatedParams
			const paramsString = createUrlSearchParams(updatedParams)
			console.log(paramsString)
			state.url = state.baseUrl + (paramsString ? `?${paramsString}` : '')
		},

		addHeader(
			state: IRestClientInitialState,
			{ payload }: PayloadAction<IKeyValue>
		) {
			state.headers = [
				...state.headers,
				{ ...payload, id: state.headers.length },
			]
		},
		delHeader(state, { payload }: PayloadAction<number>) {
			const filteredHeaders = state.headers.filter((h) => h.id !== payload)
			state.headers = filteredHeaders
		},
		updateHeader(state, { payload }: PayloadAction<IKeyValueID>) {
			state.headers = state.headers.map((p) => {
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
	addParam,
	delParam,
	updateParam,
	addHeader,
	delHeader,
	updateHeader,
} = restClientSlice.actions

export default restClientSlice.reducer
