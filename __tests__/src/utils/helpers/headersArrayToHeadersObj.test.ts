import { headersArrayToHeadersObj } from '@/utils'

describe('headersArrayToHeadersObj', () => {
	// Converts an array of objects with string and number values to a query string
	it('should convert an array of IKeyValueID objects to an objectWithKeys', () => {
		const input = [
			{ id: 1, key: 'Content-Type', value: 'application/json' },
			{ id: 2, key: 'Authorization', value: 'Bearer token' },
		]
		const expectedOutput = {
			'Content-Type': 'application/json',
			Authorization: 'Bearer token',
		}
		const result = headersArrayToHeadersObj(input)
		expect(result).toEqual(expectedOutput)
	})
})
