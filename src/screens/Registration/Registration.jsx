
import React, { useState } from 'react'
import { Input, message } from 'antd'
import Button from '../../components/Button/Button'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { FaLock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const Registration = () => {
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isDisable, setIsDisable] = useState(false)
	const [error, setError] = useState('')
	const [passwordVisible, setPasswordVisible] = React.useState(false)
	const registrationUser = () => {
		setIsDisable(true)
		axios
			.post('http://localhost:8080/api/user/auth/registration', {
				name,
				surname,
				email,
				password,
			})
			.then(res => {
				setError(res.data?.message)
				messageApi.open({
					type: 'error',
					content: error?.message,
				})
			})
			.finally(() => setIsDisable(false))
	}
	return (

			<div className='text-white w-4/5 mx-auto flex flex-col gap-5'>
				<h1 className='text-2xl font-bold text-center mb-10 text-black'>
					Регистрация
				</h1>
				<form className='flex flex-col gap-10'>
					<Input
						onChange={e => setName(e.target.value)}
						type='text'
						placeholder='Имя'
						value={name}
					/>
					<Input
						onChange={e => setSurname(e.target.value)}
						type='text'
						placeholder='Фамилия'
						value={surname}
					/>
					<Input
						prefix={<MdEmail />}
						onChange={e => setEmail(e.target.value)}
						type='text'
						placeholder='Электронная почта'
						value={email}
					/>
					<Input.Password
						onChange={e => setPassword(e.target.value)}
						prefix={<FaLock />}
						placeholder='Password'
						iconRender={visible =>
							visible ? <BsEyeFill /> : <BsEyeSlashFill />
						}
					/>
					<Button disable={isDisable} onClick={registrationUser}>
						Зарегистрироваться
					</Button>
				</form>
				<div className='flex items-center justify-center gap-2 text-black text-xs font-bold'>
					<span>Если у Вас уже есть аккаунт -</span>
					<Link to={'/auth/login'}>
						<span className='text-sky-600 hover:underline'>авторизуйтесь!</span>
					</Link>
				</div>
				<div>
					<h1 className='text-white'></h1>
				</div>
			</div>
	)
}

export default Registration
