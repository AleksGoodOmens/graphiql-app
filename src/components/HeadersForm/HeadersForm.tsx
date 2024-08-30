'use client'
import { Button, Grid, TextField, Typography } from '@mui/material'

import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { restParamsFormSchema } from '@/utils'
import { addHeader, IKeyValue, useAppDispatch } from '@/lib'

export const HeadersForm = () => {
	const dispatch = useAppDispatch()

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

	const onSubmit: SubmitHandler<IKeyValue> = (data) => {
		dispatch(addHeader(data))
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
			<Typography
				variant='h3'
				component={'h3'}
			>
				Headers:
			</Typography>
			<Grid>
				<TextField
					{...register('key')}
					label='Header key'
					variant='standard'
					name='key'
				/>
				<p>{errors.key?.message || ''}</p>
			</Grid>
			<Grid>
				<TextField
					{...register('value')}
					label='Header value'
					variant='standard'
					name='value'
				/>
				<p>{errors.value?.message || ''}</p>
			</Grid>

			<Button type='submit'>Add header param</Button>
		</Grid>
	)
}
