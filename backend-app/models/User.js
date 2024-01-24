const mongoose = require('mongoose')
const roles = require('../constants/roles')

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: Number,
		default: roles.UNLOGIN,
	},
})

const User = mongoose.model('User', UserSchema)

module.exports = User
