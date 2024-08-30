'use client'
import { Button, Grid, TextField } from '@mui/material'

import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IKeyValue, restParamsFormSchema } from '@/utils'

interface IFormListItemParams {
	delHeader: (h: IKeyValue) => void
	pair: IKeyValue
}
export const FormListItem = ({ delHeader, pair }: IFormListItemParams) => {
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

	const onSubmit: SubmitHandler<IKeyValue> = () => {
		delHeader(pair)
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

			<Button type='submit'>del</Button>
		</Grid>
	)
}
