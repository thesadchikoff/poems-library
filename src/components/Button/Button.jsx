
import React from 'react'
import './Button.scss'

const Button = ({ children, disable, onClick, type, className }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disable ? disable : false}
			className={`btnCustom ${className}`}>
			{children}
		</button>
	)
}

export default Button
