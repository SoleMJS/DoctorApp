import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import {
	appReducer,
	postReducer,
	postsReducer,
	userReducer,
	usersReducer,
} from './reducers'

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	post: postReducer,
	posts: postsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk))
)
