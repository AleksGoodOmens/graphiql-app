'use client'

import {
	restClientSelector,
	setUrl,
	useAppDispatch,
	useAppSelector,
} from '@/lib'

import { headersArrayToHeadersObj, HTTPMethods, restFormSchema } from '@/utils'

import { Button, MenuItem, Select, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { fetchData } from '@/app/rest_client/actions'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export interface Inputs {
	HTTPMethod: string
	RequestUrl: string
}

export const RequestForm = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const { url, headers } = useAppSelector(restClientSelector)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm<Inputs>({
		mode: 'onChange',
		defaultValues: {
			HTTPMethod: 'GET',
			RequestUrl: url,
		},
		resolver: yupResolver(restFormSchema()),
	})

	const dispatch = useAppDispatch()
	const RequestUrlValue = watch('RequestUrl')
	const HTTPMethod = watch('HTTPMethod')

	useEffect(() => {
		dispatch(setUrl(RequestUrlValue))
	}, [RequestUrlValue, dispatch])

	useEffect(() => {
		const timer = setTimeout(() => {
			setValue('RequestUrl', url)
		}, 1000)
		return () => clearTimeout(timer)
	}, [url, setValue])

	const onSubmit = async () => {
		setIsLoading(true)

		const resp = await fetchData({
			HTTPMethod: HTTPMethod,
			RequestUrl: RequestUrlValue,
			headers: headersArrayToHeadersObj(headers),
			body: JSON.stringify({}),
		})

		setIsLoading(false)

		router.push(`/rest_client/${HTTPMethod}?${resp}`)
	}

	useEffect(() => {
		const resetErrorTimer = setTimeout(() => {
			clearErrors(['RequestUrl'])
		}, 3000)
		return () => {
			clearTimeout(resetErrorTimer)
		}
	}, [clearErrors, errors.RequestUrl])

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
					variant='body2'
					color={'error'}
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
