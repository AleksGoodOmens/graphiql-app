import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICountries, ICountriesState, ICountry } from '../interface';

export const fetchCountries = createAsyncThunk('countries/fetch', async () => {
	try {
		const response = await fetch(
			'https://restcountries.com/v3.1/all?fields=name,flags',
		);
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		const json: ICountry[] = await response.json();
		return json;
	} catch (error) {
		console.error('Failed to fetch countries:', error);
		return [];
	}
});

const initialState: ICountriesState = {
	countries: [],
	isLoading: false,
	isError: '',
};
const countriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCountries(state, { payload }: PayloadAction<ICountries>) {
			state.countries = payload.countries;
		},
	},
	extraReducers(builder) {
		builder.addCase(
			fetchCountries.fulfilled,
			(state, { payload }: PayloadAction<ICountry[]>) => {
				state.isLoading = false;
				state.isError = '';
				state.countries = payload;
			},
		);
		builder.addCase(fetchCountries.rejected, (state) => {
			state.isLoading = false;
			state.isError = 'server side error';
		});
		builder.addCase(fetchCountries.pending, (state) => {
			state.isLoading = true;
			state.isError = '';
		});
	},
});

export const { setCountries } = countriesSlice.actions;

export default countriesSlice.reducer;
