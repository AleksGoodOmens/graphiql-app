'use client'
import { Button, Grid, TextField } from '@mui/material'

import { useForm, SubmitHandler } from 'react-hook-form'
import { addParam, IKeyValue, useAppDispatch } from '@/lib'
import { yupResolver } from '@hookform/resolvers/yup'
import { restParamsFormSchema } from '@/utils'
import { Save } from '@mui/icons-material'

export const RestParamsForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IKeyValue>({
		defaultValues: {
			key: '',
			value: '',
		},
		resolver: yupResolver(restParamsFormSchema()),
	})

	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<IKeyValue> = (data) => {
		dispatch(addParam(data))

		reset()
	}

	return (
		<Grid
			container
			gap={2}
			padding={2}
			component={'form'}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Grid>
				<TextField
					{...register('key')}
					variant='outlined'
					name='key'
				/>
				<p>{errors.key?.message || ''}</p>
			</Grid>
			<Grid>
				<TextField
					{...register('value')}
					variant='outlined'
					name='value'
				/>
				<p>{errors.value?.message || ''}</p>
			</Grid>

			<Button
				type='submit'
				variant='contained'
				size='large'
				color='success'
				sx={{ alignSelf: 'center' }}
			>
				<Save />
			</Button>
		</Grid>
	)
}
