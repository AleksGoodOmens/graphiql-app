import { combineReducers, configureStore } from '@reduxjs/toolkit'
import restClientSlice from './slices/restClient.slice'

const rootReducers = combineReducers({
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
export * from './selectors/index'

export * from './slices/restClient.slice'
export * from './types'
