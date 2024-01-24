import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { setUser } from './actions'
import { Header } from './components/header/Header'
import { Auth, Form, Table } from './pages'
function App() {
	const dispatch = useDispatch()
	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData')

		if (!currentUserDataJSON) {
			return
		}
		const currentUserData = JSON.parse(currentUserDataJSON)
		dispatch(
			setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
		)
	}, [dispatch])

	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Auth />} />
				<Route path='/form' element={<Form />} />
				<Route path='/table' element={<Table />} />
			</Routes>
		</>
	)
}

export default App
