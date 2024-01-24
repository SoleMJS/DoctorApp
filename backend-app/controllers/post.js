const Post = require('../models/Post')

// add
async function addPost(post) {
	const newPost = await Post.create(post)
	await newPost.populate({
		path: 'comments',
		populate: 'author',
	})

	return newPost
}

// get posts
async function getPosts() {
	const posts = await Post.find()
	return posts
}

module.exports = {
	addPost,
	getPosts,
}
