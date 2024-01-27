import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import * as yup from 'yup'
import { setUser } from '../../actions'
import { ROLE } from '../../constants/role'
import { useResetForm } from '../../hooks'
import { selectUserRole } from '../../selectors'
import { request } from '../../utilts/request'

const regFormScheme = yup.object().shape({
	email: yup
		.string()
		.required('Заполните почту')
		.email('Неверный формат почты'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки #,%'
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30'),
	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
})

export const Registr = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormScheme),
	})

	const [serverError, setServerError] = useState(null)

	const dispatch = useDispatch()

	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ email, password }) => {
		request('/register', 'POST', { email, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`)
					return
				}

				dispatch(setUser(user))
				sessionStorage.setItem('userData', JSON.stringify(user))
			}
		)
	}

	const formError =
		errors?.email?.message ||
		errors?.password?.message ||
		serverError ||
		errors?.passcheck?.message
	const errorMessage = formError || serverError

	if (roleId !== ROLE.UNLOGIN) {
		return <Navigate to='/' />
	}

	return (
		<div className='d-flex justify-content-center align-items-center vh-100'>
			<div className='container'>
				<h2 className='text-center mb-4'>Регистрация</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type='text'
						className='form-control mb-3'
						placeholder='Почта...'
						{...register('email', {
							onChange: () => setServerError(null),
						})}
					/>
					<input
						type='password'
						className='form-control mb-3'
						placeholder='Пароль...'
						{...register('password', {
							onChange: () => setServerError(null),
						})}
					/>
					<input
						type='password'
						className='form-control mb-3'
						placeholder='Проверка пароля...'
						{...register('passcheck', {
							onChange: () => setServerError(null),
						})}
					/>
					<button
						type='submit'
						className='btn btn-primary mb-3'
						disabled={!!formError}
					>
						Зарегистрироваться
					</button>
					{errorMessage && <div className='text-danger'>{errorMessage}</div>}
				</form>
			</div>
		</div>
	)
}
