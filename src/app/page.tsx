import { Button } from '@/components'
import { ReactNode } from 'react'

export default function Home({ children }: { children: ReactNode }) {
	return (
		<main>
			<h1>Welcome to CodeADE API Explorer</h1>
			<div className='main-buttons'>
				<Button
					href='/signin'
					name='Sign In'
				/>
				<Button
					href='/signup'
					name='Sign Up'
				/>
			</div>
			<div>{children}</div>
		</main>
	)
}
