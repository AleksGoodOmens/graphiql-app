'use client'
import { Button, Grid, TextField, Typography } from '@mui/material'

import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { restParamsFormSchema } from '@/utils'
import { addHeader, addParam, IKeyValue, useAppDispatch } from '@/lib'
import { Save } from '@mui/icons-material'
import { useEffect } from 'react'

export const AddForm = ({ title }: { title: string }) => {
	const dispatch = useAppDispatch()
	const {
		register,
		handleSubmit,
		reset,
		clearErrors,
		formState: { errors },
	} = useForm<IKeyValue>({
		defaultValues: {
			key: '',
			value: '',
		},
		resolver: yupResolver(restParamsFormSchema()),
	})

	const onSubmit: SubmitHandler<IKeyValue> = (data) => {
		if (title === 'Headers') {
			dispatch(addHeader(data))
		} else {
			dispatch(addParam(data))
		}
		reset()
	}

	useEffect(() => {
		const resetErrorTimer = setTimeout(() => {
			clearErrors(['key', 'value'])
		}, 3000)
		return () => {
			clearInterval(resetErrorTimer)
		}
	}, [clearErrors, errors.key, errors.value])

	return (
		<>
			<Typography
				variant='h4'
				component={'h2'}
			>
				{title}:
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
						label={`${title} key`}
						variant='outlined'
						name='key'
					/>
					<Typography
						variant='body2'
						color='error'
					>
						{errors.key?.message || ''}
					</Typography>
				</Grid>
				<Grid>
					<TextField
						{...register('value')}
						label={`${title} value`}
						variant='outlined'
						name='value'
					/>
					<Typography
						variant='body2'
						color='error'
					>
						{errors.value?.message || ''}
					</Typography>
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
