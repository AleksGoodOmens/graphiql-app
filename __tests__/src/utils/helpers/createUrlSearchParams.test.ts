import { createUrlSearchParams } from '@/utils'

describe('createUrlSearchParams', () => {
	it('should convert array of IKeyValueID objects to URL search params string', () => {
		const params = [
			{ id: 1, key: 'name', value: 'John Doe' },
			{ id: 2, key: 'age', value: '30' },
		]
		const result = createUrlSearchParams(params)
		expect(result).toBe('name=John%20Doe&age=30')
	})
})
