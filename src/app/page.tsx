import { ReactNode } from 'react'
import Main from '@/components/Main/Main'

export default function Home({ children }: { children: ReactNode }) {
	return <Main>{children}</Main>
}
