
import React from 'react'
import { linkItems } from '../../data/linkItems'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<ul className='w-max desktop:flex gap-8 font-medium hidden desktop:block'>
			{linkItems.map(link => {
				return (
					<Link key={link.title} to={link.url}>
						<li>{link.title}</li>
					</Link>
				)
			})}
		</ul>
	)
}

export default Navbar
