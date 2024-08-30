import Link from 'next/link'
import { ButtonProps } from './Button.type'

export function Button({ name, href }: ButtonProps) {
	return <Link href={href}>{name}</Link>
}
