import * as yup from 'yup';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const schema = (countries: string[]) => {
	return yup.object({
		name: yup
			.string()
			.matches(/^[A-Z][a-z_-]/, 'Your name should be capitalized')
			.min(4, 'At least 4 letters in the name')
			.required('You should type your name'),
		age: yup
			.number()
			.typeError('Amount must be a number')
			.required('You should type your age')
			.integer('Type your name in integer')
			.positive('Your age can`t be negative value')
			.min(6, 'Your age can`t be less than 6'),

		email: yup
			.string()
			.email('Please type correct email address')
			.required('Please enter a valid email address'),
		password: yup
			.string()
			.matches(/[0-9]/, 'should have at least 1 number')
			.matches(/[A-Z]/, 'should have at least letter in uppercase')
			.matches(/[a-z]/, 'should have at least letter in lowercase')
			.matches(/[@$!%*?&]/, 'should have at least 1 special symbol')
			.min(8, 'Password should be at lest 8 symbols')
			.required('You should type your password'),
		confirm_password: yup
			.string()
			.oneOf([yup.ref('password')], 'Passwords must match')
			.required('You should confirm your password'),
		gender: yup.string().required('Please choose your gender'),
		picture: yup
			.mixed()
			.test('required', 'Please upload file', (fileList) => {
				if (fileList && fileList instanceof FileList) {
					return fileList.length > 0;
				}
				return false;
			})
			.test('fileSize', 'The file is too large', (fileList) => {
				if (fileList && fileList instanceof FileList && fileList.length > 0) {
					return fileList[0].size <= MAX_FILE_SIZE;
				}
				return false;
			})
			.test('fileType', 'Unsupported File Format', (fileList) => {
				if (fileList && fileList instanceof FileList && fileList.length > 0) {
					return ['image/jpeg', 'image/png', 'image/jpg'].includes(
						fileList[0].type,
					);
				}
				return false;
			})
			.required(),
		country: yup
			.string()
			.oneOf(countries, 'Please click on country name from the list')
			.required('select your country'),
		terms: yup
			.boolean()
			.oneOf(
				[true],
				'Please confirm that you agree with my terms and conditions',
			)
			.required(),
	});
};
