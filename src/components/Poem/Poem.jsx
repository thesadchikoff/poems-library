
import React from 'react'
import { Divider, Tag, Avatar, Card } from 'antd'
import CategoryTag from '../CategoryTag/CategoryTag'
import { Link } from 'react-router-dom'
import { AiOutlineEye } from 'react-icons/ai'
import { GoVerified } from 'react-icons/go'
import './Poem.scss'

const { Meta } = Card

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']
const Poem = ({
	id,
	title,
	category,
	content,
	name,
	surname,
	created_at,
	views,
	is_sub,
	verify,
	avatar,
	previewUrl,
}) => {
	const formatDate = new Intl.DateTimeFormat('ru', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
	return (
		<div className='poem-item shadow-lg rounded w-full desktop:w-[48%]'>
			<div className='preview-info'>
				<img className='preview rounded' src={previewUrl} alt='' />
				<h1 className='text font-bold text-stone-700 bg-white p-2 rounded'>
					{title}
				</h1>
				<h1 className='category font-bold text-stone-700 bg-white p-2 rounded'>
					{category}
				</h1>
			</div>
			<div className='p-5 flex items-center justify-between'>
				<div>
					<div className='flex items-center gap-3'>
						<Avatar
							src={avatar}
							style={{
								backgroundColor: '#f56a00',
								verticalAlign: 'middle',
							}}
							size={30}
							gap={4}>
							{name}
						</Avatar>
						<div className='flex items-center gap-2'>
							<Link
								className='duration-300 hover:delay-300 font-semibold text-xs desktop:text-base'
								to={`users/${id}`}>
								{name + ' ' + surname}
							</Link>
							{verify && <GoVerified className='text-blue-600' />}
						</div>
					</div>
					<div>
						<span className='text-xs font-semibold text-stone-400'>
							Опубликовано: {formatDate.format(new Date(created_at))}
						</span>
					</div>
				</div>
				<div className='flex items-center gap-2 text-gray-500'>
					<AiOutlineEye /> <span>{views}</span>
				</div>
			</div>
		</div>
	)
}

export default Poem

