import { ROLE } from '../constants'
import { addDoctorPost } from './session'
export const createSession = roleId => {
	const session = {
		logout() {
			Object.keys(session).forEach(key => {
				delete session[key]
			})
		},
	}

	switch (roleId) {
		case ROLE.LOGIN: {
			session.addDoctorPost = addDoctorPost
			break
		}
		case ROLE.UNLOGIN: {
			break
		}
		default:
		// Ничего не делать
	}

	return session
}
