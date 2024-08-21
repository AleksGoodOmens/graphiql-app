'use client'

import { countriesSelector, useAppDispatch, useAppSelector } from '@/lib'
import { fetchCountries } from '@/lib/slices/countries.slice'
import Image from 'next/image'
import { useEffect } from 'react'

export const Intro = () => {
	const dispatch = useAppDispatch()
	const a = (b) => b + 2

	useEffect(() => {
		dispatch(fetchCountries())
	}, [dispatch])
	const { countries } = useAppSelector(countriesSelector)

	return (
		<ul>
			{countries.map((c) => (
				<li key={c.name.common}>
					{c.name.official}
					<Image
						src={c.flags.svg}
						alt={c.flags.alt}
						width={30}
						height={20}
					/>
				</li>
			))}
		</ul>
	)
}
