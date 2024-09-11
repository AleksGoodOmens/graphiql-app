'use client'

import { Editor } from '@/components'
import { Button, Grid, List, ListItem, Typography } from '@mui/material'
import { useState } from 'react'

interface IResponseViewerParams {
	code: number
	statusCode: string
	body: string
}
function ResponseViewer({ code, statusCode, body }: IResponseViewerParams) {
	const [value, setValue] = useState(body)
	const [json, setJson] = useState(true)

	const convertValue = () => {
		try {
			const json: unknown = JSON.parse(value)
			const jsonString = JSON.stringify(json, null, 2)
			setValue(jsonString)
			setJson(true)
		} catch (error) {
			const string = JSON.stringify(value)
			setValue(string)
			setJson(false)
		}
	}

	return (
		<>
			<Grid
				container
				sx={{ gap: 2 }}
			>
				<List>
					<ListItem
						sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
					>
						Status Code: <span>{code}</span>
					</ListItem>
					<ListItem
						sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
					>
						Status Text: <span>{statusCode}</span>
					</ListItem>
				</List>
				<ListItem>
					<Button
						onClick={convertValue}
						variant='contained'
						color='success'
					>
						Prettify
					</Button>
				</ListItem>
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
			</Grid>
			<Editor
				value={value}
				readOnly
			/>
		</>
	)
}

export { ResponseViewer }
