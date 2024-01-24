import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePostAsync } from '../../actions'

export const Form = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const titleRef = useRef(null)
	const telephoneRef = useRef(null)
	const contentRef = useRef(null)
	const id = Math.random().toFixed(50).toString()

	const onSave = () => {
		const newTitle = titleRef.current.value
		const newTelephone = telephoneRef.current.value
		const newContent = contentRef.current.value
		dispatch(
			savePostAsync(id, {
				title: newTitle,
				telephone: newTelephone,
				content: newContent,
			})
		).then(() => navigate('/table'))
	}

	return (
		<div className='container  d-flex align-items-center justify-content-center vh-100'>
			<div className='border p-4 rounded'>
				<h4 className='text-center'>Запись к врачу</h4>
				<hr />
				<form>
					<div className='mb-3'>
						<label htmlFor='email' className='form-label'>
							ФИО
						</label>
						<input ref={titleRef} type='text' className='form-control' />
					</div>

					<div className='mb-3'>
						<label htmlFor='password' className='form-label'>
							Номер телефона
						</label>
						<input ref={telephoneRef} type='text' className='form-control' />
					</div>

					<div className='mb-3'>
						<label htmlFor='password' className='form-label'>
							Опишите вашу жалобу
						</label>
						<textarea ref={contentRef} type='text' className='form-control' />
					</div>

					<button onClick={onSave} type='submit' className='btn btn-primary'>
						Отправить
					</button>
				</form>
			</div>
		</div>
	)
}
