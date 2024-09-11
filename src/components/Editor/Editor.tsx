'use client'

import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import { ThemeContext } from '@/providers/ThemeContext/ThemeContext'
import { useContext } from 'react'

interface IEditor {
	readOnly?: boolean
	value: string
	onChange: (s: string) => void
}
function Editor({ readOnly = false, value, onChange }: IEditor) {
	const { mode } = useContext(ThemeContext)

	return (
		<AceEditor
			width='500px'
			height='300px'
			placeholder='Placeholder Text'
			mode='json'
			theme={mode === 'light' ? 'github' : 'monokai'}
			name='blah2'
			readOnly={readOnly}
			fontSize={14}
			lineHeight={19}
			showPrintMargin={true}
			showGutter={true}
			highlightActiveLine={true}
			onChange={onChange}
			value={value}
			setOptions={{
				useWorker: false,
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
