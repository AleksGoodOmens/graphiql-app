'use client'

import { HeadersForm, FormListItem } from '@/components'
import { IKeyValue } from '@/utils'
import { useState } from 'react'

export const Headers = () => {
	const [headersList, setHeadersList] = useState<IKeyValue[]>([])

	const addHeader = (h: IKeyValue) => {
		const newHeader: IKeyValue = { ...h, id: headersList.length }
		setHeadersList((prev) => [...prev, newHeader])
	}

	const delHeader = (h: IKeyValue) => {
		const filtered = headersList.filter((i) => i.id !== h.id)
		setHeadersList(filtered)
	}

	return (
		<section>
			<HeadersForm addHeader={addHeader} />
			{headersList.map((item) => (
				<FormListItem
					key={item.id}
					delHeader={delHeader}
					pair={item}
				/>
			))}
		</section>
	)
}
