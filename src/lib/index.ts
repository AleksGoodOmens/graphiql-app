import { combineReducers, configureStore } from '@reduxjs/toolkit'
import formSlice from './slices/forms.slice'
import restClientSlice from './slices/restClient.slice'

const rootReducers = combineReducers({
	auth: formSlice,
	restClient: restClientSlice,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducers,
	})
}
export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export * from './hooks/hooks'
export * from './slices/forms.slice'
export * from './selectors/index'

export * from './slices/restClient.slice'
