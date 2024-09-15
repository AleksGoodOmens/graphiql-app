import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IKeyValue, IKeyValueID, IRestClientInitialState } from '../types'
import { createUrlSearchParams } from '@/utils'

const initialState: IRestClientInitialState = {
	url: '',
	baseUrl: '',
	params: [],
	headers: [
		{ key: 'Content-Type', value: 'application/json', id: 0 },
		{ key: 'Accept', value: 'application/json', id: 1 },
	],
	body: '',
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

				state.baseUrl = `${url.protocol}//${url.host}${url.pathname.length > 1 ? url.pathname : ''}`
				state.params = params

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
			state.params.push({
				...payload,
				id: state.params.length,
			})

			const paramsString = createUrlSearchParams(state.params)

			state.url =
				state.baseUrl + (paramsString.length ? `?${paramsString}` : '')
		},

		delParam(state, { payload }: PayloadAction<number>) {
			const updatedParams = state.params.filter((p) => p.id !== payload)

			state.params = updatedParams
			const paramsString = createUrlSearchParams(updatedParams)
			state.url = state.baseUrl + (paramsString ? `?${paramsString}` : '')
		},
		updateParam(state, { payload }: PayloadAction<IKeyValueID>) {
			const updatedParams = state.params.map((p, i) => {
				if (i === payload.id) {
					p.key = payload.key
					p.value = payload.value
				}
				return p
			})

			state.params = updatedParams
			const paramsString = createUrlSearchParams(updatedParams)
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

		addBody(state, { payload }: PayloadAction<string>) {
			state.body = payload
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
	addBody,
} = restClientSlice.actions

export default restClientSlice.reducer
