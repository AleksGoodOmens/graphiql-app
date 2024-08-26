'use client'

import { Form } from '@/components/Form/Form'
import Home from '../page'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MyForm } from '@/utils/types'
import { useRouter } from 'next/navigation'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'

export default function SingIn() {
	const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
	const router = useRouter()
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<MyForm>()

	const submit: SubmitHandler<MyForm> = async (data) => {
		const { email, password } = data

		const result = await signInWithEmailAndPassword(email, password)
		if (result) {
			router.push('/')
		}
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
