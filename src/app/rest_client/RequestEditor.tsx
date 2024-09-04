'use client'
import { AddForm, RestListItem } from '@/components'
import { restClientSelector, useAppSelector } from '@/lib'
import { Grid } from '@mui/material'
export const RequestEditor = () => {
	const { newParams, headers } = useAppSelector(restClientSelector)

	return (
		<Grid container>
			<section>
				<AddForm title='Params' />
				{newParams.map((p) => {
					return (
						<RestListItem
							key={p.id}
							pair={p}
							instance='Param'
						/>
					)
				})}
			</section>
			<section>
				<AddForm title='Headers' />
				{headers.map((p) => {
					return (
						<RestListItem
							key={p.id}
							pair={p}
							instance='Header'
						/>
					)
				})}
			</section>
		</Grid>
	)
}
