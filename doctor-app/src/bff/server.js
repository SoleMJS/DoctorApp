import { addPost } from './api'
import { getUser } from './api/get-user'
import { sessions } from './sessions'

export const server = {
	async logout(session) {
		sessions.remove(session)
	},
	async authorize(authEmail, authPassword) {
		const user = await getUser(authEmail)

		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				res: null,
			}
		}
		if (authPassword !== user.password) {
			return {
				error: 'Пароль не верный',
				res: null,
			}
		}
		return {
			error: null,
			res: {
				id: user.id,
				email: user.email,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		}
	},
	async savePost(newPostData) {
		console.log('data', newPostData)
		const savedPost = await addPost(newPostData)

		return {
			error: null,
			res: savedPost,
		}
	},
}
