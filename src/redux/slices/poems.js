
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import $api from '../../http'

export const fetchPoems = createAsyncThunk('poems/fetchPoems', async () => {
	const { data } = await $api.get('api/posts')
	return data
})
export const fetchCategory = createAsyncThunk(
	'category/fetchCategory',
	async () => {
		const { data } = await $api.get('api/posts/category')
		return data
	}
)

const initialState = {
	poems: {
		items: [],
		status: 'loading',
	},
	category: {
		items: [],
		status: 'loading',
	},
}

const poemsSlice = createSlice({
	name: 'poems',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchPoems.pending]: state => {
			state.poems.status = 'loading'
		},
		[fetchPoems.fulfilled]: (state, action) => {
			state.poems.items = action.payload
			state.poems.status = 'loaded'
		},
		[fetchPoems.rejected]: state => {
			state.poems.items = []
			state.poems.status = 'error'
		},
		[fetchCategory.pending]: state => {
			state.category.status = 'loading'
		},
		[fetchCategory.fulfilled]: (state, action) => {
			state.category.items = action.payload
			state.category.status = 'loaded'
		},
		[fetchCategory.rejected]: state => {
			state.category.items = []
			state.category.status = 'error'
		},
	},
})

export const poemsReducer = poemsSlice.reducer