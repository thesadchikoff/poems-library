import MainLayout from './layout/Layout'
import Home from './screens/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Auth from './screens/Auth/Auth'
import Registration from './screens/Registration/Registration'
import User from './screens/User/User'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth'
import Premium from "./screens/Premium/Premium.jsx";
import UserSettings from "./screens/UserSettings/UserSettings.jsx";

function App() {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	useEffect(() => {
		dispatch(fetchAuthMe())
	}, [])
	return (
		<MainLayout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth/login' element={<Auth />} />
				<Route path='/auth/registration' element={<Registration />} />
				<Route path='/users/:id' element={<User />} />
				<Route path='/users/:id/settings' element={<UserSettings />} />
				<Route path='/premium-subscribe' element={<Premium />} />
			</Routes>
		</MainLayout>
	)
}

export default App
