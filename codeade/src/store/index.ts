import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countriesSlice from './slices/countries.slice';
import formsSlice from './slices/forms.slice';

const rootReducers = combineReducers({
	forms: formsSlice,
	countries: countriesSlice,
});

export const setupStore = () =>
	configureStore({
		reducer: rootReducers,
	});
export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export * from './hooks/hooks';
export * from './slices/forms.slice';
export * from './selectors/index';
