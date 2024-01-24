import { getUsers } from './get-users'

export const getUser = async emailToFind => {
	const users = await getUsers()

	return users.find(({ email }) => email === emailToFind)
}
