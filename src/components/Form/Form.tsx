import './Form.css'
import { FormProps } from './Form.type'

export function Form({ register, handleSubmit, errors }: FormProps) {
	return (
		<form onSubmit={handleSubmit}>
			<div className='form-wrapper'>
				<label htmlFor='email'>
					Email
					<input
						type='text'
						id='email'
						placeholder='email@gmail.com'
						{...register('email')}
					/>
				</label>
				<p>{errors.email?.message}</p>
				<label htmlFor='password'>
					Password
					<input
						type='text'
						id='password'
						placeholder='Password...'
						{...register('password')}
					/>
				</label>
				<p>{errors.password?.message}</p>
				<button type='submit'>Submit</button>
			</div>
		</form>
	)
}
