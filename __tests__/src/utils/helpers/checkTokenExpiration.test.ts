import checkTokenExpiration from '@/utils/helpers/checkTokenExpiration'

describe('checkTokenExpiration', () => {
	it('should return false when current date is before expiration date', () => {
		const expirationDate = new Date(Date.now() + 10000).toUTCString()
		const result = checkTokenExpiration(expirationDate)
		expect(result).toBe(false)
	})
	it('should return true when current date matches expiration date', () => {
		const expirationDate = new Date().toUTCString()
		const result = checkTokenExpiration(expirationDate)
		expect(result).toBe(true)
	})
})
