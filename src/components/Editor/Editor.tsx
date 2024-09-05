'use client'

import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'

interface IEditor {
	readOnly?: boolean
	value: string
}
function Editor({ readOnly = false, value }: IEditor) {
	const parsedValue = atob(value)
	return (
		<AceEditor
			width='500px'
			height='300px'
			placeholder='Placeholder Text'
			mode='json'
			theme='github'
			name='blah2'
			readOnly={readOnly}
			fontSize={14}
			lineHeight={19}
			showPrintMargin={true}
			showGutter={true}
			highlightActiveLine={true}
			value={parsedValue}
			setOptions={{
				enableBasicAutocompletion: true,
				enableLiveAutocompletion: true,
				enableSnippets: false,
				showLineNumbers: true,
				tabSize: 2,
			}}
		/>
	)
}

export { Editor }
