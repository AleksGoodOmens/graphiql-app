'use client'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'

import { restClientSelector, useAppSelector } from '@/lib'
import { Box, Grid, List, ListItem, Typography } from '@mui/material'

export interface JsonObject {
	[key: string]: string
}
export default function Request() {
	const { response } = useAppSelector(restClientSelector)

	const { body, code, message, statusCode } = response
	return (
		<Box mt={4}>
			<Typography
				textAlign={'center'}
				variant='h2'
				component={'h2'}
			>
				Response
			</Typography>
			<Grid
				container
				sx={{ placeContent: 'center', gap: 2 }}
			>
				<Box>
					<Typography
						variant='h4'
						component={'h3'}
					>
						Status
					</Typography>
					<List>
						<ListItem
							sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
						>
							Code: <span>{code}</span>
						</ListItem>
						<ListItem
							sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
						>
							Status Code: <span>{statusCode}</span>
						</ListItem>
						<ListItem
							sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
						>
							Message: <span>{message}</span>
						</ListItem>
					</List>
				</Box>
				<Box>
					<Typography
						variant='h4'
						component={'h3'}
					>
						body
					</Typography>
					<AceEditor
						width='500px'
						height='300px'
						placeholder='Placeholder Text'
						mode='json'
						theme='github'
						name='blah2'
						readOnly={true}
						fontSize={14}
						lineHeight={19}
						showPrintMargin={true}
						showGutter={true}
						highlightActiveLine={true}
						value={body}
						setOptions={{
							enableBasicAutocompletion: false,
							enableLiveAutocompletion: false,
							enableSnippets: false,
							showLineNumbers: true,
							tabSize: 2,
						}}
					/>
				</Box>
			</Grid>
		</Box>
	)
}
