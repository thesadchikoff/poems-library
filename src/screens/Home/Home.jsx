
import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Poem from '../../components/Poem/Poem'
import { Spin, AutoComplete  } from 'antd'
import CategoryTag from '../../components/CategoryTag/CategoryTag'
import { fetchCategory, fetchPoems } from '../../redux/slices/poems'
import { fetchAuthMe } from '../../redux/slices/auth'
import {dadata} from "../../helpers/dadata.js";
const Home = () => {
	const [value, setValue] = useState('')
	const [options, setOptions] = useState([]);
	const handleSearch = (value) => {
		let res = [];
		if (!value || value.indexOf('@') >= 0) {
			res = [];
		} else {
			var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
			var token = "8457037c17cea06aeeb3d7a133f9f377d18953d9"
			let response = []
			var options = {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": "Token " + token
				},
				body: JSON.stringify({query: value})
			}
			fetch(url, options)
				.then(response => response.text())
				.then(result => response = result)
				.catch(error => console.log("error", error));
			console.log(response)
			res = response
				.map((domain) => ({
				value,
				label: `${value}@${domain.value}`,
			}));
		}
		setOptions(res);
	};
	const dispatch = useDispatch()
	const { poems, category } = useSelector(state => state.poems)
	const auth = useSelector(state => state.auth)
	const isPoemsLoading = poems.status === 'loading'
	useEffect(() => {
		dispatch(fetchAuthMe())
		dispatch(fetchPoems())
		dispatch(fetchCategory())
	}, [])
	const offFilter = () => {
		dispatch(fetchPoems())
	}
	const filterPosts = filter => {
		axios
			.get(`http://localhost:8080/api/posts/filter?category=${filter}`)
			.then(res => setPoems(res.data))
	}
	const handleInput = (e) => {
		const value = e.target.value
		setValue(value)
	}
	return (
		<div className='mt-10 mb-10 flex flex-col gap-10'>
			<AutoComplete
				style={{
					width: 200,
				}}
				onSearch={handleSearch}
				placeholder="input here"
				options={options}
			/>
			<div className='flex items-center gap-3 w-full flex-wrap'>
				<CategoryTag onClick={() => offFilter()} category={'Все'} />
				{category.items.map(category => {
					return (
						<CategoryTag
							key={category.name}
							onClick={() => filterPosts(category.name)}
							category={category.name}
						/>
					)
				})}
			</div>
			{poems.items?.message ? <h1 className={'font-semibold opacity-70'}> {poems.items.message}</h1> : <>
				{isPoemsLoading ? (
					<div className='flex flex-col items-center justify-center w-full h-[300px]'>
						<Spin size='large' />
					</div>
				) : (
					<div className='w-full flex items-center flex-wrap gap-10'>
						{poems.items.map(poem => {
							return (
								<Poem
									key={poem.id}
									id={poem.author.id}
									title={poem.title}
									category={poem.category}
									content={poem.content}
									name={poem.author.name}
									surname={poem.author.surname}
									created_at={poem.created_at}
									views={poem.views}
									is_sub={poem.by_subscription}
									verify={poem.author.verify}
									avatar={poem.author.avatar}
									previewUrl={poem.preview_url}
								/>
							)
						})}
					</div>
				)}
			</>}
		</div>
	)
}

export default Home

