export const addPost = ({ id, content, telephone, title }) =>
	fetch('http://localhost:3005/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			id,
			title,
			telephone,
			content,
		}),
	}).then(createdPost => createdPost.json())
