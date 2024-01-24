const jwt = require('jsonwebtoken')

const sign = 'testtest'

module.exports = {
	generate(data) {
		returnjwt.sign(data, sign, { expiresIn: '30d' })
	},
	verify(token) {
		return jwt.verify(token, sign)
	},
}
