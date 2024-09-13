import { IKeyValueID, IRestClientInitialState, IKeyValue } from '@/lib'
import restClientSlice, {
	addBody,
	addHeader,
	addParam,
	delHeader,
	delParam,
	setUrl,
	updateHeader,
	updateParam,
} from '@/lib/slices/restClient.slice'

// Создаем начальное состояние
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

describe('restClientSlice', () => {
	it('should return the initial state', () => {
		expect(restClientSlice(undefined, { type: 'undefined' })).toEqual(
			initialState
		)
	})

	it('should handle setUrl', () => {
		const url = 'https://example.com?foo=bar'
		const nextState = restClientSlice(initialState, setUrl(url))

		expect(nextState.url).toBe('https://example.com?foo=bar')
		expect(nextState.baseUrl).toBe('https://example.com')
		expect(nextState.params).toEqual([{ key: 'foo', value: 'bar', id: 0 }])
	})

	it('should handle setUrl with long pathName', () => {
		const url = 'https://example.com/test?foo=bar'
		const nextState = restClientSlice(initialState, setUrl(url))

		expect(nextState.url).toBe('https://example.com/test?foo=bar')
		expect(nextState.baseUrl).toBe('https://example.com/test')
		expect(nextState.params).toEqual([{ key: 'foo', value: 'bar', id: 0 }])
	})

	it('should handle setUrl with incorrect value', () => {
		const url = 'example.com/test?foo=bar'
		const nextState = restClientSlice(initialState, setUrl(url))

		expect(nextState.url).toBe('')
		expect(nextState.baseUrl).toBe('')
	})

	it('should handle addParam', () => {
		const newParam: IKeyValue = { key: 'foo', value: 'bar' }
		const nextState = restClientSlice(initialState, addParam(newParam))

		expect(nextState.params.length).toBe(1)
		expect(nextState.params[0]).toEqual({ key: 'foo', value: 'bar', id: 0 })
	})

	it('should handle delParam', () => {
		const stateWithParams = {
			...initialState,
			params: [{ key: 'foo', value: 'bar', id: 0 }],
		}

		const nextState = restClientSlice(stateWithParams, delParam(0))
		expect(nextState.params.length).toBe(0)
	})

	it('should handle updateParam', () => {
		const stateWithParams = {
			...initialState,
			params: [{ key: 'foo', value: 'bar', id: 0 }],
		}

		const updatedParam: IKeyValueID = {
			id: 0,
			key: 'updatedKey',
			value: 'updatedValue',
		}
		const nextState = restClientSlice(
			stateWithParams,
			updateParam(updatedParam)
		)

		expect(nextState.params[0]).toEqual({
			key: 'updatedKey',
			value: 'updatedValue',
			id: 0,
		})
	})

	it('should handle addHeader', () => {
		const newHeader: IKeyValue = { key: 'Authorization', value: 'Bearer token' }
		const nextState = restClientSlice(initialState, addHeader(newHeader))

		expect(nextState.headers.length).toBe(3)
		expect(nextState.headers[2]).toEqual({
			key: 'Authorization',
			value: 'Bearer token',
			id: 2,
		})
	})

	it('should handle delHeader', () => {
		const nextState = restClientSlice(initialState, delHeader(1))

		expect(nextState.headers.length).toBe(1)
		expect(nextState.headers[0]).toEqual({
			key: 'Content-Type',
			value: 'application/json',
			id: 0,
		})
	})

	it('should handle updateHeader', () => {
		const updatedHeader: IKeyValueID = {
			id: 1,
			key: 'Accept',
			value: 'application/xml',
		}
		const nextState = restClientSlice(initialState, updateHeader(updatedHeader))

		expect(nextState.headers[1].value).toBe('application/xml')
	})

	it('should handle addBody', () => {
		const nextState = restClientSlice(
			initialState,
			addBody('Test body content')
		)
		expect(nextState.body).toBe('Test body content')
	})
})
