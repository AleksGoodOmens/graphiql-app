function checkTokenExpiration(expirationDate: string) {
	const currentDate = new Date().toUTCString()
	if (currentDate === expirationDate) {
		return true
	}
	return false
}

export default checkTokenExpiration
