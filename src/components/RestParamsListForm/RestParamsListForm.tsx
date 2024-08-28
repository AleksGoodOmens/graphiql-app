'use client'
import { Button, Grid, TextField } from '@mui/material'

import {
	delParam,
	restClientNewParamsSelector,
	updateParam,
	useAppDispatch,
	useAppSelector,
} from '@/lib'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { restParamsFormSchema } from '@/utils'

export interface IRestParamsListForm {
	pair: {
		key: string
		value: string
	}
	id: number
}

interface IInput {
	key: string
	value: string
}

export const RestParamsListForm = ({ pair, id }: IRestParamsListForm) => {
	const {
		register,
		setValue,
		watch,
		formState: { errors },
	} = useForm<IInput>({
		mode: 'onChange',
		defaultValues: {
			key: pair.key,
			value: pair.value,
		},
		resolver: yupResolver(restParamsFormSchema()),
	})

	const dispatch = useAppDispatch()

	const newParams = useAppSelector(restClientNewParamsSelector)

	const keyInput = watch('key')
	const valueInput = watch('value')

	useEffect(() => {
		if (!keyInput && !valueInput) {
			dispatch(delParam(id))
			return
		}

		dispatch(
			updateParam({
				key: keyInput,
				value: valueInput,
				id: id,
			})
		)
	}, [keyInput, id, valueInput, dispatch])

	useEffect(() => {
		setValue('key', newParams[id].key)
		setValue('value', newParams[id].value)
	}, [setValue, newParams, id])

	return (
		<Grid
			container
			gap={2}
			component={'form'}
		>
			<TextField
				{...register('key')}
				variant='standard'
			/>
			<p>{errors.key?.message || ''}</p>

			<TextField
				{...register('value')}
				variant='standard'
			/>
			<p>{errors.value?.message || ''}</p>

			<Button
				type='button'
				onClick={() => dispatch(delParam(id))}
			>
				delete
			</Button>
		</Grid>
	)
}
