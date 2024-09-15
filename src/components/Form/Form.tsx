'use client'

import styles from './Form.module.css'

import { Button, TextField } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '@/providers/ThemeContext'
import { useTranslation } from 'react-i18next'

import { MyForm } from '@/utils/types'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

export type FormProps = {
	register: UseFormRegister<MyForm>
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
	errors: FieldErrors<MyForm>
}

export function Form({ register, handleSubmit, errors }: FormProps) {
	const { t } = useTranslation()
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
					{t('form:buttonSubmit')}
				</Button>
			</div>
		</form>
	)
}
