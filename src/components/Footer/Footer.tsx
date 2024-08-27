import './Footer.css'
import Image from 'next/image'
import rsschoollogo from '../../assets/rs_school_logo.svg'
import Link from 'next/link'

export default function Footer() {
	return (
		<footer>
			<div className='footer-wrapper'>
				<div className='footer-links'>
					<Link
						href='https://github.com/raenlin/'
						target='blank'
					>
						Raenlin
					</Link>
					<span>|</span>
					<Link
						href='https://github.com/AleksGoodOmens'
						target='blank'
					>
						AleksGoodOmens
					</Link>
					<span>|</span>
					<Link
						href='https://github.com/Karzhen'
						target='blank'
					>
						Karzhen
					</Link>
				</div>
				<div>2024</div>
				<Link
					href='https://rs.school/'
					target='blank'
				>
					<Image
						width={100}
						src={rsschoollogo}
						alt='Logo'
					/>
				</Link>
			</div>
		</footer>
	)
}
