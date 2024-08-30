import { Main } from '@/components'
import { ReactNode } from 'react'

export default function Home({ children }: { children: ReactNode }) {
	return <Main>{children}</Main>
}
