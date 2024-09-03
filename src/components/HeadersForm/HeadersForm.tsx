'use client'
import { Button, Grid, TextField, Typography } from '@mui/material'

import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { restParamsFormSchema } from '@/utils'
import { addHeader, IKeyValue, useAppDispatch } from '@/lib'
import { Save } from '@mui/icons-material'

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
		<>
			<Typography
				variant='h4'
				component={'h4'}
			>
				Headers:
			</Typography>
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
						label='Header key'
						variant='outlined'
						name='key'
					/>
					<p>{errors.key?.message || ''}</p>
				</Grid>
				<Grid>
					<TextField
						{...register('value')}
						label='Header value'
						variant='outlined'
						name='value'
					/>
					<p>{errors.value?.message || ''}</p>
				</Grid>

				<Button
					type='submit'
					variant='contained'
					color='success'
				>
					<Save />
				</Button>
			</Grid>
		</>
	)
}
