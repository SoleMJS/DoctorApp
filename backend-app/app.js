require('dotenv').config
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { login, register } = require('./controllers/user')
const mapUser = require('./helpers/mapUser')
const authenticated = require('./middlewares/authenticated')
const { getPosts } = require('./controllers/post')
const port = 3001
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.static('../doctor-app/build'))

app.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body.email, req.body.password)

		res
			.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) })
	} catch (error) {
		res.send({ error: error.message || 'Unknown error' })
	}
})

app.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.email, req.body.password)
		res
			.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) })
	} catch (error) {
		res.send({ error: error.message || 'Unknown error' })
	}
})

app.post('/logout', (req, res) => {
	res
		.cookie('token', '', { httpOnly: true })
		.send({ error: null, user: mapUser(user) })
})

app.get('/posts', async (req, res) => {
	try {
		const posts = await getPosts()
		res.json({ error: null, posts })
	} catch (error) {
		res.json({ error: error.message || 'Unknown error', posts: [] })
	}
})

app.use(authenticated)

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log('Server started')
	})
})
