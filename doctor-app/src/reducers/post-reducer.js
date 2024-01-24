import { ACTION_TYPE } from '../actions'

const initialPostState = {
	id: '',
	title: '',
	telephone: '',
	content: '',
}

export const postReducer = (state = initialPostState, action) => {
	const { type, payload } = action
	switch (type) {
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...state,
				...payload,
			}
		case ACTION_TYPE.RESET_POST_DATA:
			return initialPostState
		default:
			return state
	}
}
