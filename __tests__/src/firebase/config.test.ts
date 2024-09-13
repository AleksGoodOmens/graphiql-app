import {
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
} from '@/firebase/config'
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	getAuth,
} from 'firebase/auth'
import { initializeApp, getApps } from 'firebase/app'
import { addDoc } from 'firebase/firestore'

jest.mock('firebase/app', () => ({
	initializeApp: jest.fn(),
	getApps: jest.fn(() => []),
	getApp: jest.fn(),
}))

jest.mock('firebase/auth', () => ({
	getAuth: jest.fn(),
	signInWithEmailAndPassword: jest.fn(),
	createUserWithEmailAndPassword: jest.fn(),
}))

jest.mock('firebase/firestore', () => ({
	getFirestore: jest.fn(),
	addDoc: jest.fn(),
	collection: jest.fn(() => 'mockedCollection'),
}))

describe('Firebase config tests', () => {
	it('should initialize Firebase app and auth', () => {
		// Импортируйте файл с Firebase конфигурацией

		expect(getAuth).toHaveBeenCalled()
		expect(getApps).toHaveBeenCalled()
		expect(initializeApp).toHaveBeenCalled()
	})
})

describe('Firebase Auth', () => {
	it('should log in user with email and password', async () => {
		;(signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
			user: { uid: 'testUid' },
		})

		const user = await logInWithEmailAndPassword({
			email: 'test@example.com',
			password: 'test123',
		})

		expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
			undefined,
			'test@example.com',
			'test123'
		)
		expect(user).toEqual({ uid: 'testUid' })
	})

	it('should register user and add to Firestore', async () => {
		;(createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
			user: { uid: 'testUid' },
		})

		await registerWithEmailAndPassword({
			name: 'Test User',
			email: 'test@example.com',
			password: 'test123',
		})

		expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
			undefined,
			'test@example.com',
			'test123'
		)
		expect(addDoc).toHaveBeenCalledWith('mockedCollection', {
			uid: 'testUid',
			name: 'Test User',
			authProvider: 'local',
			email: 'test@example.com',
		})
	})
})
describe('Firebase Auth - Error Handling', () => {
	it('should handle error in registerWithEmailAndPassword', async () => {
		const mockError = new Error('Registration failed')
		;(createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(mockError)

		const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

		await registerWithEmailAndPassword({
			name: 'Test User',
			email: 'test@example.com',
			password: 'test123',
		})

		// Check if the error was logged
		expect(consoleErrorSpy).toHaveBeenCalledWith(mockError)

		consoleErrorSpy.mockRestore()
	})

	it('should handle error in logInWithEmailAndPassword', async () => {
		// Mocking the error scenario
		const mockError = new Error('Login failed')
		;(signInWithEmailAndPassword as jest.Mock).mockRejectedValue(mockError)

		// Mock console.error to track error logs
		const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

		// Call the function and expect it to handle the error
		await logInWithEmailAndPassword({
			email: 'test@example.com',
			password: 'test123',
		})

		// Check if the error was logged
		expect(consoleErrorSpy).toHaveBeenCalledWith(mockError)

		// Restore the original console.error after the test
		consoleErrorSpy.mockRestore()
	})
})
