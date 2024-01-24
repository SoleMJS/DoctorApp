import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Navigate } from 'react-router-dom'
import * as yup from 'yup'
import { setUser } from '../../actions'
import { ROLE } from '../../constants'
import { selectUserRole } from '../../selectors'
import { request } from '../../utilts/request'
const validationSchema = yup.object().shape({
	email: yup
		.string()
		.email('Введите корректный адрес электронной почты')
		.required('Заполните электронную почту'),
	password: yup.string().required('Заполните пароль'),
})

export const Auth = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(validationSchema),
	})

	const [serverError, setServerError] = useState(null)

	const dispatch = useDispatch()
	const store = useStore()
	const roleId = useSelector(selectUserRole)

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout
		return store.subscribe(() => {
			let prevWasLogout = currentWasLogout
			currentWasLogout = store.getState().app.wasLogout

			if (currentWasLogout !== prevWasLogout) {
				reset()
			}
		})
	}, [reset, store])

	const onSubmit = ({ email, password }) => {
		request('/login', 'POST', { email, password }).then(({ error, user }) => {
			if (error) {
				setServerError(error)
				return
			}

			dispatch(setUser(user))
			sessionStorage.setItem('userData', JSON.stringify(user))
		})
	}

	const formError = errors?.email?.message || errors?.password?.message
	const errorMessage = formError || serverError

	if (roleId !== ROLE.UNLOGIN) {
		return <Navigate to='/form' />
	}

	return (
		<div className='container  d-flex align-items-center justify-content-center vh-100'>
			<div className='border p-4 rounded'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-3'>
						<label htmlFor='email' className='form-label'>
							Электронная почта:
						</label>
						<input
							type='email'
							className='form-control'
							{...register('email', {
								onChange: () => setServerError(null),
							})}
						/>
					</div>

					<div className='mb-3'>
						<label htmlFor='password' className='form-label'>
							Пароль:
						</label>
						<input
							type='password'
							className='form-control'
							{...register('password', {
								onChange: () => setServerError(null),
							})}
						/>
					</div>

					<button
						type='submit'
						disabled={!!formError}
						className='btn btn-primary'
					>
						Войти
					</button>
					{errorMessage && <div className='text-danger'>{errorMessage}</div>}
				</form>
			</div>
		</div>
	)
}
