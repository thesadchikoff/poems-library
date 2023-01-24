
import React, {useRef} from 'react'
import './Layout.scss'
import { GiBookmarklet } from 'react-icons/gi'
import PremiumButton from '../components/PremiumButton/PremiumButton'
import Button from '../components/Button/Button'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectIsAuth } from '../redux/slices/auth'
import { Avatar, Modal, Menu } from 'antd'
import { AiFillInfoCircle, AiOutlineMenu } from 'react-icons/ai'
import {linkItems} from "../data/linkItems.js";
import UserInfo from "../components/UserInfo/UserInfo.jsx";

const MainLayout = ({ children }) => {
	const ref = useRef(null)
	function getItem(label, key, icon, children) {
		return {
			key,
			icon,
			children,
			label,
		};
	}
	const isAuth = useSelector(selectIsAuth)
	const auth = useSelector(state => state.auth)

	const dispatch = useDispatch()
	const date = new Date()
	const yearNow = date.getFullYear()
	const { confirm } = Modal
	const onClickLogout = () => {
		confirm({
			title: 'Вы действительно хотите выйти из аккаунта?',
			icon: <AiFillInfoCircle />,
			className: 'display: flex; backgroundColor: red',
			onOk() {
				dispatch(logout())
				window.localStorage.removeItem('token')
			},
			onCancel() {},
		})
	}
	const items = [
		getItem(null, 'sub1', <AiOutlineMenu className={'hover:text-white'} />,
			[getItem('Информация сайта', 'g1', null, linkItems.map(item => {
				return getItem(item.title, item.title)
			}), 'group'),
				auth.item && getItem(<span className={'flex items-center gap-2 font-semibold'}><Avatar className={'shadow-md border'} src={auth.item.avatar}/> {auth.item.name}</span>, auth.item.id, null, [
					getItem(<Link to={`/users/${auth.item.id}`}>Профиль</Link>, 'profile'),
					getItem(<Link to={`/users/${auth.item.id}/settings`}>Настройки</Link>, 'settings'),
					getItem(<span onClick={onClickLogout}>Выйти</span>)
				] ),
				!isAuth && getItem(<Link  to={'/auth/login'}><span>Войти</span></Link>)
		]),
	]
	console.log(auth)
	return (
		<div className={'layout'}>
			<header className='flex items-center w-full min-h-[50px] desktop:min-h-[100px]'>
				<div className='relative container flex items-center justify-between'>
					<Link to={'/'} className='flex items-center gap-2 w-max'>
						<GiBookmarklet />
						<h1 className='text-xs desktop:text-lg'>Poems Library</h1>
					</Link>
					<Link to={'/premium-subscribe'}>
						<PremiumButton />
					</Link>
					<Menu
						className={'absolute bg-indigo-800 rounded-lg text-white hover:bg-indigo-500 right-0 mobile:block desktop:hidden'}
						ref={ref}
						mode={'vertical'}
						inlineCollapsed={true}
						items={items}
					/>
					<Navbar />
					<div className='flex items-center mobile:justify-between gap-10'>
						<div className={'mobile:hidden desktop:block tablet:hidden'}>
							{auth.item && (
								<UserInfo id={auth.item.id} avatar={auth.item.avatar} name={auth.item.name}/>
							)}
						</div>
						{isAuth ?
							<Button
								className={'mobile:hidden tablet:hidden desktop:block'}
								onClick={onClickLogout}>
								Выйти
							</Button> : <Link to={'/auth/login'}>
								<Button
									className={'mobile:hidden tablet:hidden desktop:block'}>
									Войти
								</Button>
							</Link>
						}
					</div>
				</div>
			</header>
			<main className='container'>{children}</main>
			<footer className='flex items-center min-h-[60px]'>
				<div className='container flex items-center justify-between'>
					<Link to={'/'} className='flex items-center gap-2'>
						<GiBookmarklet />
						<h1 className='text-[12px] desktop:text-xs'>Poems Library</h1>
					</Link>
					<div>
						<span className='text-[10px] desktop:text-xs font-semibold text-stone-700'>
							2022-{yearNow} г.
						</span>
					</div>
					<div>
						<h1 className='text-[8px] desktop:text-xs text-stone-600'>
							Developed by Sadchikoff Solutions
						</h1>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default MainLayout

