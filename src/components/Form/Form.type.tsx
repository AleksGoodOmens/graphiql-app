import { MyForm } from '@/utils/types'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

export type FormProps = {
	register: UseFormRegister<MyForm>
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
	errors: FieldErrors<MyForm>
}
