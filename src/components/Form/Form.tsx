import styles from './Form.module.css'

import { Button, TextField } from '@mui/material'
import { FormProps } from './Form.type'
import { useContext } from 'react'
import { ThemeContext } from '@/providers/ThemeContext/ThemeContext'

export function Form({ register, handleSubmit, errors }: FormProps) {
	const { mode } = useContext(ThemeContext)
	return (
		<form
			onSubmit={handleSubmit}
			className={styles.form}
		>
			<div className={styles['form-wrapper']}>
				<TextField
					id='email'
					label='Email'
					helperText={errors.email?.message}
					{...register('email')}
				/>
				<TextField
					id='password'
					label='Password'
					helperText={errors.password?.message}
					{...register('password')}
				/>
				<Button
					type='submit'
					variant='contained'
					color={mode === 'dark' ? 'success' : 'secondary'}
				>
					Submit
				</Button>
			</div>
		</form>
	)
}
