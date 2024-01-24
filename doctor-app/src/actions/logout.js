import { request } from '../utilts/request'
import { ACTION_TYPE } from './action-types'

export const logout = () => {
	request('/logout', 'POST')
	return {
		type: ACTION_TYPE.LOGOUT,
	}
}
