import { RootState } from '..'

const restClientSelector = (state: RootState) => state.restClient
const restClientUrlSelector = (state: RootState) => state.restClient.url

export { restClientSelector, restClientUrlSelector }
