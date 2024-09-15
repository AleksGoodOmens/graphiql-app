'use client'
import { AddForm, RestListItem } from '@/components'
import { restClientSelector, useAppSelector } from '@/lib'
import { Grid } from '@mui/material'
import { JsonEditor } from './JsonEditor'
import { useTranslation } from 'react-i18next'
export const RequestEditor = () => {
	const { params, headers, baseUrl } = useAppSelector(restClientSelector)
	const { t } = useTranslation()

	return (
		<section>
			<Grid
				container
				columns={2}
				sx={{ justifyContent: 'space-between' }}
			>
				<section>
					<AddForm
						title={t('rest:params')}
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
					<AddForm title={t('rest:headers')} />
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
