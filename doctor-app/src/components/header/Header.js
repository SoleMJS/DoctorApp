import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../actions'
import { ROLE } from '../../constants'
import { selectUserRole } from '../../selectors'
export const Header = () => {
	const roleId = useSelector(selectUserRole)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const onLogout = () => {
		dispatch(logout())
		sessionStorage.removeItem('userData')
		navigate('/')
	}
	return (
		<header
			className='bg-primary border rounded py-3 mx-auto'
			style={{ width: '75%' }}
		>
			<div className='container d-flex justify-content-between align-items-center'>
				{roleId === ROLE.UNLOGIN ? (
					<span className='text-light fs-5 fw-300 text-center'>
						Для получения полного доступа авторизуйтесь!
					</span>
				) : (
					<div
						className='d-flex justify-content-between align-items-center'
						style={{ width: '100%' }}
					>
						<Link to='/table' className='text-light text-decoration-none'>
							Таблица с формами
						</Link>

						<Link to='/form' className='text-light text-decoration-none'>
							Заполнить Форму
						</Link>
						<button onClick={onLogout} className='text-light btn'>
							Выйти
						</button>
					</div>
				)}
			</div>
		</header>
	)
}
