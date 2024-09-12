import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	form: {
		email: '',
		password: '',
	},
}

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		submitForm(
			state,
			action: PayloadAction<{ email: string; password: string }>
		) {
			state.form = action.payload
		},
	},
})

export const { submitForm } = formSlice.actions
export default formSlice.reducer
