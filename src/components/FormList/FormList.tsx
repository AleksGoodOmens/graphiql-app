'use client'

import { restClientSelector, useAppSelector } from '@/lib'
import { FormListItem } from '../FormListItem/FormListItem'
import { Loader } from '../Loader/loader'

export const FormList = () => {
	const { headers, isLoading } = useAppSelector(restClientSelector)
	return (
		<section>
			{isLoading && <Loader />}
			{headers.map((item) => {
				return (
					<FormListItem
						key={item.id}
						pair={item}
					/>
				)
			})}
		</section>
	)
}
