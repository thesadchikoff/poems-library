
import { configureStore } from '@reduxjs/toolkit'
import { poemsReducer } from './slices/poems'
import { authReducer } from './slices/auth'

const store = configureStore({
	reducer: {
		poems: poemsReducer,
		auth: authReducer,
	},
})

export default store
