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

export default function SingUp() {
	const [createUserWithEmailAndPassword] =
		useCreateUserWithEmailAndPassword(auth)

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
			const result = await createUserWithEmailAndPassword(email, password)
			if (result) {
				router.push('/')
			}
		}
	}

	return (
		<Home>
			<Form
				register={register}
				errors={errors}
				handleSubmit={handleSubmit(submit)}
			/>
		</Home>
	)
}
