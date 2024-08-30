import { RestResponseBody } from '@/components'

export interface JsonObject {
	[key: string]: string
}
export default function Request() {
	return (
		<>
			<h1>this is my request page</h1>
			<RestResponseBody />
		</>
	)
}
