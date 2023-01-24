
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import $api from '../../http'

export const fetchUserData = createAsyncThunk(
	'auth/fetchUserData',
	async ({ email, password }) => {
		const { data } = await $api.post('api/user/auth/login', {
			email,
			password,
		})
		return data
	}
)

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
	const { data } = await $api.get('api/auth/me')
	return data
})

const initialState = {
	item: null,
	status: 'loading',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.item = null
		},
	},
	extraReducers: {
		[fetchUserData.pending]: state => {
			state.status = 'loading'
			state.item = null
		},
		[fetchUserData.fulfilled]: (state, action) => {
			console.log(action)
			state.status = 'loaded'
			state.item = action.payload
		},
		[fetchUserData.rejected]: state => {
			state.status = 'error'
			state.item = null
		},
		[fetchAuthMe.pending]: state => {
			state.status = 'loading'
			state.item = null
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.status = 'loaded'
			state.item = action.payload
		},
		[fetchAuthMe.rejected]: state => {
			state.status = 'error'
			state.item = null
		},
	},
})

export const selectIsAuth = state => Boolean(state.auth.item)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
