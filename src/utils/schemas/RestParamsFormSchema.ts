import * as yup from 'yup'

export const restParamsFormSchema = () => {
	return yup
		.object({
			key: yup.string().required('key is required'),
			value: yup.string().required('value is required'),
		})
		.required()
}
