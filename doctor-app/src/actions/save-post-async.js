import { request } from '../utilts/request'
import { setPostData } from './set-post-data'

export const savePostAsync = (id, newPostData) => dispatch => {
	const saveRequest = id
		? request(`/posts/${id}`, 'PATCH', newPostData)
		: request('/posts', 'POST', newPostData)
	saveRequest.then(updatedPost => {
		dispatch(setPostData(updatedPost.data))

		return updatedPost.data
	})
}
