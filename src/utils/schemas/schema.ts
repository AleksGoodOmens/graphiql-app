import * as yup from 'yup'

export const formSchema = yup.object().shape({
	email: yup
		.string()
		.email('Please type correct email address')
		.required('Please enter a valid email address'),
	password: yup
		.string()
		.matches(/[0-9]/, 'should have at least 1 number')
		.matches(/[a-zA-Z]/, 'should have at least 1 letter')
		.matches(/[@$!%*?&]/, 'should have at least 1 special symbol')
		.min(8, 'Password should be at lest 8 symbols')
		.required('You should type your password'),
})
