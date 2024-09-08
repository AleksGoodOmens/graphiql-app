import Main from '@/components/Main/Main'
import { ReactNode } from 'react'

export default function Home({ children }: { children: ReactNode }) {
	return <Main>{children}</Main>
}
