'use client'

import { SyntheticEvent, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { formSchema, MyForm } from '@/utils'
import { useRouter } from 'next/navigation'
import { auth, registerWithEmailAndPassword } from '@/firebase/config'
import { Snackbar } from '@mui/material'
import { Form } from '@/components'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from '../../loading'

export default function SingUp() {
	const [error, setError] = useState<string | null>(null)
	const [open, setOpen] = useState(false)
	const [user, loading] = useAuthState(auth)
	const router = useRouter()

	useEffect(() => {
		if (user) router.replace('/')
	}, [user, router])

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<MyForm>({ mode: 'onChange', resolver: yupResolver(formSchema) })

	const submit: SubmitHandler<MyForm> = async (data) => {
		const isValid = await formSchema.isValid(data)
		const { email, password } = data
		const name = email

		if (isValid) {
			const result = await registerWithEmailAndPassword({
				name,
				email,
				password,
			})
			result
				? router.push('/')
				: (setError('Email already exists'), setOpen(true))
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

	return loading ? (
		<Loading />
	) : (
		<>
			<Form
				register={register}
				errors={errors}
				aria-label='singUp'
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
		</>
	)
}
