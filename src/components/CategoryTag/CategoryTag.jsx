
import React from 'react'
import './CategoryTag.scss'
import { BiCategoryAlt } from 'react-icons/bi'

const CategoryTag = ({ category, onClick }) => {
	return (
		<div className='text-center tag font-bold rounded'>
			<button
				onClick={() => onClick()}
				className='text-white flex items-center gap-2'>
				<BiCategoryAlt /> {category}
			</button>
		</div>
	)
}

export default CategoryTag

