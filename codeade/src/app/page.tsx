import { Intro } from '@/components'
const r = 2

export default function Home() {
	const a = (b) => b + 1

	console.log(a)
	return (
		<main>
			<h1>home page</h1>
			<Intro />
		</main>
	)
}
