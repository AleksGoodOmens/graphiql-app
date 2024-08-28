'use client'

import {
	IRestClientResponse,
	restClientSelector,
	setUrl,
	useAppDispatch,
	useAppSelector,
} from '@/lib'

import { HTTPMethods, restFormSchema } from '@/utils'

import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { IFetchData } from '@/app/rest_client/actions'
import { useEffect } from 'react'

export interface Inputs {
	HTTPMethod: string
	RequestUrl: string
}

export interface IOnSubmitAction {
	onSubmit: (d: IFetchData) => Promise<IRestClientResponse>
}

export const RestForm = ({ onSubmit }: IOnSubmitAction) => {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<Inputs>({
		mode: 'onChange',
		defaultValues: {
			HTTPMethod: 'GET',
			RequestUrl: '',
		},
		resolver: yupResolver(restFormSchema()),
	})

	const { url } = useAppSelector(restClientSelector)
	const dispatch = useAppDispatch()
	const RequestUrlValue = watch('RequestUrl')

	useEffect(() => {
		dispatch(setUrl(RequestUrlValue))
	}, [RequestUrlValue, dispatch])

	useEffect(() => {
		setValue('RequestUrl', url)
	}, [url, dispatch, setValue])

	return (
		<Grid
			component={'form'}
			container
			alignItems={'center'}
			spacing={2}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Grid xs={2}>
				<Select
					{...register('HTTPMethod')}
					defaultValue={'GET'}
					fullWidth
					variant='standard'
					labelId='method-select'
					label='Method'
					sx={{ height: '100%' }}
				>
					{HTTPMethods.map((m) => (
						<MenuItem
							key={m}
							value={m}
						>
							{m}
						</MenuItem>
					))}
				</Select>
			</Grid>

			<Grid
				xs={8}
				position={'relative'}
			>
				<TextField
					{...register('RequestUrl')}
					fullWidth
					label='RequestUrl'
					variant='standard'
				/>
				<Box
					component={'p'}
					position={'absolute'}
					left={0}
					bottom={-32}
				>
					{errors['RequestUrl']?.message}
				</Box>
			</Grid>
			<Grid xs={2}>
				<Button
					variant='contained'
					fullWidth
					size='large'
					endIcon={<ScheduleSendIcon />}
					type='submit'
				>
					Send
				</Button>
			</Grid>
		</Grid>
	)
}
