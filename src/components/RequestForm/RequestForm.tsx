'use client'

import {
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

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export interface Inputs {
	HTTPMethod: string
	RequestUrl: string
}

export const RequestForm = () => {
	const router = useRouter()
	const { url, headers, body } = useAppSelector(restClientSelector)

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
		}, 300)
		return () => clearTimeout(timer)
	}, [url, setValue])

	const onSubmit = () => {
		const encodedURL = encodeURIComponent(btoa(RequestUrlValue))
		const encodedBody = body ? encodeURIComponent(btoa(body)) : ''

		const newUrl = new URL(
			`http://rest_client/${HTTPMethod}/${encodedURL}/${encodedBody}`
		)

		headers.forEach((h) => {
			newUrl.searchParams.append(h.key, h.value)
		})

		router.push(`/rest_client/${newUrl.pathname}${newUrl.search}`)
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
					endIcon={<ScheduleSendIcon />}
					type='submit'
					size='large'
					color='info'
				>
					Send
				</Button>
			</Grid>
		</Grid>
	)
}
