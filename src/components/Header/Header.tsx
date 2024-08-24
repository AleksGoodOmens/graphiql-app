import Link from 'next/link'
import './Header.css'

export default function Header() {
	return (
		<header>
			<div className='header-wrapper'>
				<div className='logo'>Logo</div>
				<div className='header-buttons'>
					<Link href='/signin'>Sign In</Link>
					<div>Language Toggle</div>
				</div>
			</div>
		</header>
	)
}
