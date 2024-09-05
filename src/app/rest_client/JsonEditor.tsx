import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'
import { Typography } from '@mui/material'

function JsonEditor() {
	return (
		<div>
			<Typography
				component='h2'
				variant='h4'
			>
				Body Editor:
			</Typography>
			<AceEditor
				width='500px'
				height='300px'
				placeholder='Placeholder Text'
				mode='json'
				theme='github'
				name='blah2'
				// onLoad={this.onLoad}
				// onChange={this.onChange}
				fontSize={14}
				lineHeight={19}
				showPrintMargin={true}
				showGutter={true}
				highlightActiveLine={true}
				value={`sdsd`}
				setOptions={{
					enableBasicAutocompletion: false,
					enableLiveAutocompletion: false,
					enableSnippets: false,
					showLineNumbers: true,
					tabSize: 2,
				}}
			/>
		</div>
	)
}

export { JsonEditor }
