import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IForms, IValues } from '../interface';

const initialState: IForms = {
	controlledForm: {
		country: '',
		name: '',
		age: undefined,
		gender: '',
		email: '',
		password: '',
		confirmPassword: '',
		termsConditions: false,
	},
	uncontrolledForm: {
		country: '',
		name: '',
		age: undefined,
		gender: '',
		email: '',
		password: '',
		confirmPassword: '',
		termsConditions: false,
	},

	showPassword: false,
};

const formsSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setControlledValues(state, { payload }: PayloadAction<IValues>) {
			state.controlledForm = payload;
		},
		setUnControlledValues(state, { payload }: PayloadAction<IValues>) {
			state.uncontrolledForm = payload;
		},
		setShowPassword(state) {
			state.showPassword = !state.showPassword;
		},
	},
});

export const { setControlledValues, setUnControlledValues, setShowPassword } =
	formsSlice.actions;
export default formsSlice.reducer;
