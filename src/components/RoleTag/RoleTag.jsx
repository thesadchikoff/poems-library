
import React from 'react'
import './RoleTag.scss'

const RoleTag = ({ children, color, className }) => {
	return (
		<div
			className={`${className} min-w-[150px] word text-center pl-5 pr-5 pt-2 pb-2 rounded font-medium text-white ${color}`}>
			{children}
		</div>
	)
}

export default RoleTag
