import * as yup from 'yup'
export const HTTPMethods = [
	'GET',
	'POST',
	'PUT',
	'DELETE',
	'PATCH',
	'HEAD',
	'OPTIONS',
]

export const restFormSchema = yup
	.object({
		HTTPMethod: yup
			.string()
			.oneOf(HTTPMethods)
			.required('HTTP Method is required'),
		RequestUrl: yup
			.string()
			.matches(/^https:\/\//, 'Request url should starts with https://')
			.min(10, 'At list 10 symbols')
			.required('You should provide correct request url'),
	})
	.required()
