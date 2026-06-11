import api from '../axios/axios'
import { authHeader } from './auth'

export { api }

export function getAuthConfig(config = {}) {
	return {
		...config,
		headers: {
			...authHeader(),
			...(config.headers || {}),
		},
	}
}
