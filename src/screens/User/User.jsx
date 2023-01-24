
import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { message, Tooltip} from 'antd'
import { MdOutlineVerifiedUser } from 'react-icons/md'
import { FaBirthdayCake } from 'react-icons/fa'
import { GoVerified } from 'react-icons/go'
import { AiOutlineCrownW, AiOutlineInfoCircle } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import RoleTag from '../../components/RoleTag/RoleTag'
import { FiPhone } from 'react-icons/fi'
import { SiAdblock } from 'react-icons/si'
import './User.scss'
import { useSelector } from 'react-redux'
import Button from '../../components/Button/Button'
import { selectIsAuth } from '../../redux/slices/auth'
import { TbSettings } from 'react-icons/tb'
import $api from "../../http/index.js";
import UserInfoItem from "../../components/UserInfoItem/UserInfoItem.jsx";
import PoemInProfile from "../../components/PoemInProfile/PoemInProfile.jsx";
import InputMask from "react-input-mask";

const User = () => {
	const { id } = useParams()
	const [user, setUser] = useState(null)
	const auth = useSelector(state => state.auth)
	const isAuth = useSelector(selectIsAuth)
	const [messageApi, contextHolder] = message.useMessage();
	useEffect(() => {
		$api
			.get(`api/user/${id}`)
			.then(res => setUser(res.data))
	}, [user])
	const getColor = role => {
		switch (role) {
			case 'Администратор':
				return 'admin'
			case 'Модератор':
				return 'moderator'
			case 'Автор':
				return 'author'
			case 'Поддержка':
				return 'support'
			default:
				return 'default'
		}
	}
	const blockUser = () => {
		$api.put(`api/user/ban/${user.id}`).finally(() => {
			user.banned ? messageApi.open({
				type: 'success',
				content: `Пользователь ${user.fullname} успешно разблокирован на сайте`,
			}) : messageApi.open({
				type: 'success',
				content: `Пользователь ${user.fullname} успешно заблокирован на сайте`,
			});
		})
	}
	return (
		<>
			{user ? (
				<div className='flex-col gap-10 justify-between'>
					{contextHolder}
					<div className={`banner mobile:mb-[40px] ${!user.banner && 'desktop:mb-[100px] mobile:mb-[100px]'}`}>
						{user.banner && <img
							className='banner-image mobile:h-[130px] desktop:h-[150px]'
							src={user.banner}
							alt=''
						/>}
						<div className={`relative ${!user.banner && 'top-[60px]'}`}>
							{
								user.avatar ? <img className={`relative rounded-full desktop:border-[5px] mobile:border-[3px] border-white desktop:bottom-[70px] mobile:bottom-[50px] desktop:bottom-[70px] object-cover mobile:h-[100px] mobile:w-[100px] desktop:w-[150px] desktop:h-[150px]`} src={user.avatar} alt='' /> : <img className='relative rounded-full desktop:border-[5px] mobile:border-[3px] border-white desktop:bottom-[70px] mobile:bottom-[50px] desktop:bottom-[70px] object-cover mobile:h-[100px] mobile:w-[100px] desktop:w-[150px] desktop:h-[150px]' src={'https://leushint.gosuslugi.ru/netcat_files/9/167/4_2.jpg'} alt='' />
							}
							{isAuth && (
								<>
									{auth.item.id === user.id && (
											<>
												<Link to={`/users/${user.id}/settings`}>
													<TbSettings className={`absolute desktop:right-[-120px] right-[-85px] hover:bg-slate-500 cursor-pointer top-[15px] p-2 border-2 rounded-xl hover:text-white text-[45px] text-slate-500 ${!user.banner && 'desktop:top-[-10px] mobile:top-[-25px]'}`} />
												</Link>
												<AiOutlineInfoCircle className={`absolute desktop:left-[-120px] left-[-85px] hover:bg-slate-500 cursor-pointer top-[15px] p-2 border-2 rounded-xl hover:text-white text-[45px] text-slate-500 ${!user.banner && 'desktop:top-[-10px] mobile:top-[-25px]'}`} />
											</>
									)}
								</>
							)}
						</div>
						<div className={`flex items-center user-name desktop:bottom-[60px] mobile:bottom-[30px] gap-2 ${!user.banner && 'desktop:top-[20px] mobile:top-[25px]'}`}>
							<h1 className={'font-black'}>{user.fullname}</h1>
							{user.verify && (
								<Tooltip placement='top' title={'Страница подтверждена'}>
									<GoVerified className='text-blue-600' />
								</Tooltip>
							)}
							{user.banned && (
								<Tooltip placement='top' title={'Заблокированный пользователь'}>
									<SiAdblock className={'text-red-600'} />
								</Tooltip>
							)}
						</div>
						{
							user.status && <div className={`relative desktop:bottom-[50px] font-semibold opacity-60 text-xs mobile:bottom-[15px] ${!user.banner && 'desktop:top-[35px] mobile:top-[40px]'}`}><span>{user.status}</span></div>
						}
						<RoleTag className={`relative desktop:bottom-[30px] mobile:bottom-[-10px] ${!user.banner && 'desktop:top-[60px] mobile:top-[60px]'}`} color={getColor(user.role)}>
							{user.role}
						</RoleTag>
					</div>
					<div className='w-full text-xs desktop:text-base desktop:h-[400px] mb-[50px] rounded-md shadow-md border p-10 flex flex-col desktop:flex-row h-max justify-between gap-20 desktop:gap-0'>
						<div className='w-full desktop:w-1/2'>
							{auth.item ? (
								<h1 className='text-xl mb-5 font-bold'>
									{auth.item.id === user.id
										? 'Информация о вас'
										: 'Информация о пользователе'}
								</h1>
							) : (
								<h1 className='text-xl mb-5 font-bold'>
									Информация о пользователе
								</h1>
							)}
							<div className='flex flex-col gap-3'>
								<UserInfoItem icon={<HiOutlineMail />} val1={'Почта'} val2={user.email}/>
								<span className={`flex items-center gap-2`}>
									<FiPhone />
									<b>Номер телефона:</b>{' '}
									{user.phones.length > 0 ? user.phones.map(phone => {
										const number = phone.number
										return (
											<article className={`opacity-70 font-semibold`}>

												<InputMask className={'bg-inherit select-none h-max'} disabled mask="7 (999) 999 99 99"  value={number}/>
											</article>
										)
									}) : <article className={`opacity-70 font-semibold`}>
										Не указан
									</article>}
								</span>
								<UserInfoItem icon={<FaBirthdayCake />} val1={'Дата рождения'} date={user.birth_day}/>
								<UserInfoItem icon={<AiOutlineCrown />} val1={'Premium аккаунт'} val2={user.is_premium ? 'подключен' : 'отсутствует'} styles={user.is_premium ? 'text-green-700' : 'text-red-600'}/>
								<UserInfoItem icon={<MdOutlineVerifiedUser />} val1={'Статус аккаунта'} val2={user.is_activated ? 'активирован' : 'не активирован'} styles={user.is_activated ? 'text-green-700' : 'text-red-600'}/>
							</div>
							{}
						</div>
						<div className='w-full desktop:w-1/2'>
							{auth.item ? (
								<h1 className='text-xl mb-5 font-bold'>
									{auth.item.id === user.id
										? 'Ваши публикации'
										: 'Публикации пользователя'}
								</h1>
							) : (
								<h1 className='text-xl mb-5 font-bold'>
									Публикации пользователя
								</h1>
							)}
							<div className='w-full max-h-[290px] p-2 overflow-auto scroll'>
								<div className='flex flex-col gap-5'>
									{user.poems.length <= 0 ? (
										<div className='flex justify-center items-center flex-col h-[200px] border rounded'>
											<h1 className='font-bold opacity-50'>
												Публикаций пока нет
											</h1>
										</div>
									) : (
										<>
											{user.poems.map(poem => {
												return (
													<PoemInProfile title={poem.title} category={poem.category} createdAt={poem.created_at} views={poem.views}/>
												)
											})}
										</>
									)}
								</div>
							</div>
						</div>
					</div>
					{auth.item && (
						<>
							{auth.item.id === user.id && (
								<div className='mb-10 flex desktop:gap-8 mobile:flex-col mobile:gap-5'>
									{auth.item.role === 'Автор' ||
									auth.item.role === 'Модератор' ||
									auth.item.role === 'Поддержка' ||
									auth.item.role === 'Администратор' ? (
										<>{
											auth.item.role === 'Поддержка' || auth.item.role === 'Модератор' || auth.item.role === 'Администратор' ? <>
											<Button>Создать публикацию</Button>
											<Button className={'bg-red-500'}>Жалобы пользователей</Button>
										</> : <Button className={'w-full'}>Создать публикацию</Button>}
										</>
									) : (
										<Button className={'w-full'}>Стать автором</Button>
									)}
								</div>
							)}
						</>
					)}
					{
						auth.item && <div className='mb-10 flex desktop:gap-8 mobile:flex-col mobile:gap-5'>
							{
								auth.item.id !== user.id &&
								<>
									{
										auth.item.role === 'Администратор' && <>
											<Button onClick={blockUser} className={'bg-red-500 hover:bg-red-900'}>{user.banned ? 'Разблокировать аккаунт' : 'Заблокировать аккаунт'}</Button>
											<Button className={'bg-red-500 hover:bg-red-900'}>Удалить аккаунт</Button>
										</>
									}
								</>
							}
						</div>
					}
				</div>
			) : (
				<h1>Загрузка...</h1>
			)}
		</>
	)
}

export default User
