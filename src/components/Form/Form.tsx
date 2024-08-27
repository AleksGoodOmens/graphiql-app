import { Button, TextField } from '@mui/material'
import './Form.css'
import { FormProps } from './Form.type'

export function Form({ register, handleSubmit, errors }: FormProps) {
	return (
		<form onSubmit={handleSubmit}>
			<div className='form-wrapper'>
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
					style={{ backgroundColor: '#EAA724' }}
				>
					Submit
				</Button>
			</div>
		</form>
	)
}
