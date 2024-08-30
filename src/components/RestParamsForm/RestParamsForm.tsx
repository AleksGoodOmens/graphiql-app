'use client'
import { Button, Grid, TextField } from '@mui/material'

import { useForm, SubmitHandler } from 'react-hook-form'
import { addParam, INewParam, useAppDispatch } from '@/lib'
import { yupResolver } from '@hookform/resolvers/yup'
import { restParamsFormSchema } from '@/utils'

export const RestParamsForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<INewParam>({
		defaultValues: {
			key: '',
			value: '',
		},
		resolver: yupResolver(restParamsFormSchema()),
	})

	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<INewParam> = (data) => {
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
					variant='standard'
					name='key'
				/>
				<p>{errors.key?.message || ''}</p>
			</Grid>
			<Grid>
				<TextField
					{...register('value')}
					variant='standard'
					name='value'
				/>
				<p>{errors.value?.message || ''}</p>
			</Grid>

			<Button type='submit'>Add Search Params</Button>
		</Grid>
	)
}
