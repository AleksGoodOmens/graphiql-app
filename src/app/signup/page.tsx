'use client'

import { Form } from '@/components/Form/Form'
import Home from '../page'
import { formSchema } from '@/utils/schema/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MyForm } from '@/utils/types'
import { useRouter } from 'next/navigation'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { SyntheticEvent, useState } from 'react'
import { Snackbar } from '@mui/material'

export default function SingUp() {
	const [createUserWithEmailAndPassword] =
		useCreateUserWithEmailAndPassword(auth)
	const [error, setError] = useState<string | null>(null)
	const [open, setOpen] = useState(false)

	const router = useRouter()
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
		event?: Event | SyntheticEvent<any, Event>,
		reason?: string
	) => {
		reason === 'timeout'
		setOpen(false)
		setError(null)
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
