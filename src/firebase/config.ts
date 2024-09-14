import { initializeApp, getApps, getApp } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

const originalConsoleLog = console.log

console.log = function (...args) {
	if (
		args.some((arg) => typeof arg === 'string' && arg.includes('heartbeats'))
	) {
		return
	}

	originalConsoleLog.apply(console, args)
}

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
	messagingSenderId: process.env
		.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)

const logInWithEmailAndPassword = async ({
	email,
	password,
}: {
	email: string
	password: string
}) => {
	try {
		const res = await signInWithEmailAndPassword(auth, email, password)
		const user = res.user
		return user
	} catch (err) {
		console.error(err)
	}
}

const registerWithEmailAndPassword = async ({
	name,
	email,
	password,
}: {
	name: string
	email: string
	password: string
}) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password)
		const user = res.user
		await addDoc(collection(db, 'users'), {
			uid: user.uid,
			name,
			authProvider: 'local',
			email,
		})
		return user
	} catch (err) {
		console.error(err)
	}
}

export { auth, logInWithEmailAndPassword, registerWithEmailAndPassword }
