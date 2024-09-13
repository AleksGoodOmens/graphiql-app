'use client'
import { AddForm, RestListItem } from '@/components'
import { restClientSelector, useAppSelector } from '@/lib'
import { Grid } from '@mui/material'
import { JsonEditor } from './JsonEditor'
export const RequestEditor = () => {
	const { params, headers, baseUrl } = useAppSelector(restClientSelector)

	return (
		<section>
			<Grid
				container
				columns={2}
				sx={{ justifyContent: 'space-between' }}
			>
				<section>
					<AddForm
						title='Params'
						disabled={!baseUrl}
					/>
					{params.map((p) => {
						return (
							<RestListItem
								key={p.key + p.value}
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
								key={p.key + p.value}
								pair={p}
								instance='Header'
							/>
						)
					})}
				</section>
			</Grid>
			<JsonEditor />
		</section>
	)
}