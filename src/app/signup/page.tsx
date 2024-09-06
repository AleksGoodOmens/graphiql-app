'use client'

import Home from '../page'

import { SyntheticEvent, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { formSchema, MyForm } from '@/utils'

import { useRouter } from 'next/navigation'

import { auth } from '@/firebase/config'
import {
	useAuthState,
	useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth'

import { Snackbar } from '@mui/material'
import { Form } from '@/components'
import Loading from '../loading'

export default function SingUp() {
	const [user, loading] = useAuthState(auth)
	const [createUserWithEmailAndPassword] =
		useCreateUserWithEmailAndPassword(auth)
	const [error, setError] = useState<string | null>(null)
	const [open, setOpen] = useState(false)

	const router = useRouter()

	useEffect(() => {
		if (user) {
			router.push('/')
		}
	}, [user, router])

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<MyForm>({ mode: 'onChange', resolver: yupResolver(formSchema) })

	const submit: SubmitHandler<MyForm> = async (data) => {
		const isValid = await formSchema.isValid(data)
		const { email, password } = data

		if (isValid) {
			try {
				const result = await createUserWithEmailAndPassword(email, password)
				result
					? router.push('/')
					: (setError('Email already exists'), setOpen(true))
			} catch (err) {
				console.error(err)
			}
		}
	}

	const handleClose = (
		event?: Event | SyntheticEvent<unknown, Event>,
		reason?: string
	) => {
		reason === 'timeout'
		setOpen(false)
		setError(null)
	}

	if (loading) {
		return <Loading />
	}

	return (
		<Home>
			<Form
				register={register}
				errors={errors}
				handleSubmit={handleSubmit(submit)}
			/>
			{error && (
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={open}
					autoHideDuration={3000}
					onClose={handleClose}
					message={error}
				/>
			)}
		</Home>
	)
}
