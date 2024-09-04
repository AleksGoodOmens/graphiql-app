'use client'
import { Button, Grid, TextField } from '@mui/material'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { restParamsFormSchema } from '@/utils'
import {
	delHeader,
	IKeyValue,
	IKeyValueID,
	updateHeader,
	useAppDispatch,
} from '@/lib'
import { DeleteOutlineOutlined, Save } from '@mui/icons-material'

interface IFormListItemParams {
	pair: IKeyValueID
	instance: string
}
export const RestListItem = ({ pair, instance }: IFormListItemParams) => {
	const dispatch = useAppDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IKeyValue>({
		defaultValues: {
			key: pair.key,
			value: pair.value,
		},
		resolver: yupResolver(restParamsFormSchema()),
	})

	const onSubmit = () => {
		if (instance === 'Header') {
			dispatch(updateHeader(pair))
		}
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
					label={`${instance} key`}
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
				type='button'
				variant='contained'
				color='warning'
				onClick={() => dispatch(delHeader(pair.id))}
			>
				<DeleteOutlineOutlined />
			</Button>

			<Button
				type='submit'
				variant='contained'
				color='success'
			>
				<Save />
			</Button>
		</Grid>
	)
}
