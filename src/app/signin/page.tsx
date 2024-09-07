'use client'

import { Form } from '@/components/Form/Form'
import Home from '../page'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MyForm } from '@/utils/types'
import { useRouter } from 'next/navigation'
import { auth, logInWithEmailAndPassword } from '@/firebase/config'
import { SyntheticEvent, useEffect, useState } from 'react'
import { Snackbar } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from '../loading'

export default function SingIn() {
	const [error, setError] = useState<string | null>(null)
	const [open, setOpen] = useState(false)
	const [user, loading] = useAuthState(auth)
	const router = useRouter()

	useEffect(() => {
		if (user) router.replace('/')
	}, [user])

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<MyForm>()

	const submit: SubmitHandler<MyForm> = async (data) => {
		const { email, password } = data

		const result = await logInWithEmailAndPassword({ email, password })
		result
			? router.push('/')
			: (setError('Email or password doesn`t exist'), setOpen(true))
	}

	const handleClose = (
		event?: Event | SyntheticEvent<unknown, Event>,
		reason?: string
	) => {
		reason === 'timeout'
		setOpen(false)
		setError(null)
	}

	return loading ? (
		<Loading />
	) : (
		<Home>
			<Form
				register={register}
				handleSubmit={handleSubmit(submit)}
				errors={errors}
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
