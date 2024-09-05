import { Typography } from '@mui/material'
import { Editor } from '@/components'

function JsonEditor() {
	return (
		<div>
			<Typography
				component='h2'
				variant='h4'
			>
				Body Editor:
			</Typography>
			<Editor value='' />
		</div>
	)
}

export { JsonEditor }
