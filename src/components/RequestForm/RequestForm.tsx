'use client'

import {
	IRestClientResponse,
	restClientSelector,
	setUrl,
	useAppDispatch,
	useAppSelector,
} from '@/lib'

import { HTTPMethods, restFormSchema } from '@/utils'

import { Button, MenuItem, Select, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { fetchData, IFetchData } from '@/app/rest_client/actions'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export interface Inputs {
	HTTPMethod: string
	RequestUrl: string
}

export interface IOnSubmitAction {
	onSubmit: (d: IFetchData) => Promise<IRestClientResponse>
}

export const RequestForm = () => {
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()
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
	const HTTPMethod = watch('HTTPMethod')

	useEffect(() => {
		dispatch(setUrl(RequestUrlValue))
	}, [RequestUrlValue, dispatch])

	useEffect(() => {
		setValue('RequestUrl', url)
	}, [url, dispatch, setValue])

	const onSubmit = async () => {
		setIsLoading(!isLoading)
		const responseData = await fetchData({
			HTTPMethod: HTTPMethod,
			RequestUrl: RequestUrlValue,
		})
		setIsLoading(!isLoading)

		const encodedData = encodeURIComponent(JSON.stringify(responseData))
		router.push(`/rest_client/${HTTPMethod}?data=${encodedData}`)
	}

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
					variant='outlined'
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
					variant='outlined'
				/>
				<Typography
					position={'absolute'}
					left={0}
					bottom={-32}
				>
					{errors['RequestUrl']?.message}
				</Typography>
			</Grid>
			<Grid xs={2}>
				<Button
					variant='contained'
					disabled={isLoading}
					endIcon={<ScheduleSendIcon />}
					type='submit'
					size='large'
					color='info'
				>
					{!isLoading ? 'Send' : 'Sending...'}
				</Button>
			</Grid>
		</Grid>
	)
}
