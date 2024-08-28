'use client'
import { RestParamsForm, RestParamsListForm } from '@/components'
import { restClientNewParamsSelector, useAppSelector } from '@/lib'

export default function ParamsSection() {
	const newParams = useAppSelector(restClientNewParamsSelector)

	return (
		<>
			{newParams.map((p, i) => {
				return (
					<RestParamsListForm
						key={i}
						pair={p}
						id={i}
					/>
				)
			})}
			<br />
			<RestParamsForm />
		</>
	)
}
