import React, { useEffect, useState } from 'react'
import { request } from '../../utilts/request'

export const Table = () => {
	const [data, setData] = useState([])
	useEffect(() => {
		request('/posts')
			.then(res => res.json())
			.then(({ data }) => setData(data))
	}, [])
	return (
		<div className='container mt-5'>
			<h1 className='text-center'>Заявки</h1>

			<table className='table mt-4'>
				<thead>
					<tr>
						<th scope='col'>ФИО</th>
						<th scope='col'>Телефон</th>
						<th scope='col'>Проблема</th>
					</tr>
				</thead>
				<tbody>
					{data.map(({ id, title, telephone, content }) => (
						<tr key={id}>
							<td>{title}</td>
							<td>{telephone}</td>
							<td>{content}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
