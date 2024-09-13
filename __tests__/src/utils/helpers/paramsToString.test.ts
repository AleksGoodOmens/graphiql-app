import { objectWithKeys } from '@/lib'
import { paramsToString } from '@/utils'

describe('paramsToString', () => {
	// Converts an array of objects with string and number values to a query string
	it('should convert an array of objects with string and number values to a query string', () => {
		const params = [{ name: 'John' }, { age: '30' }] as objectWithKeys[]
		const result = paramsToString(params)
		expect(result).toBe('name=John&age=30')
	})
})
