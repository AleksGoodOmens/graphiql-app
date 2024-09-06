'use client'

import { Form } from '@/components/Form/Form'
import Home from '../page'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MyForm } from '@/utils/types'
import { useRouter } from 'next/navigation'
import {
	useAuthState,
	useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { useEffect } from 'react'
import Loading from '../loading'

export default function SingIn() {
	const [user, loading] = useAuthState(auth)
	const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
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
	} = useForm<MyForm>()

	const submit: SubmitHandler<MyForm> = async (data) => {
		const { email, password } = data
		try {
			const result = await signInWithEmailAndPassword(email, password)
			if (result) {
				router.push('/')
			}
		} catch (err) {
			console.error(err)
		}
	}

	if (loading) {
		return <Loading />
	}

	return (
		<Home>
			<Form
				register={register}
				handleSubmit={handleSubmit(submit)}
				errors={errors}
			/>
		</Home>
	)
}
