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

interface IFormListItemParams {
	pair: IKeyValueID
}
export const FormListItem = ({ pair }: IFormListItemParams) => {
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

	return (
		<Grid
			container
			gap={2}
			padding={2}
			component={'form'}
			onSubmit={handleSubmit(() => dispatch(updateHeader(pair)))}
		>
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

			<Button
				type='button'
				onClick={() => dispatch(delHeader(pair.id))}
			>
				del
			</Button>

			<Button type='submit'>update</Button>
		</Grid>
	)
}
