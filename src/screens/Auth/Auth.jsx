
import React, { useContext, useEffect, useState } from 'react'
import { Input, message } from 'antd'
import Button from '../../components/Button/Button'
import { Link, Navigate } from 'react-router-dom'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { FaLock } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData, selectIsAuth } from '../../redux/slices/auth'

const Auth = () => {
	const isAuth = useSelector(selectIsAuth)
	const [passwordVisible, setPasswordVisible] = React.useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const onSubmit = async () => {
		const data = await dispatch(fetchUserData({ email, password }))
		if (!data.payload) {
			return alert('Не удалось авторизоваться')
		}
		if ('accessToken' in data.payload) {
			console.log(data.payload)
			localStorage.setItem('token', data.payload.accessToken)
			message.info(`С возвращением, ${data.payload.item.name}`);
		}
	}
	if (isAuth) {
		return <Navigate to={'/'} />
	}
	return (
		<div className='text-white w-4/5 mx-auto flex flex-col gap-5'>
			<h1 className='text-2xl font-bold text-center mb-10 text-black'>
				Авторизация
			</h1>
			<div className='flex flex-col gap-10'>
				<Input
					onChange={e => setEmail(e.target.value)}
					prefix={<MdEmail />}
					type='text'
					placeholder='Email'
				/>
				<Input.Password
					onChange={e => setPassword(e.target.value)}
					prefix={<FaLock />}
					placeholder='Password'
					iconRender={visible => (visible ? <BsEyeFill /> : <BsEyeSlashFill />)}
				/>
				<Button onClick={onSubmit}>Войти</Button>
			</div>
			<div className='flex items-center justify-center gap-2 text-black text-xs font-bold'>
				<span>Нет аккаунта?</span>
				<Link to={'/auth/registration'}>
					<span className='text-sky-600 hover:underline'>Зарегистрируйся!</span>
				</Link>
			</div>
			<div>
				<h1 className='text-white'></h1>
			</div>
		</div>
	)
}

export default Auth
