const bcrypt = require('bcrypt')
const { generate } = require('../helpers/token')

// login
async function login(email, password) {
	const user = await User.findOne({ email }) // Ищу юзера

	if (!user) {
		throw new Error('User not found')
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password)

	if (!isPasswordMatch) {
		throw new Error('Wrong password')
	}
	const token = generate({ id: user.id })

	return { token, user }
}

function getUsers() {
	return User.find()
}

module.exports = {
	login,
}
