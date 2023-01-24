
import axios from 'axios'

export const API_URL = `http://45.142.36.8/`

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

