'use client'
import { Box, Typography } from '@mui/material'
import { Editor } from '@/components'
import {
	addBody,
	restClientSelector,
	useAppDispatch,
	useAppSelector,
} from '@/lib'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function JsonEditor() {
	const dispatch = useAppDispatch()
	const { body } = useAppSelector(restClientSelector)
	const [value, setValue] = useState(body)
	const [json, setJson] = useState(true)
	const { t } = useTranslation()

	const onChange = (data: string) => {
		toggleJsonString(data)
	}

	const toggleJsonString = (data: string) => {
		try {
			const json: unknown = JSON.parse(data)
			setJson(true)
			setValue(JSON.stringify(json))
		} catch (error) {
			setJson(false)
			setValue(data)
		}
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(addBody(value))
		}, 100)

		return () => clearTimeout(timer)
	}, [value, dispatch])

	return (
		<Box sx={{ position: 'relative' }}>
			<Typography
				component='h2'
				variant='h4'
			>
				{t('rest:body')}
			</Typography>
			<Typography
				variant='body1'
				color='white'
				fontWeight={700}
				width={'fit-content'}
				bgcolor={'warning.main'}
				padding={1}
				borderRadius={1}
				marginBottom={2}
			>{`This is ${json ? 'JSON' : 'string'}`}</Typography>
			<Editor
				value={value}
				onChange={onChange}
			/>
		</Box>
	)
}

export { JsonEditor }
