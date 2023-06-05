
import axios from 'axios'

export const API_URL = `https://7eca-80-80-197-180.eu.ngrok.io`

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

