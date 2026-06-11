import jwtDecode from 'jwt-decode'

export function getToken() {
	return localStorage.getItem('token')
}

export function getCurrentUser() {
	const token = getToken()

	if (!token) {
		return null
	}

	try {
		return jwtDecode(token)
	} catch (error) {
		localStorage.removeItem('token')
		return null
	}
}

export function isAdmin() {
	return getCurrentUser()?.adm === 1
}

export function authHeader() {
	const token = getToken()
	return token ? { authorization: `Bearer ${token}` } : {}
}

export function logout() {
	localStorage.clear()
}
