'use client'
import { Button, Grid, TextField, Typography } from '@mui/material'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { restParamsFormSchema } from '@/utils'
import {
	delHeader,
	delParam,
	IKeyValue,
	IKeyValueID,
	updateHeader,
	updateParam,
	useAppDispatch,
} from '@/lib'
import { DeleteOutlineOutlined, Save } from '@mui/icons-material'
import { useEffect } from 'react'

interface IFormListItemParams {
	pair: IKeyValueID
	instance: string
}
export const RestListItem = ({ pair, instance }: IFormListItemParams) => {
	const dispatch = useAppDispatch()

	const {
		register,
		handleSubmit,
		clearErrors,
		formState: { errors },
	} = useForm<IKeyValue>({
		defaultValues: {
			key: pair.key,
			value: pair.value,
		},
		resolver: yupResolver(restParamsFormSchema),
	})

	const onSubmit: SubmitHandler<IKeyValue> = (data) => {
		if (instance === 'Header') {
			dispatch(updateHeader({ ...data, id: pair.id }))
		} else if (instance === 'Param') {
			dispatch(updateParam({ ...data, id: pair.id }))
		}
	}

	const onDell = () => {
		if (instance === 'Header') {
			dispatch(delHeader(pair.id))
		} else if (instance === 'Param') {
			dispatch(delParam(pair.id))
		}
	}

	useEffect(() => {
		const resetErrorTimer = setTimeout(() => {
			clearErrors(['key', 'value'])
		}, 3000)
		return () => {
			clearTimeout(resetErrorTimer)
		}
	}, [clearErrors, errors.key, errors.value])

	return (
		<Grid
			container
			gap={2}
			padding={2}
			component={'form'}
			role='formListItem'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Grid>
				<TextField
					{...register('key')}
					label={`${instance} key`}
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
					label={`${instance} value`}
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
				type='button'
				variant='contained'
				color='warning'
				aria-label='del key/value'
				onClick={() => dispatch(onDell)}
			>
				<DeleteOutlineOutlined />
			</Button>

			<Button
				type='submit'
				variant='contained'
				color='success'
				aria-label='save key/value'
			>
				<Save />
			</Button>
		</Grid>
	)
}
