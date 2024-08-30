import { RootState } from '..'

const restClientSelector = (state: RootState) => state.restClient
const restClientNewParamsSelector = (state: RootState) =>
	state.restClient.newParams
const restClientUrlSelector = (state: RootState) => state.restClient.url

export {
	restClientSelector,
	restClientNewParamsSelector,
	restClientUrlSelector,
}
