'use client'
import { Typography } from '@mui/material'
import { Editor } from '@/components'
import {
	addBody,
	restClientSelector,
	useAppDispatch,
	useAppSelector,
} from '@/lib'
import { useEffect, useState } from 'react'

function JsonEditor() {
	const dispatch = useAppDispatch()
	const { body } = useAppSelector(restClientSelector)
	const [value, setValue] = useState(body)

	const onChange = (data: string) => {
		setValue(data)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(addBody(value))
		}, 100)

		return () => clearTimeout(timer)
	}, [value, dispatch])

	return (
		<div>
			<Typography
				component='h2'
				variant='h4'
			>
				Body Editor:
			</Typography>
			<Editor
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}

export { JsonEditor }
