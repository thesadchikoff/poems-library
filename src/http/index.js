
import axios from 'axios'

export const API_URL = `https://nicksconn.space/`

const $api = axios.create({
	baseURL: API_URL,
})

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${window.localStorage.getItem(
		'token'
	)}`
	return config
})

export default $api

